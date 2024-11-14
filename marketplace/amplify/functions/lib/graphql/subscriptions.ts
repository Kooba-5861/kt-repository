/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateJDPProduct = /* GraphQL */ `subscription OnCreateJDPProduct(
  $filter: ModelSubscriptionJDPProductFilterInput
) {
  onCreateJDPProduct(filter: $filter) {
    createdAt
    productCategory
    productDescription
    productId
    productImage
    productName
    productPrice
    productTax
    productType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJDPProductSubscriptionVariables,
  APITypes.OnCreateJDPProductSubscription
>;
export const onCreateJDPProductCategory = /* GraphQL */ `subscription OnCreateJDPProductCategory(
  $filter: ModelSubscriptionJDPProductCategoryFilterInput
) {
  onCreateJDPProductCategory(filter: $filter) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJDPProductCategorySubscriptionVariables,
  APITypes.OnCreateJDPProductCategorySubscription
>;
export const onCreateJDPProductInventory = /* GraphQL */ `subscription OnCreateJDPProductInventory(
  $filter: ModelSubscriptionJDPProductInventoryFilterInput
) {
  onCreateJDPProductInventory(filter: $filter) {
    appId
    createdAt
    inventoryStatus
    nftId
    orderId
    productId
    reservedExpireAt
    resourceId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJDPProductInventorySubscriptionVariables,
  APITypes.OnCreateJDPProductInventorySubscription
>;
export const onCreateJDPProductOrder = /* GraphQL */ `subscription OnCreateJDPProductOrder(
  $filter: ModelSubscriptionJDPProductOrderFilterInput
) {
  onCreateJDPProductOrder(filter: $filter) {
    accessId
    accessPass
    amount
    createdAt
    linkUrl
    linkUrlExpiredAt
    meta
    orderId
    orderStatus
    productId
    productType
    tax
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJDPProductOrderSubscriptionVariables,
  APITypes.OnCreateJDPProductOrderSubscription
>;
export const onCreateJDPUserSession = /* GraphQL */ `subscription OnCreateJDPUserSession(
  $filter: ModelSubscriptionJDPUserSessionFilterInput
) {
  onCreateJDPUserSession(filter: $filter) {
    accessToken
    appId
    createdAt
    deviceId
    invalid
    refreshToken
    sessionKey
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJDPUserSessionSubscriptionVariables,
  APITypes.OnCreateJDPUserSessionSubscription
>;
export const onDeleteJDPProduct = /* GraphQL */ `subscription OnDeleteJDPProduct(
  $filter: ModelSubscriptionJDPProductFilterInput
) {
  onDeleteJDPProduct(filter: $filter) {
    createdAt
    productCategory
    productDescription
    productId
    productImage
    productName
    productPrice
    productTax
    productType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJDPProductSubscriptionVariables,
  APITypes.OnDeleteJDPProductSubscription
>;
export const onDeleteJDPProductCategory = /* GraphQL */ `subscription OnDeleteJDPProductCategory(
  $filter: ModelSubscriptionJDPProductCategoryFilterInput
) {
  onDeleteJDPProductCategory(filter: $filter) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJDPProductCategorySubscriptionVariables,
  APITypes.OnDeleteJDPProductCategorySubscription
>;
export const onDeleteJDPProductInventory = /* GraphQL */ `subscription OnDeleteJDPProductInventory(
  $filter: ModelSubscriptionJDPProductInventoryFilterInput
) {
  onDeleteJDPProductInventory(filter: $filter) {
    appId
    createdAt
    inventoryStatus
    nftId
    orderId
    productId
    reservedExpireAt
    resourceId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJDPProductInventorySubscriptionVariables,
  APITypes.OnDeleteJDPProductInventorySubscription
>;
export const onDeleteJDPProductOrder = /* GraphQL */ `subscription OnDeleteJDPProductOrder(
  $filter: ModelSubscriptionJDPProductOrderFilterInput
) {
  onDeleteJDPProductOrder(filter: $filter) {
    accessId
    accessPass
    amount
    createdAt
    linkUrl
    linkUrlExpiredAt
    meta
    orderId
    orderStatus
    productId
    productType
    tax
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJDPProductOrderSubscriptionVariables,
  APITypes.OnDeleteJDPProductOrderSubscription
>;
export const onDeleteJDPUserSession = /* GraphQL */ `subscription OnDeleteJDPUserSession(
  $filter: ModelSubscriptionJDPUserSessionFilterInput
) {
  onDeleteJDPUserSession(filter: $filter) {
    accessToken
    appId
    createdAt
    deviceId
    invalid
    refreshToken
    sessionKey
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJDPUserSessionSubscriptionVariables,
  APITypes.OnDeleteJDPUserSessionSubscription
>;
export const onUpdateJDPProduct = /* GraphQL */ `subscription OnUpdateJDPProduct(
  $filter: ModelSubscriptionJDPProductFilterInput
) {
  onUpdateJDPProduct(filter: $filter) {
    createdAt
    productCategory
    productDescription
    productId
    productImage
    productName
    productPrice
    productTax
    productType
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJDPProductSubscriptionVariables,
  APITypes.OnUpdateJDPProductSubscription
>;
export const onUpdateJDPProductCategory = /* GraphQL */ `subscription OnUpdateJDPProductCategory(
  $filter: ModelSubscriptionJDPProductCategoryFilterInput
) {
  onUpdateJDPProductCategory(filter: $filter) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJDPProductCategorySubscriptionVariables,
  APITypes.OnUpdateJDPProductCategorySubscription
>;
export const onUpdateJDPProductInventory = /* GraphQL */ `subscription OnUpdateJDPProductInventory(
  $filter: ModelSubscriptionJDPProductInventoryFilterInput
) {
  onUpdateJDPProductInventory(filter: $filter) {
    appId
    createdAt
    inventoryStatus
    nftId
    orderId
    productId
    reservedExpireAt
    resourceId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJDPProductInventorySubscriptionVariables,
  APITypes.OnUpdateJDPProductInventorySubscription
>;
export const onUpdateJDPProductOrder = /* GraphQL */ `subscription OnUpdateJDPProductOrder(
  $filter: ModelSubscriptionJDPProductOrderFilterInput
) {
  onUpdateJDPProductOrder(filter: $filter) {
    accessId
    accessPass
    amount
    createdAt
    linkUrl
    linkUrlExpiredAt
    meta
    orderId
    orderStatus
    productId
    productType
    tax
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJDPProductOrderSubscriptionVariables,
  APITypes.OnUpdateJDPProductOrderSubscription
>;
export const onUpdateJDPUserSession = /* GraphQL */ `subscription OnUpdateJDPUserSession(
  $filter: ModelSubscriptionJDPUserSessionFilterInput
) {
  onUpdateJDPUserSession(filter: $filter) {
    accessToken
    appId
    createdAt
    deviceId
    invalid
    refreshToken
    sessionKey
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJDPUserSessionSubscriptionVariables,
  APITypes.OnUpdateJDPUserSessionSubscription
>;
