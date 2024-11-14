import { defineFunction, secret } from "@aws-amplify/backend";

export const apiFunction = defineFunction({
  name: "ApiFunction",
  entry: "./handler.ts",
  runtime: 20,
  timeoutSeconds: 30,
  environment: {
    DATALOCKER_AUTH_SERVER_HOST: process.env.DATALOCKER_AUTH_SERVER_HOST || '',
    DATALOCKER_API_SERVER_HOST: process.env.DATALOCKER_API_SERVER_HOST || '',
    DATALOCKER_USER_APP_URL: process.env.DATALOCKER_USER_APP_URL || '',
    DATALOCKER_CLIENT_ID: process.env.DATALOCKER_CLIENT_ID || '',
    DATALOCKER_NFT_ID: process.env.DATALOCKER_NFT_ID || '',
    DATALOCKER_CLIENT_SECRET: secret("DATALOCKER_CLIENT_SECRET"),
    DATALOCKER_API_SECRET_KEY: secret("DATALOCKER_API_SECRET_KEY"),
    GMO_HOST: process.env.GMO_HOST || '',
    GMO_SHOP_ID: process.env.GMO_SHOP_ID || '',
    GMO_SHOP_PASS: secret("GMO_SHOP_PASS"),
    GMO_LINK_PLUS_CONFIG_ID: process.env.GMO_LINK_PLUS_CONFIG_ID || '',
  }
});
