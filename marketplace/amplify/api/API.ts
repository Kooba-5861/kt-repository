import { aws_apigateway as apigateway, Stack } from "aws-cdk-lib";
import { BackendBase } from "@aws-amplify/backend";

export const createRestApi = (backend: BackendBase & {
  apiFunction: any;
}) => {
  const apiStack = backend.createStack(`api-stack`);

  const mdaAdminApi = new apigateway.RestApi(apiStack, "RestApi", {
    restApiName: `RestApi`,
    failOnWarnings: true,
    endpointConfiguration: {
      types: [apigateway.EndpointType.REGIONAL],
    },
    deploy: true,
    deployOptions: {
      stageName: "prod",
    },
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
    },
  });

  const lambdaIntegration = new apigateway.LambdaIntegration(backend.apiFunction.resources.lambda);

  // create a new resource path with IAM authorization
  mdaAdminApi.root.addMethod("ANY", lambdaIntegration, { authorizationType: apigateway.AuthorizationType.IAM });
  mdaAdminApi.root.addProxy({
    anyMethod: true,
    defaultIntegration: lambdaIntegration,
  });

  // add outputs to the configuration file
  backend.addOutput({
    custom: {
      API: {
        [mdaAdminApi.restApiName]: {
          endpoint: mdaAdminApi.url,
          region: Stack.of(mdaAdminApi).region,
          apiName: mdaAdminApi.restApiName,
        },
      },
    },
  });
}
