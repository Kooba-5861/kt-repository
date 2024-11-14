import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { GrantNFTEvent } from '../../GrantNFT';

const AMPLIFY_ARTIFACT_ID = process.env.AMPLIFY_ARTIFACT_ID || '';

export const invokeGrantNFT = async (param: GrantNFTEvent) => {
  let lambdaFunctionArn = process.env.GRANT_NFT_FUNCTION_ARN;
  if (!lambdaFunctionArn) {
    lambdaFunctionArn = await getInvokeGrantNFTArn();
  }
  const client = new LambdaClient({
    apiVersion: "2015-03-31",
    region: "ap-northeast-1"
  });
  const command = new InvokeCommand({
    FunctionName: lambdaFunctionArn,
    Payload: JSON.stringify(param),
    InvocationType: "Event",
  });
  const res = await client.send(command);
  if (res.FunctionError) {
    throw new Error(`GrantNFT error: ${res.FunctionError}`);
  }
}

const getInvokeGrantNFTArn = async () => {
  const client = new SSMClient({
    apiVersion: "2014-11-06",
    region: "ap-northeast-1"
  });
  const command = new GetParameterCommand({
    Name: `/jdp/amplify/${AMPLIFY_ARTIFACT_ID}/GRANT_NFT_FUNCTION_ARN`
  });
  const response = await client.send(command);
  if (!response.Parameter || !response.Parameter.Value) {
    throw new Error("GMO SSM Parameter not found.");
  }
  return response.Parameter.Value;
}
