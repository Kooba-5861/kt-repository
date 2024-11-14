/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getJDPProduct = /* GraphQL */ `query GetJDPProduct($productId: String!) {
  getJDPProduct(productId: $productId) {
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
` as GeneratedQuery<
  APITypes.GetJDPProductQueryVariables,
  APITypes.GetJDPProductQuery
>;
export const getJDPProductCategory = /* GraphQL */ `query GetJDPProductCategory($categoryName: String!) {
  getJDPProductCategory(categoryName: $categoryName) {
    categoryName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetJDPProductCategoryQueryVariables,
  APITypes.GetJDPProductCategoryQuery
>;
export const getJDPProductInventory = /* GraphQL */ `query GetJDPProductInventory($productId: String!, $resourceId: String!) {
  getJDPProductInventory(productId: $productId, resourceId: $resourceId) {
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
` as GeneratedQuery<
  APITypes.GetJDPProductInventoryQueryVariables,
  APITypes.GetJDPProductInventoryQuery
>;
export const getJDPProductOrder = /* GraphQL */ `query GetJDPProductOrder($orderId: String!) {
  getJDPProductOrder(orderId: $orderId) {
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
` as GeneratedQuery<
  APITypes.GetJDPProductOrderQueryVariables,
  APITypes.GetJDPProductOrderQuery
>;
export const getJDPUserSession = /* GraphQL */ `query GetJDPUserSession($sessionKey: String!) {
  getJDPUserSession(sessionKey: $sessionKey) {
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
` as GeneratedQuery<
  APITypes.GetJDPUserSessionQueryVariables,
  APITypes.GetJDPUserSessionQuery
>;
export const listJDPProductByProductCategoryAndProductId = /* GraphQL */ `query ListJDPProductByProductCategoryAndProductId(
  $filter: ModelJDPProductFilterInput
  $limit: Int
  $nextToken: String
  $productCategory: String!
  $productId: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listJDPProductByProductCategoryAndProductId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    productCategory: $productCategory
    productId: $productId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductByProductCategoryAndProductIdQueryVariables,
  APITypes.ListJDPProductByProductCategoryAndProductIdQuery
>;
export const listJDPProductCategories = /* GraphQL */ `query ListJDPProductCategories(
  $categoryName: String
  $filter: ModelJDPProductCategoryFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listJDPProductCategories(
    categoryName: $categoryName
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      categoryName
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductCategoriesQueryVariables,
  APITypes.ListJDPProductCategoriesQuery
>;
export const listJDPProductInventories = /* GraphQL */ `query ListJDPProductInventories(
  $filter: ModelJDPProductInventoryFilterInput
  $limit: Int
  $nextToken: String
  $productId: String
  $resourceId: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listJDPProductInventories(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    resourceId: $resourceId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductInventoriesQueryVariables,
  APITypes.ListJDPProductInventoriesQuery
>;
export const listJDPProductInventoryByInventoryStatusAndReservedExpireAt = /* GraphQL */ `query ListJDPProductInventoryByInventoryStatusAndReservedExpireAt(
  $filter: ModelJDPProductInventoryFilterInput
  $inventoryStatus: String!
  $limit: Int
  $nextToken: String
  $reservedExpireAt: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listJDPProductInventoryByInventoryStatusAndReservedExpireAt(
    filter: $filter
    inventoryStatus: $inventoryStatus
    limit: $limit
    nextToken: $nextToken
    reservedExpireAt: $reservedExpireAt
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductInventoryByInventoryStatusAndReservedExpireAtQueryVariables,
  APITypes.ListJDPProductInventoryByInventoryStatusAndReservedExpireAtQuery
>;
export const listJDPProductInventoryByOrderId = /* GraphQL */ `query ListJDPProductInventoryByOrderId(
  $filter: ModelJDPProductInventoryFilterInput
  $limit: Int
  $nextToken: String
  $orderId: String!
  $sortDirection: ModelSortDirection
) {
  listJDPProductInventoryByOrderId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orderId: $orderId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductInventoryByOrderIdQueryVariables,
  APITypes.ListJDPProductInventoryByOrderIdQuery
>;
export const listJDPProductInventoryByProductIdAndInventoryStatus = /* GraphQL */ `query ListJDPProductInventoryByProductIdAndInventoryStatus(
  $filter: ModelJDPProductInventoryFilterInput
  $inventoryStatus: ModelStringKeyConditionInput
  $limit: Int
  $nextToken: String
  $productId: String!
  $sortDirection: ModelSortDirection
) {
  listJDPProductInventoryByProductIdAndInventoryStatus(
    filter: $filter
    inventoryStatus: $inventoryStatus
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductInventoryByProductIdAndInventoryStatusQueryVariables,
  APITypes.ListJDPProductInventoryByProductIdAndInventoryStatusQuery
>;
export const listJDPProductOrderByUserIdAndOrderId = /* GraphQL */ `query ListJDPProductOrderByUserIdAndOrderId(
  $filter: ModelJDPProductOrderFilterInput
  $limit: Int
  $nextToken: String
  $orderId: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $userId: String!
) {
  listJDPProductOrderByUserIdAndOrderId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orderId: $orderId
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductOrderByUserIdAndOrderIdQueryVariables,
  APITypes.ListJDPProductOrderByUserIdAndOrderIdQuery
>;
export const listJDPProductOrders = /* GraphQL */ `query ListJDPProductOrders(
  $filter: ModelJDPProductOrderFilterInput
  $limit: Int
  $nextToken: String
  $orderId: String
  $sortDirection: ModelSortDirection
) {
  listJDPProductOrders(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orderId: $orderId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductOrdersQueryVariables,
  APITypes.ListJDPProductOrdersQuery
>;
export const listJDPProducts = /* GraphQL */ `query ListJDPProducts(
  $filter: ModelJDPProductFilterInput
  $limit: Int
  $nextToken: String
  $productId: String
  $sortDirection: ModelSortDirection
) {
  listJDPProducts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPProductsQueryVariables,
  APITypes.ListJDPProductsQuery
>;
export const listJDPUserSessions = /* GraphQL */ `query ListJDPUserSessions(
  $filter: ModelJDPUserSessionFilterInput
  $limit: Int
  $nextToken: String
  $sessionKey: String
  $sortDirection: ModelSortDirection
) {
  listJDPUserSessions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sessionKey: $sessionKey
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJDPUserSessionsQueryVariables,
  APITypes.ListJDPUserSessionsQuery
>;
