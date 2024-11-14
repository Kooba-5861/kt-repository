import axios from 'axios'
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const AMPLIFY_ARTIFACT_ID = process.env.AMPLIFY_ARTIFACT_ID || '';
const CLIENT_ID = process.env.DATALOCKER_CLIENT_ID || ''
const REALM_NAME = 'DataLocker'
const AUTH_SERVER_HOST = process.env.DATALOCKER_AUTH_SERVER_HOST || ''
const API_SERVER_HOST = process.env.DATALOCKER_API_SERVER_HOST || ''
const CLIENT_SECRET = process.env.DATALOCKER_CLIENT_SECRET || ''
const API_SECRET = process.env.DATALOCKER_API_SECRET_KEY || ''

export const issueNftToken = async (
  appId: string, nftId: string, meta: { name: string, desc: string, image: string, url: string }, attr: string = ""
): Promise<{ value: string, transaction_id: string }> => {
  const data = {
    app_id: appId,
    nft_id: nftId,
    meta,
    attr,
  };

  let config = {
    headers: {
      "DataLocker-Api-Key": (API_SECRET === '') ? await getDatalockerApiSecret() : API_SECRET
    }
  };

  try {
    const res = await axios.post<{value: string, transaction_id: string}>(`${API_SERVER_HOST}/api/v1/nft/token/issue`, data, config);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error('Failed to issue NFT token');
  }
}

export const grantNftToken = async (
  appId: string, nftId: string, tokenId: string, userId: string
): Promise<{ value: string, transaction_id: string }> => {
  const data = {
    app_id: appId,
    nft_id: nftId,
    token_id: tokenId,
    user_id: userId,
  };

  let config = {
    headers: {
      "DataLocker-Api-Key": (API_SECRET === '') ? await getDatalockerApiSecret() : API_SECRET
    }
  };

  try {
    const res = await axios.post<{value: "ok", transaction_id: string}>(`${API_SERVER_HOST}/api/v1/nft/token/grant`, data, config);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error('Failed to grant NFT token');
  }
}

const getDatalockerApiSecret = async () => {
  const artifactIdArray = AMPLIFY_ARTIFACT_ID.split('-');
  const parameterPath = artifactIdArray[0] + '/' + artifactIdArray[1] + '/' + artifactIdArray.slice(2).join('-');

  const client = new SSMClient({
    apiVersion: "2014-11-06",
    region: "ap-northeast-1"
  });
  const command = new GetParameterCommand({
    Name: `/${parameterPath}/DATALOCKER_API_SECRET_KEY`,
    WithDecryption: true
  });
  const response = await client.send(command);
  if (!response.Parameter || !response.Parameter.Value) {
    throw new Error("Datalocker SSM Parameter not found.");
  }
  return response.Parameter.Value;
}
