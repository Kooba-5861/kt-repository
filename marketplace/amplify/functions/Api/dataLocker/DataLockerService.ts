import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";
import { Schema } from "../../../data/resource";

export class DataLockerService {
  readonly clientId: string = process.env.DATALOCKER_CLIENT_ID || ''
  readonly realmName: string = 'DataLocker'
  readonly authServerHost: string = process.env.DATALOCKER_AUTH_SERVER_HOST || ''
  readonly apiServerHost: string = process.env.DATALOCKER_API_SERVER_HOST || ''

  clientSecret: string = process.env.DATALOCKER_CLIENT_SECRET || ''

  tokenEndpoint: string = ''
  urlIntrospectionEndpoint: string = ''
  userinfoEndpoint: string = ''
  endSessionEndpoint: string = ''
  tokenRevocationEndpoint: string = ''
  logoutEndpoint: string = ''
  authorizationEndpoint: string = ''
  userPageUri: string = ''

  initialize () {
    this.tokenEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/token");
    this.urlIntrospectionEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/token/introspect");
    this.userinfoEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/userinfo");
    this.endSessionEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/logout");
    this.tokenRevocationEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/revoke");
    this.logoutEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/logout");
    this.authorizationEndpoint = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/protocol/openid-connect/auth?response_type=code&client_id=$CLIENTID$&redirect_uri=$REDIRECT$&state=$STATE$&login=true&scope=openid");
    this.userPageUri = this.createUrl("$SERVER_HOST$/auth/realms/$REALM$/account");
  }

  getAuthUrl (stateCode: string, redirectUri: string): string {
    return this.authorizationEndpoint
        .replace("$CLIENTID$", encodeURIComponent(this.clientId))
        .replace("$REDIRECT$", encodeURIComponent(redirectUri))
        .replace("$STATE$", encodeURIComponent(stateCode));
  }

  async getToken (state: string, sessionState: string, code: string, redirectUri: string): Promise<[number, AxiosResponse | null]> {
    const params = new URLSearchParams()
    params.append('client_id', this.clientId)
    params.append('code', code)
    params.append('redirect_uri', redirectUri)
    params.append('grant_type', 'authorization_code')
    params.append('client_secret', this.clientSecret)
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    };
    let status = 0
    try {
      const res = await axios.post(this.tokenEndpoint, params, config);
      return [res.status, res]
    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response && e.response.status) {
        status = e.response.status
      } else {
        status = 500
      }
      console.error(`DatalockerService getToken Error. status = ${status}.`)
      console.error(e)
    }
    return [status, null]
  }

  async callApi (url: string, param: any, session: { deviceId: string | null, userId: string, accessToken: string }): Promise<[any, number]> {
    const data = {
      app_id: this.clientId,
      device_id: session.deviceId || "",
      user_id: session.userId,
      ...param
    };

    let config = {
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    };

    try {
      const res = await axios.post(`${this.getApiServerHost()}${url}`, data, config);

      return [res.data, 200];
    } catch (err: any) {
      console.error(err);
      const statusCode = err.response?.status;
      return [null, statusCode >= 300 ? statusCode : 500];
    }
  }

  async refreshAccessToken (session: Schema["JDPUserSession"]["type"]): Promise<[number, null | string, null | string]> {
    const params = new URLSearchParams()
    params.append('client_id', this.clientId)
    params.append('client_secret', this.clientSecret)
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', session.refreshToken)

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    };

    try {
      const res = await axios.post(this.tokenEndpoint, params, config);

      const newAccessToken = res.data.access_token;
      const newRefreshToken = res.data.refresh_token;

      if (!newAccessToken || newAccessToken.length <= 0 || !newRefreshToken || newRefreshToken.length <= 0) {
        return [500, null, null];
      }

      session.accessToken = newAccessToken;
      session.refreshToken = newRefreshToken;

      return [200, newAccessToken, newRefreshToken]
    } catch (err: any) {
      console.error(err);
      const statusCode = err.response?.status;
      return [statusCode >= 300 ? statusCode : 500, null, null]
    }
  }

  async logout (session: Schema["JDPUserSession"]["type"]): Promise<number> {
    const params = new URLSearchParams()
    params.append('client_id', this.clientId)
    params.append('client_secret', this.clientSecret)
    params.append('token_type_hint', 'refresh_token')
    params.append('token', session.refreshToken)

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    };

    try {
      const res = await axios.post(this.tokenRevocationEndpoint, params, config);
      return 200;
    } catch (err: any) {
      console.error(err);
      const statusCode = err.response?.status;
      return statusCode >= 300 ? statusCode : 500;
    }
  }

  async logoutFromAuthServer (session: Schema["JDPUserSession"]["type"]): Promise<number> {
    const params = new URLSearchParams()
    params.append('client_id', this.clientId)
    params.append('client_secret', this.clientSecret)
    params.append('token_type_hint', 'refresh_token')
    params.append('refresh_token', session.refreshToken)

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    };

    try {
      const res = await axios.post(this.logoutEndpoint, params, config);
      return 200;
    } catch (err: any) {
      console.error(err);
      const statusCode = err.response?.status;
      return statusCode >= 300 ? statusCode : 500;
    }
  }

  getUserPageUrl (): string {
    return this.userPageUri;
  }

  getApiServerHost (): string {
    return this.apiServerHost
  }

  private createUrl (template: string): string {
    return template
        .replace("$SERVER_HOST$", this.authServerHost)
        .replace("$REALM$", this.realmName);
  }
}
