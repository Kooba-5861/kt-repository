import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
/*
    externalProviders: {
      oidc: [
        {
          name: 'datalocker',
          clientId: secret('DATALOCKER_CLIENT_ID'),
          clientSecret: secret('DATALOCKER_CLIENT_SECRET'),
          issuerUrl: "https://auth-k02.datalocker.jasmy-st.com/auth/realms/DataLocker",
        }
      ],
      logoutUrls: ['http://localhost:3000/logout/'],
      callbackUrls: [
        "http://localhost:3000/",
        "http://localhost:3000/auth/",
      ],
    },
*/
  },
});
