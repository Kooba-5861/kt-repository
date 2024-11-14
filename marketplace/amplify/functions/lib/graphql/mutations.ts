/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createJDPProduct = /* GraphQL */ `mutation CreateJDPProduct(
  $condition: ModelJDPProductConditionInput
  $input: CreateJDPProductInput!
) {
  createJDPProduct(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateJDPProductMutationVariables,
  APITypes.CreateJDPProductMutation
>;
export const createJDPProductCategory = /* GraphQL */ `mutation CreateJDPProductCategory(
  $condition: ModelJDPProductCategoryConditionInput
  $input: CreateJDPProductCategoryInput!
) {
  createJDPProductCategory(condition: $condition, input: $input) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateJDPProductCategoryMutationVariables,
  APITypes.CreateJDPProductCategoryMutation
>;
export const createJDPProductInventory = /* GraphQL */ `mutation CreateJDPProductInventory(
  $condition: ModelJDPProductInventoryConditionInput
  $input: CreateJDPProductInventoryInput!
) {
  createJDPProductInventory(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateJDPProductInventoryMutationVariables,
  APITypes.CreateJDPProductInventoryMutation
>;
export const createJDPProductOrder = /* GraphQL */ `mutation CreateJDPProductOrder(
  $condition: ModelJDPProductOrderConditionInput
  $input: CreateJDPProductOrderInput!
) {
  createJDPProductOrder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateJDPProductOrderMutationVariables,
  APITypes.CreateJDPProductOrderMutation
>;
export const createJDPUserSession = /* GraphQL */ `mutation CreateJDPUserSession(
  $condition: ModelJDPUserSessionConditionInput
  $input: CreateJDPUserSessionInput!
) {
  createJDPUserSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateJDPUserSessionMutationVariables,
  APITypes.CreateJDPUserSessionMutation
>;
export const deleteJDPProduct = /* GraphQL */ `mutation DeleteJDPProduct(
  $condition: ModelJDPProductConditionInput
  $input: DeleteJDPProductInput!
) {
  deleteJDPProduct(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteJDPProductMutationVariables,
  APITypes.DeleteJDPProductMutation
>;
export const deleteJDPProductCategory = /* GraphQL */ `mutation DeleteJDPProductCategory(
  $condition: ModelJDPProductCategoryConditionInput
  $input: DeleteJDPProductCategoryInput!
) {
  deleteJDPProductCategory(condition: $condition, input: $input) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteJDPProductCategoryMutationVariables,
  APITypes.DeleteJDPProductCategoryMutation
>;
export const deleteJDPProductInventory = /* GraphQL */ `mutation DeleteJDPProductInventory(
  $condition: ModelJDPProductInventoryConditionInput
  $input: DeleteJDPProductInventoryInput!
) {
  deleteJDPProductInventory(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteJDPProductInventoryMutationVariables,
  APITypes.DeleteJDPProductInventoryMutation
>;
export const deleteJDPProductOrder = /* GraphQL */ `mutation DeleteJDPProductOrder(
  $condition: ModelJDPProductOrderConditionInput
  $input: DeleteJDPProductOrderInput!
) {
  deleteJDPProductOrder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteJDPProductOrderMutationVariables,
  APITypes.DeleteJDPProductOrderMutation
>;
export const deleteJDPUserSession = /* GraphQL */ `mutation DeleteJDPUserSession(
  $condition: ModelJDPUserSessionConditionInput
  $input: DeleteJDPUserSessionInput!
) {
  deleteJDPUserSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteJDPUserSessionMutationVariables,
  APITypes.DeleteJDPUserSessionMutation
>;
export const updateJDPProduct = /* GraphQL */ `mutation UpdateJDPProduct(
  $condition: ModelJDPProductConditionInput
  $input: UpdateJDPProductInput!
) {
  updateJDPProduct(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateJDPProductMutationVariables,
  APITypes.UpdateJDPProductMutation
>;
export const updateJDPProductCategory = /* GraphQL */ `mutation UpdateJDPProductCategory(
  $condition: ModelJDPProductCategoryConditionInput
  $input: UpdateJDPProductCategoryInput!
) {
  updateJDPProductCategory(condition: $condition, input: $input) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateJDPProductCategoryMutationVariables,
  APITypes.UpdateJDPProductCategoryMutation
>;
export const updateJDPProductInventory = /* GraphQL */ `mutation UpdateJDPProductInventory(
  $condition: ModelJDPProductInventoryConditionInput
  $input: UpdateJDPProductInventoryInput!
) {
  updateJDPProductInventory(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateJDPProductInventoryMutationVariables,
  APITypes.UpdateJDPProductInventoryMutation
>;
export const updateJDPProductOrder = /* GraphQL */ `mutation UpdateJDPProductOrder(
  $condition: ModelJDPProductOrderConditionInput
  $input: UpdateJDPProductOrderInput!
) {
  updateJDPProductOrder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateJDPProductOrderMutationVariables,
  APITypes.UpdateJDPProductOrderMutation
>;
export const updateJDPUserSession = /* GraphQL */ `mutation UpdateJDPUserSession(
  $condition: ModelJDPUserSessionConditionInput
  $input: UpdateJDPUserSessionInput!
) {
  updateJDPUserSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateJDPUserSessionMutationVariables,
  APITypes.UpdateJDPUserSessionMutation
>;
