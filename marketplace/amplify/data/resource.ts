import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { apiFunction } from '../functions/Api/resource';
import { authFunction } from '../functions/Auth/resource';

const schema = a.schema({
  JDPUserSession: a
    .model({
      sessionKey: a.string().required(),
      accessToken: a.string().required(),
      appId: a.string().required(),
      deviceId: a.string().required(),
      invalid: a.boolean().required(),
      refreshToken: a.string().required(),
      userId: a.string().required(),
    })
    .identifier(['sessionKey'])
    .authorization((allow) => [allow.authenticated()]),

  JDPProduct: a
    .model({
      productId: a.string().required(),
      productName: a.string().required(),
      productDescription: a.string().required(),
      productImage: a.string(),
      productCategory: a.string(),
      productPrice: a.integer().required(),
      productTax: a.integer().required(),
      productType: a.string().required(),
    })
    .identifier(['productId'])
    .secondaryIndexes((index) => [index("productCategory").sortKeys(["productId"]).name("CategoryIndex")])
    .authorization((allow) => [allow.authenticated(), allow.publicApiKey().to(['read'])]),

  JDPProductCategory: a
    .model({
      categoryName: a.string().required(),
    })
    .identifier(['categoryName'])
    .authorization((allow) => [allow.authenticated(), allow.publicApiKey().to(['read'])]),

  JDPProductInventory: a
    .model({
      productId: a.string().required(),
      resourceId: a.string().required(),
      appId: a.string(),
      nftId: a.string(),
      inventoryStatus: a.string().required(),
      orderId: a.string(),
      reservedExpireAt: a.integer(),
    })
    .identifier(['productId', 'resourceId'])
    .secondaryIndexes((index) => [
      index("productId").sortKeys(["inventoryStatus"]).name("StatusIndex"),
      index("inventoryStatus").sortKeys(["reservedExpireAt"]).name("ExpiredIndex"),
      index("orderId").name("OrderIdIndex"),
    ])
    .authorization((allow) => [allow.authenticated()]),

  JDPProductOrder: a
    .model({
      orderId: a.string().required(),
      productId: a.string().required(),
      productType: a.string().required(),
      userId: a.string().required(),
      amount: a.integer().required(),
      tax: a.integer().required(),
      orderStatus: a.string().required(),
      linkUrl: a.string().required(),
      linkUrlExpiredAt: a.integer().required(),
      accessId: a.string(),
      accessPass: a.string(),
      meta: a.string(),
    })
    .identifier(['orderId'])
    .secondaryIndexes((index) => [index("userId").sortKeys(["orderId"]).name("UserIdIndex")])
    .authorization((allow) => [allow.authenticated()]),

}).authorization((allow) => [allow.resource(apiFunction), allow.resource(authFunction)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
    apiKeyAuthorizationMode: {
      expiresInDays: 7,
    }
  },
});
