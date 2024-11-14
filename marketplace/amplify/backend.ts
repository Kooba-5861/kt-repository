import { defineBackend } from '@aws-amplify/backend';
import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { FunctionUrlAuthType, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { auth } from './auth/resource';
import { data } from './data/resource';
import { authFunction } from './functions/Auth/resource';
import { apiFunction } from './functions/Api/resource';
import { createRestApi } from './api/API';

const backend = defineBackend({
  auth,
  data,
  apiFunction,
  authFunction,
});

createRestApi(backend);

// Auth Function に関数URLを追加.
const authFunctionUrl = backend.authFunction.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ['*'],
    allowedHeaders: ['*'],
    allowedMethods: [HttpMethod.GET],
  }
})

// Auth Function のURLを amplify_outputs.json に追加
backend.addOutput({
  custom: {
    Auth: {
      URL: authFunctionUrl.url,
    },
  },
});

const parameterStack = backend.createStack('parameter-stack');
// cdkを使用して DynamoDB のテーブル名を Parameter Store に保存
new ssm.StringParameter(parameterStack, 'JDPProductTableParam', {
  parameterName: `/jdp/amplify/${backend.stack.artifactId}/JDPProduct`,
  stringValue: backend.data.resources.tables['JDPProduct'].tableName,
});
new ssm.StringParameter(parameterStack, 'JDPProductInventoryTableParam', {
  parameterName: `/jdp/amplify/${backend.stack.artifactId}/JDPProductInventory`,
  stringValue: backend.data.resources.tables['JDPProductInventory'].tableName,
});
new ssm.StringParameter(parameterStack, 'JDPProductOrderTableParam', {
  parameterName: `/jdp/amplify/${backend.stack.artifactId}/JDPProductOrder`,
  stringValue: backend.data.resources.tables['JDPProductOrder'].tableName,
});

const exLambdaStack = backend.createStack('ex-lambda-stack');
const gmoLambda = new NodejsFunction(exLambdaStack, 'GMONotificationFunction', {
  entry: 'amplify/functions/GMONotification/index.ts',
  handler: 'handler',
  timeout: cdk.Duration.seconds(120),
  runtime: Runtime.NODEJS_18_X,
  memorySize: 1024,
});
// DynamoDBの読み込み書込権限を追加
gmoLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan",
    "dynamodb:BatchGetItem",
    "dynamodb:BatchWriteItem",
  ],
  resources: [
    backend.data.resources.tables['JDPProduct'].tableArn,
    `${backend.data.resources.tables['JDPProduct'].tableArn}/index/*`,
    backend.data.resources.tables['JDPProductInventory'].tableArn,
    `${backend.data.resources.tables['JDPProductInventory'].tableArn}/index/*`,
    backend.data.resources.tables['JDPProductOrder'].tableArn,
    `${backend.data.resources.tables['JDPProductOrder'].tableArn}/index/*`,
  ],
}));

// artifactId を環境変数に追加
gmoLambda.addEnvironment('AMPLIFY_ARTIFACT_ID', backend.stack.artifactId || '');
gmoLambda.addEnvironment('DATALOCKER_API_SERVER_HOST', process.env.DATALOCKER_API_SERVER_HOST || '');
gmoLambda.addEnvironment('DATALOCKER_CLIENT_ID', process.env.DATALOCKER_CLIENT_ID || '');
gmoLambda.addEnvironment('GMO_HOST', process.env.GMO_HOST || '');
gmoLambda.addEnvironment('GMO_SHOP_ID', process.env.GMO_SHOP_ID || '');

const artifactIdArray = backend.stack.artifactId.split('-');
const secretParameterPath = artifactIdArray[0] + '/' + artifactIdArray[1] + '/' + artifactIdArray.slice(2).join('-');

// cdkを使用して に Parameter Store 読み込み権限を付与
gmoLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameters', 'ssm:GetParameter'],
  resources: [
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/jdp/amplify/${backend.stack.artifactId}/*`,
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/${secretParameterPath}/*`,
  ],
}));

// Auth Function に関数URLを追加.
gmoLambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ['*'],
    allowedHeaders: ['*'],
    allowedMethods: [HttpMethod.POST],
  }
})

const grantNFTLambda = new NodejsFunction(exLambdaStack, 'GrantNFTFunction', {
  entry: 'amplify/functions/GrantNFT/index.ts',
  handler: 'handler',
  timeout: cdk.Duration.seconds(120),
  runtime: Runtime.NODEJS_18_X,
  memorySize: 1024,
});
new ssm.StringParameter(parameterStack, 'JDPGrantNFTFunctionArnParam', {
  parameterName: `/jdp/amplify/${backend.stack.artifactId}/GRANT_NFT_FUNCTION_ARN`,
  stringValue: grantNFTLambda.functionArn,
});

// DynamoDBの読み込み書込権限を追加
grantNFTLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan",
    "dynamodb:BatchGetItem",
    "dynamodb:BatchWriteItem",
  ],
  resources: [
    backend.data.resources.tables['JDPProduct'].tableArn,
    `${backend.data.resources.tables['JDPProduct'].tableArn}/index/*`,
    backend.data.resources.tables['JDPProductInventory'].tableArn,
    `${backend.data.resources.tables['JDPProductInventory'].tableArn}/index/*`,
    backend.data.resources.tables['JDPProductOrder'].tableArn,
    `${backend.data.resources.tables['JDPProductOrder'].tableArn}/index/*`,
  ],
}));

// artifactId を環境変数に追加
grantNFTLambda.addEnvironment('AMPLIFY_ARTIFACT_ID', backend.stack.artifactId || '');
grantNFTLambda.addEnvironment('DATALOCKER_API_SERVER_HOST', process.env.DATALOCKER_API_SERVER_HOST || '');
grantNFTLambda.addEnvironment('DATALOCKER_CLIENT_ID', process.env.DATALOCKER_CLIENT_ID || '');
grantNFTLambda.addEnvironment('GMO_HOST', process.env.GMO_HOST || '');
grantNFTLambda.addEnvironment('GMO_SHOP_ID', process.env.GMO_SHOP_ID || '');

// cdkを使用して に Parameter Store 読み込み権限を付与
grantNFTLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameters', 'ssm:GetParameter'],
  resources: [
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/jdp/amplify/${backend.stack.artifactId}/*`,
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/${secretParameterPath}/*`,
  ],
}));

const apiFunctionLambda = backend.apiFunction.resources.lambda as NodejsFunction;
apiFunctionLambda.addEnvironment('AMPLIFY_ARTIFACT_ID', backend.stack.artifactId || '');
apiFunctionLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameters', 'ssm:GetParameter'],
  resources: [
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/jdp/amplify/${backend.stack.artifactId}/*`,
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/${secretParameterPath}/*`,
  ],
}));

// cdkを使用して Lambda 関数の実行権限を付与
backend.apiFunction.resources.lambda.role?.attachInlinePolicy(new iam.Policy(
  exLambdaStack,
  'InvokeGrantNFT',
  {
    statements: [
      new iam.PolicyStatement({
        actions: ['lambda:InvokeFunction'],
        resources: [grantNFTLambda.functionArn],
      }),
    ],
  }
));
gmoLambda.role?.attachInlinePolicy(new iam.Policy(
  exLambdaStack,
  'InvokeGrantNFTGmoNotification',
  {
    statements: [
      new iam.PolicyStatement({
        actions: ['lambda:InvokeFunction'],
        resources: [grantNFTLambda.functionArn],
      }),
    ],
  }
));

grantNFTLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['lambda:InvokeFunction'],
  resources: [apiFunctionLambda.functionArn],
}));

const lockSchedulerLambda = new NodejsFunction(exLambdaStack, 'LockSchedulerFunction', {
  entry: 'amplify/functions/LockScheduler/index.ts',
  handler: 'handler',
  timeout: cdk.Duration.seconds(120),
  runtime: Runtime.NODEJS_18_X,
  memorySize: 1024,
});

// EventBridgeルールの作成（1分ごとに実行）
const rule = new events.Rule(exLambdaStack, 'LockScheduleRule', {
  schedule: events.Schedule.rate(cdk.Duration.minutes(10)),
});

// EventBridgeルールのターゲットとしてLambdaを設定
rule.addTarget(new targets.LambdaFunction(lockSchedulerLambda));

lockSchedulerLambda.addEnvironment('AMPLIFY_ARTIFACT_ID', backend.stack.artifactId || '');

// DynamoDBの読み込み書込権限を追加
lockSchedulerLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan",
    "dynamodb:BatchGetItem",
    "dynamodb:BatchWriteItem",
  ],
  resources: [
    backend.data.resources.tables['JDPProductInventory'].tableArn,
    `${backend.data.resources.tables['JDPProductInventory'].tableArn}/index/*`,
  ],
}));

lockSchedulerLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameters', 'ssm:GetParameter'],
  resources: [
    `arn:aws:ssm:${cdk.Stack.of(gmoLambda).region}:${cdk.Stack.of(gmoLambda).account}:parameter/jdp/amplify/${backend.stack.artifactId}/*`
  ],
}));

// ゲストユーザーの無効化
const { cfnIdentityPool, cfnUserPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;
cfnUserPool.userPoolAddOns = {
  advancedSecurityMode: 'ENFORCED',
};
cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: true,
};
