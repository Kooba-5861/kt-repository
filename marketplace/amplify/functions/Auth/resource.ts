import { defineFunction, secret } from "@aws-amplify/backend";

export const authFunction = defineFunction({
  name: "AuthFunction",
  entry: "./index.ts",
  runtime: 20,
  timeoutSeconds: 30,
  environment: {
    DATALOCKER_AUTH_SERVER_HOST: process.env.DATALOCKER_AUTH_SERVER_HOST || '',
    DATALOCKER_API_SERVER_HOST: process.env.DATALOCKER_API_SERVER_HOST || '',
    DATALOCKER_CLIENT_ID: process.env.DATALOCKER_CLIENT_ID || '',
    DATALOCKER_CLIENT_SECRET: secret("DATALOCKER_CLIENT_SECRET"),
  }
});
