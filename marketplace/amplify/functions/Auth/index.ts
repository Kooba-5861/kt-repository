import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { randomBytes } from 'crypto';
import { URLSearchParams } from 'url';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { graphQlClient } from '../lib/graphql';
import { createJDPUserSession } from '../lib/graphql/mutations';

// Types
interface Environment {
  AUTH_SERVER_HOST: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

interface AuthConfig {
  host: string;
  stateCode: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
}

interface JWTPayload {
  aud: string;
  sub: string;
  datalocker_device_id: string;
}

interface UserSession {
  sessionKey: string;
  userId: string;
}

// 環境変数の取得
const getEnvConfig = (): Environment => {
  const config = {
    AUTH_SERVER_HOST: process.env.DATALOCKER_AUTH_SERVER_HOST,
    CLIENT_ID: process.env.DATALOCKER_CLIENT_ID,
    CLIENT_SECRET: process.env.DATALOCKER_CLIENT_SECRET,
  };

  if (!config.AUTH_SERVER_HOST || !config.CLIENT_ID || !config.CLIENT_SECRET) {
    throw new Error('Missing required environment variables');
  }

  return config as Environment;
};

// エラーレスポンスの生成
const createErrorResponse = (statusCode: number, message: string): APIGatewayProxyResultV2 => ({
  statusCode,
  body: JSON.stringify({ error: message })
});

// 成功レスポンスの生成
const createSuccessResponse = (data: any): APIGatewayProxyResultV2 => ({
  statusCode: 200,
  body: JSON.stringify({ ...data, code: 'success' })
});

// 認証URLの生成
const generateAuthUrl = ({ host, stateCode }: AuthConfig): string => {
  const config = getEnvConfig();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.CLIENT_ID,
    redirect_uri: `${host}/auth/`,
    state: stateCode,
    login: 'true',
    scope: 'openid'
  });

  return `${config.AUTH_SERVER_HOST}/auth/realms/DataLocker/protocol/openid-connect/auth?${params.toString()}`;
};

// JWTデコード
const decodeJWT = (token: string): { header: any; payload: JWTPayload; signature: string } => {
  const [headerB64, payloadB64, signatureB64] = token.split('.');
  return {
    header: JSON.parse(decodeURIComponent(b64Decode(headerB64))),
    payload: JSON.parse(decodeURIComponent(b64Decode(payloadB64))),
    signature: b64Decode(signatureB64)
  };
};

// Base64デコード
const b64Decode = (str: string): string => {
  const normalized = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(normalized, 'base64').toString('utf8');
};

// PDLからトークン取得
const fetchToken = async (code: string, redirectUri: string): Promise<TokenResponse> => {
  const config = getEnvConfig();
  const params = new URLSearchParams({
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  });

  try {
    const response = await axios.post(
      `${config.AUTH_SERVER_HOST}/auth/realms/DataLocker/protocol/openid-connect/token`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Token fetch failed:', error);
    throw new Error('Failed to fetch token');
  }
};

// セッション作成
const createSession = async (
  appId: string,
  deviceId: string,
  userId: string,
  sessionKey: string,
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  const response = await graphQlClient.graphql({
    query: createJDPUserSession,
    variables: {
      input: {
        accessToken,
        appId,
        deviceId,
        invalid: false,
        refreshToken,
        sessionKey,
        userId
      }
    }
  });

  if (response.errors) {
    console.error('Session creation failed:', response.errors);
    throw new Error('Failed to create user session');
  }
};

// Main authentication flow
const handleAuthStart = (event: APIGatewayProxyEventV2): APIGatewayProxyResultV2 => {
  const host = event.headers.origin || '';
  const stateCode = uuidv4();
  const authUrl = generateAuthUrl({ host, stateCode });

  return createSuccessResponse({
    state_code: stateCode,
    auth_url: authUrl
  });
};

const handleAuthComplete = async (
  state: string,
  sessionState: string,
  code: string,
  redirectUri: string
): Promise<UserSession> => {
  const config = getEnvConfig();
  const tokenResponse = await fetchToken(code, redirectUri);
  const { payload } = decodeJWT(tokenResponse.id_token);

  if (payload.aud !== config.CLIENT_ID) {
    throw new Error('Invalid application ID');
  }

  const sessionKey = randomBytes(256).toString('base64');
  await createSession(
    payload.aud,
    payload.datalocker_device_id,
    payload.sub,
    sessionKey,
    tokenResponse.access_token,
    tokenResponse.refresh_token
  );

  return {
    sessionKey,
    userId: payload.sub
  };
};

// Main handler
export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  try {
    // Method validation
    if (event.requestContext.http.method !== 'GET') {
      return createErrorResponse(405, 'Method Not Allowed');
    }

    // Path validation
    const path = event.requestContext.http.path;
    if (path !== '/start' && path !== '/complete') {
      return createErrorResponse(404, 'Not Found');
    }

    // Handle start flow
    if (path === '/start') {
      return handleAuthStart(event);
    }

    // Handle complete flow
    const { state, session_state, code } = event.queryStringParameters || {};
    if (!state || !session_state || !code) {
      console.error('Invalid query parameters:', event.queryStringParameters);
      return createErrorResponse(403, 'Forbidden');
    }

    const host = event.headers.origin || '';
    const authResponse = await handleAuthComplete(
      state,
      session_state,
      code,
      `${host}/auth/`
    );

    return createSuccessResponse(authResponse);
  } catch (error) {
    console.error('Handler error:', error);
    return createErrorResponse(500, 'Internal Server Error');
  }
};
