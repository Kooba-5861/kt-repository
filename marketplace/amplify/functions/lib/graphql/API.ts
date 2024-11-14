/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type JDPProduct = {
  __typename: "JDPProduct",
  createdAt: string,
  productCategory?: string | null,
  productDescription: string,
  productId: string,
  productImage?: string | null,
  productName: string,
  productPrice: number,
  productTax: number,
  productType: string,
  updatedAt: string,
};

export type JDPProductCategory = {
  __typename: "JDPProductCategory",
  categoryName: string,
  createdAt: string,
  updatedAt: string,
};

export type JDPProductInventory = {
  __typename: "JDPProductInventory",
  appId?: string | null,
  createdAt: string,
  inventoryStatus: string,
  nftId?: string | null,
  orderId?: string | null,
  productId: string,
  reservedExpireAt?: number | null,
  resourceId: string,
  updatedAt: string,
};

export type JDPProductOrder = {
  __typename: "JDPProductOrder",
  accessId?: string | null,
  accessPass?: string | null,
  amount: number,
  createdAt: string,
  linkUrl: string,
  linkUrlExpiredAt: number,
  meta?: string | null,
  orderId: string,
  orderStatus: string,
  productId: string,
  productType: string,
  tax: number,
  updatedAt: string,
  userId: string,
};

export type JDPUserSession = {
  __typename: "JDPUserSession",
  accessToken: string,
  appId: string,
  createdAt: string,
  deviceId: string,
  invalid: boolean,
  refreshToken: string,
  sessionKey: string,
  updatedAt: string,
  userId: string,
};

export type ModelJDPProductFilterInput = {
  and?: Array< ModelJDPProductFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelJDPProductFilterInput | null,
  or?: Array< ModelJDPProductFilterInput | null > | null,
  productCategory?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productPrice?: ModelIntInput | null,
  productTax?: ModelIntInput | null,
  productType?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelJDPProductConnection = {
  __typename: "ModelJDPProductConnection",
  items:  Array<JDPProduct | null >,
  nextToken?: string | null,
};

export type ModelJDPProductCategoryFilterInput = {
  and?: Array< ModelJDPProductCategoryFilterInput | null > | null,
  categoryName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelJDPProductCategoryFilterInput | null,
  or?: Array< ModelJDPProductCategoryFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelJDPProductCategoryConnection = {
  __typename: "ModelJDPProductCategoryConnection",
  items:  Array<JDPProductCategory | null >,
  nextToken?: string | null,
};

export type ModelJDPProductInventoryFilterInput = {
  and?: Array< ModelJDPProductInventoryFilterInput | null > | null,
  appId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  inventoryStatus?: ModelStringInput | null,
  nftId?: ModelStringInput | null,
  not?: ModelJDPProductInventoryFilterInput | null,
  or?: Array< ModelJDPProductInventoryFilterInput | null > | null,
  orderId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  reservedExpireAt?: ModelIntInput | null,
  resourceId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelJDPProductInventoryConnection = {
  __typename: "ModelJDPProductInventoryConnection",
  items:  Array<JDPProductInventory | null >,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
};

export type ModelJDPProductOrderFilterInput = {
  accessId?: ModelStringInput | null,
  accessPass?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelJDPProductOrderFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  linkUrl?: ModelStringInput | null,
  linkUrlExpiredAt?: ModelIntInput | null,
  meta?: ModelStringInput | null,
  not?: ModelJDPProductOrderFilterInput | null,
  or?: Array< ModelJDPProductOrderFilterInput | null > | null,
  orderId?: ModelStringInput | null,
  orderStatus?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productType?: ModelStringInput | null,
  tax?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelJDPProductOrderConnection = {
  __typename: "ModelJDPProductOrderConnection",
  items:  Array<JDPProductOrder | null >,
  nextToken?: string | null,
};

export type ModelJDPUserSessionFilterInput = {
  accessToken?: ModelStringInput | null,
  and?: Array< ModelJDPUserSessionFilterInput | null > | null,
  appId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deviceId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  invalid?: ModelBooleanInput | null,
  not?: ModelJDPUserSessionFilterInput | null,
  or?: Array< ModelJDPUserSessionFilterInput | null > | null,
  refreshToken?: ModelStringInput | null,
  sessionKey?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelJDPUserSessionConnection = {
  __typename: "ModelJDPUserSessionConnection",
  items:  Array<JDPUserSession | null >,
  nextToken?: string | null,
};

export type ModelJDPProductConditionInput = {
  and?: Array< ModelJDPProductConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelJDPProductConditionInput | null,
  or?: Array< ModelJDPProductConditionInput | null > | null,
  productCategory?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productPrice?: ModelIntInput | null,
  productTax?: ModelIntInput | null,
  productType?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateJDPProductInput = {
  productCategory?: string | null,
  productDescription: string,
  productId: string,
  productImage?: string | null,
  productName: string,
  productPrice: number,
  productTax: number,
  productType: string,
};

export type ModelJDPProductCategoryConditionInput = {
  and?: Array< ModelJDPProductCategoryConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelJDPProductCategoryConditionInput | null,
  or?: Array< ModelJDPProductCategoryConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateJDPProductCategoryInput = {
  categoryName: string,
};

export type ModelJDPProductInventoryConditionInput = {
  and?: Array< ModelJDPProductInventoryConditionInput | null > | null,
  appId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  inventoryStatus?: ModelStringInput | null,
  nftId?: ModelStringInput | null,
  not?: ModelJDPProductInventoryConditionInput | null,
  or?: Array< ModelJDPProductInventoryConditionInput | null > | null,
  orderId?: ModelStringInput | null,
  reservedExpireAt?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateJDPProductInventoryInput = {
  appId?: string | null,
  inventoryStatus: string,
  nftId?: string | null,
  orderId?: string | null,
  productId: string,
  reservedExpireAt?: number | null,
  resourceId: string,
};

export type ModelJDPProductOrderConditionInput = {
  accessId?: ModelStringInput | null,
  accessPass?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelJDPProductOrderConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  linkUrl?: ModelStringInput | null,
  linkUrlExpiredAt?: ModelIntInput | null,
  meta?: ModelStringInput | null,
  not?: ModelJDPProductOrderConditionInput | null,
  or?: Array< ModelJDPProductOrderConditionInput | null > | null,
  orderStatus?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productType?: ModelStringInput | null,
  tax?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateJDPProductOrderInput = {
  accessId?: string | null,
  accessPass?: string | null,
  amount: number,
  linkUrl: string,
  linkUrlExpiredAt: number,
  meta?: string | null,
  orderId: string,
  orderStatus: string,
  productId: string,
  productType: string,
  tax: number,
  userId: string,
};

export type ModelJDPUserSessionConditionInput = {
  accessToken?: ModelStringInput | null,
  and?: Array< ModelJDPUserSessionConditionInput | null > | null,
  appId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deviceId?: ModelStringInput | null,
  invalid?: ModelBooleanInput | null,
  not?: ModelJDPUserSessionConditionInput | null,
  or?: Array< ModelJDPUserSessionConditionInput | null > | null,
  refreshToken?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateJDPUserSessionInput = {
  accessToken: string,
  appId: string,
  deviceId: string,
  invalid: boolean,
  refreshToken: string,
  sessionKey: string,
  userId: string,
};

export type DeleteJDPProductInput = {
  productId: string,
};

export type DeleteJDPProductCategoryInput = {
  categoryName: string,
};

export type DeleteJDPProductInventoryInput = {
  productId: string,
  resourceId: string,
};

export type DeleteJDPProductOrderInput = {
  orderId: string,
};

export type DeleteJDPUserSessionInput = {
  sessionKey: string,
};

export type UpdateJDPProductInput = {
  productCategory?: string | null,
  productDescription?: string | null,
  productId: string,
  productImage?: string | null,
  productName?: string | null,
  productPrice?: number | null,
  productTax?: number | null,
  productType?: string | null,
};

export type UpdateJDPProductCategoryInput = {
  categoryName: string,
};

export type UpdateJDPProductInventoryInput = {
  appId?: string | null,
  inventoryStatus?: string | null,
  nftId?: string | null,
  orderId?: string | null,
  productId: string,
  reservedExpireAt?: number | null,
  resourceId: string,
};

export type UpdateJDPProductOrderInput = {
  accessId?: string | null,
  accessPass?: string | null,
  amount?: number | null,
  linkUrl?: string | null,
  linkUrlExpiredAt?: number | null,
  meta?: string | null,
  orderId: string,
  orderStatus?: string | null,
  productId?: string | null,
  productType?: string | null,
  tax?: number | null,
  userId?: string | null,
};

export type UpdateJDPUserSessionInput = {
  accessToken?: string | null,
  appId?: string | null,
  deviceId?: string | null,
  invalid?: boolean | null,
  refreshToken?: string | null,
  sessionKey: string,
  userId?: string | null,
};

export type ModelSubscriptionJDPProductFilterInput = {
  and?: Array< ModelSubscriptionJDPProductFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionJDPProductFilterInput | null > | null,
  productCategory?: ModelSubscriptionStringInput | null,
  productDescription?: ModelSubscriptionStringInput | null,
  productId?: ModelSubscriptionStringInput | null,
  productImage?: ModelSubscriptionStringInput | null,
  productName?: ModelSubscriptionStringInput | null,
  productPrice?: ModelSubscriptionIntInput | null,
  productTax?: ModelSubscriptionIntInput | null,
  productType?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionJDPProductCategoryFilterInput = {
  and?: Array< ModelSubscriptionJDPProductCategoryFilterInput | null > | null,
  categoryName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionJDPProductCategoryFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionJDPProductInventoryFilterInput = {
  and?: Array< ModelSubscriptionJDPProductInventoryFilterInput | null > | null,
  appId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  inventoryStatus?: ModelSubscriptionStringInput | null,
  nftId?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionJDPProductInventoryFilterInput | null > | null,
  orderId?: ModelSubscriptionStringInput | null,
  productId?: ModelSubscriptionStringInput | null,
  reservedExpireAt?: ModelSubscriptionIntInput | null,
  resourceId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionJDPProductOrderFilterInput = {
  accessId?: ModelSubscriptionStringInput | null,
  accessPass?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionJDPProductOrderFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  linkUrl?: ModelSubscriptionStringInput | null,
  linkUrlExpiredAt?: ModelSubscriptionIntInput | null,
  meta?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionJDPProductOrderFilterInput | null > | null,
  orderId?: ModelSubscriptionStringInput | null,
  orderStatus?: ModelSubscriptionStringInput | null,
  productId?: ModelSubscriptionStringInput | null,
  productType?: ModelSubscriptionStringInput | null,
  tax?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionJDPUserSessionFilterInput = {
  accessToken?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJDPUserSessionFilterInput | null > | null,
  appId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  deviceId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  invalid?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionJDPUserSessionFilterInput | null > | null,
  refreshToken?: ModelSubscriptionStringInput | null,
  sessionKey?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type GetJDPProductQueryVariables = {
  productId: string,
};

export type GetJDPProductQuery = {
  getJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type GetJDPProductCategoryQueryVariables = {
  categoryName: string,
};

export type GetJDPProductCategoryQuery = {
  getJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetJDPProductInventoryQueryVariables = {
  productId: string,
  resourceId: string,
};

export type GetJDPProductInventoryQuery = {
  getJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type GetJDPProductOrderQueryVariables = {
  orderId: string,
};

export type GetJDPProductOrderQuery = {
  getJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetJDPUserSessionQueryVariables = {
  sessionKey: string,
};

export type GetJDPUserSessionQuery = {
  getJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type ListJDPProductByProductCategoryAndProductIdQueryVariables = {
  filter?: ModelJDPProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productCategory: string,
  productId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductByProductCategoryAndProductIdQuery = {
  listJDPProductByProductCategoryAndProductId?:  {
    __typename: "ModelJDPProductConnection",
    items:  Array< {
      __typename: "JDPProduct",
      createdAt: string,
      productCategory?: string | null,
      productDescription: string,
      productId: string,
      productImage?: string | null,
      productName: string,
      productPrice: number,
      productTax: number,
      productType: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductCategoriesQueryVariables = {
  categoryName?: string | null,
  filter?: ModelJDPProductCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductCategoriesQuery = {
  listJDPProductCategories?:  {
    __typename: "ModelJDPProductCategoryConnection",
    items:  Array< {
      __typename: "JDPProductCategory",
      categoryName: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductInventoriesQueryVariables = {
  filter?: ModelJDPProductInventoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productId?: string | null,
  resourceId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductInventoriesQuery = {
  listJDPProductInventories?:  {
    __typename: "ModelJDPProductInventoryConnection",
    items:  Array< {
      __typename: "JDPProductInventory",
      appId?: string | null,
      createdAt: string,
      inventoryStatus: string,
      nftId?: string | null,
      orderId?: string | null,
      productId: string,
      reservedExpireAt?: number | null,
      resourceId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductInventoryByInventoryStatusAndReservedExpireAtQueryVariables = {
  filter?: ModelJDPProductInventoryFilterInput | null,
  inventoryStatus: string,
  limit?: number | null,
  nextToken?: string | null,
  reservedExpireAt?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductInventoryByInventoryStatusAndReservedExpireAtQuery = {
  listJDPProductInventoryByInventoryStatusAndReservedExpireAt?:  {
    __typename: "ModelJDPProductInventoryConnection",
    items:  Array< {
      __typename: "JDPProductInventory",
      appId?: string | null,
      createdAt: string,
      inventoryStatus: string,
      nftId?: string | null,
      orderId?: string | null,
      productId: string,
      reservedExpireAt?: number | null,
      resourceId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductInventoryByOrderIdQueryVariables = {
  filter?: ModelJDPProductInventoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orderId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductInventoryByOrderIdQuery = {
  listJDPProductInventoryByOrderId?:  {
    __typename: "ModelJDPProductInventoryConnection",
    items:  Array< {
      __typename: "JDPProductInventory",
      appId?: string | null,
      createdAt: string,
      inventoryStatus: string,
      nftId?: string | null,
      orderId?: string | null,
      productId: string,
      reservedExpireAt?: number | null,
      resourceId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductInventoryByProductIdAndInventoryStatusQueryVariables = {
  filter?: ModelJDPProductInventoryFilterInput | null,
  inventoryStatus?: ModelStringKeyConditionInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductInventoryByProductIdAndInventoryStatusQuery = {
  listJDPProductInventoryByProductIdAndInventoryStatus?:  {
    __typename: "ModelJDPProductInventoryConnection",
    items:  Array< {
      __typename: "JDPProductInventory",
      appId?: string | null,
      createdAt: string,
      inventoryStatus: string,
      nftId?: string | null,
      orderId?: string | null,
      productId: string,
      reservedExpireAt?: number | null,
      resourceId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductOrderByUserIdAndOrderIdQueryVariables = {
  filter?: ModelJDPProductOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orderId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  userId: string,
};

export type ListJDPProductOrderByUserIdAndOrderIdQuery = {
  listJDPProductOrderByUserIdAndOrderId?:  {
    __typename: "ModelJDPProductOrderConnection",
    items:  Array< {
      __typename: "JDPProductOrder",
      accessId?: string | null,
      accessPass?: string | null,
      amount: number,
      createdAt: string,
      linkUrl: string,
      linkUrlExpiredAt: number,
      meta?: string | null,
      orderId: string,
      orderStatus: string,
      productId: string,
      productType: string,
      tax: number,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductOrdersQueryVariables = {
  filter?: ModelJDPProductOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orderId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductOrdersQuery = {
  listJDPProductOrders?:  {
    __typename: "ModelJDPProductOrderConnection",
    items:  Array< {
      __typename: "JDPProductOrder",
      accessId?: string | null,
      accessPass?: string | null,
      amount: number,
      createdAt: string,
      linkUrl: string,
      linkUrlExpiredAt: number,
      meta?: string | null,
      orderId: string,
      orderStatus: string,
      productId: string,
      productType: string,
      tax: number,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPProductsQueryVariables = {
  filter?: ModelJDPProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPProductsQuery = {
  listJDPProducts?:  {
    __typename: "ModelJDPProductConnection",
    items:  Array< {
      __typename: "JDPProduct",
      createdAt: string,
      productCategory?: string | null,
      productDescription: string,
      productId: string,
      productImage?: string | null,
      productName: string,
      productPrice: number,
      productTax: number,
      productType: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListJDPUserSessionsQueryVariables = {
  filter?: ModelJDPUserSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sessionKey?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListJDPUserSessionsQuery = {
  listJDPUserSessions?:  {
    __typename: "ModelJDPUserSessionConnection",
    items:  Array< {
      __typename: "JDPUserSession",
      accessToken: string,
      appId: string,
      createdAt: string,
      deviceId: string,
      invalid: boolean,
      refreshToken: string,
      sessionKey: string,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateJDPProductMutationVariables = {
  condition?: ModelJDPProductConditionInput | null,
  input: CreateJDPProductInput,
};

export type CreateJDPProductMutation = {
  createJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type CreateJDPProductCategoryMutationVariables = {
  condition?: ModelJDPProductCategoryConditionInput | null,
  input: CreateJDPProductCategoryInput,
};

export type CreateJDPProductCategoryMutation = {
  createJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateJDPProductInventoryMutationVariables = {
  condition?: ModelJDPProductInventoryConditionInput | null,
  input: CreateJDPProductInventoryInput,
};

export type CreateJDPProductInventoryMutation = {
  createJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type CreateJDPProductOrderMutationVariables = {
  condition?: ModelJDPProductOrderConditionInput | null,
  input: CreateJDPProductOrderInput,
};

export type CreateJDPProductOrderMutation = {
  createJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateJDPUserSessionMutationVariables = {
  condition?: ModelJDPUserSessionConditionInput | null,
  input: CreateJDPUserSessionInput,
};

export type CreateJDPUserSessionMutation = {
  createJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteJDPProductMutationVariables = {
  condition?: ModelJDPProductConditionInput | null,
  input: DeleteJDPProductInput,
};

export type DeleteJDPProductMutation = {
  deleteJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type DeleteJDPProductCategoryMutationVariables = {
  condition?: ModelJDPProductCategoryConditionInput | null,
  input: DeleteJDPProductCategoryInput,
};

export type DeleteJDPProductCategoryMutation = {
  deleteJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteJDPProductInventoryMutationVariables = {
  condition?: ModelJDPProductInventoryConditionInput | null,
  input: DeleteJDPProductInventoryInput,
};

export type DeleteJDPProductInventoryMutation = {
  deleteJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type DeleteJDPProductOrderMutationVariables = {
  condition?: ModelJDPProductOrderConditionInput | null,
  input: DeleteJDPProductOrderInput,
};

export type DeleteJDPProductOrderMutation = {
  deleteJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteJDPUserSessionMutationVariables = {
  condition?: ModelJDPUserSessionConditionInput | null,
  input: DeleteJDPUserSessionInput,
};

export type DeleteJDPUserSessionMutation = {
  deleteJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateJDPProductMutationVariables = {
  condition?: ModelJDPProductConditionInput | null,
  input: UpdateJDPProductInput,
};

export type UpdateJDPProductMutation = {
  updateJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type UpdateJDPProductCategoryMutationVariables = {
  condition?: ModelJDPProductCategoryConditionInput | null,
  input: UpdateJDPProductCategoryInput,
};

export type UpdateJDPProductCategoryMutation = {
  updateJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateJDPProductInventoryMutationVariables = {
  condition?: ModelJDPProductInventoryConditionInput | null,
  input: UpdateJDPProductInventoryInput,
};

export type UpdateJDPProductInventoryMutation = {
  updateJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type UpdateJDPProductOrderMutationVariables = {
  condition?: ModelJDPProductOrderConditionInput | null,
  input: UpdateJDPProductOrderInput,
};

export type UpdateJDPProductOrderMutation = {
  updateJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateJDPUserSessionMutationVariables = {
  condition?: ModelJDPUserSessionConditionInput | null,
  input: UpdateJDPUserSessionInput,
};

export type UpdateJDPUserSessionMutation = {
  updateJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateJDPProductSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductFilterInput | null,
};

export type OnCreateJDPProductSubscription = {
  onCreateJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJDPProductCategorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductCategoryFilterInput | null,
};

export type OnCreateJDPProductCategorySubscription = {
  onCreateJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJDPProductInventorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductInventoryFilterInput | null,
};

export type OnCreateJDPProductInventorySubscription = {
  onCreateJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJDPProductOrderSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductOrderFilterInput | null,
};

export type OnCreateJDPProductOrderSubscription = {
  onCreateJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateJDPUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionJDPUserSessionFilterInput | null,
};

export type OnCreateJDPUserSessionSubscription = {
  onCreateJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteJDPProductSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductFilterInput | null,
};

export type OnDeleteJDPProductSubscription = {
  onDeleteJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJDPProductCategorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductCategoryFilterInput | null,
};

export type OnDeleteJDPProductCategorySubscription = {
  onDeleteJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJDPProductInventorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductInventoryFilterInput | null,
};

export type OnDeleteJDPProductInventorySubscription = {
  onDeleteJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJDPProductOrderSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductOrderFilterInput | null,
};

export type OnDeleteJDPProductOrderSubscription = {
  onDeleteJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteJDPUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionJDPUserSessionFilterInput | null,
};

export type OnDeleteJDPUserSessionSubscription = {
  onDeleteJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateJDPProductSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductFilterInput | null,
};

export type OnUpdateJDPProductSubscription = {
  onUpdateJDPProduct?:  {
    __typename: "JDPProduct",
    createdAt: string,
    productCategory?: string | null,
    productDescription: string,
    productId: string,
    productImage?: string | null,
    productName: string,
    productPrice: number,
    productTax: number,
    productType: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJDPProductCategorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductCategoryFilterInput | null,
};

export type OnUpdateJDPProductCategorySubscription = {
  onUpdateJDPProductCategory?:  {
    __typename: "JDPProductCategory",
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJDPProductInventorySubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductInventoryFilterInput | null,
};

export type OnUpdateJDPProductInventorySubscription = {
  onUpdateJDPProductInventory?:  {
    __typename: "JDPProductInventory",
    appId?: string | null,
    createdAt: string,
    inventoryStatus: string,
    nftId?: string | null,
    orderId?: string | null,
    productId: string,
    reservedExpireAt?: number | null,
    resourceId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJDPProductOrderSubscriptionVariables = {
  filter?: ModelSubscriptionJDPProductOrderFilterInput | null,
};

export type OnUpdateJDPProductOrderSubscription = {
  onUpdateJDPProductOrder?:  {
    __typename: "JDPProductOrder",
    accessId?: string | null,
    accessPass?: string | null,
    amount: number,
    createdAt: string,
    linkUrl: string,
    linkUrlExpiredAt: number,
    meta?: string | null,
    orderId: string,
    orderStatus: string,
    productId: string,
    productType: string,
    tax: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateJDPUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionJDPUserSessionFilterInput | null,
};

export type OnUpdateJDPUserSessionSubscription = {
  onUpdateJDPUserSession?:  {
    __typename: "JDPUserSession",
    accessToken: string,
    appId: string,
    createdAt: string,
    deviceId: string,
    invalid: boolean,
    refreshToken: string,
    sessionKey: string,
    updatedAt: string,
    userId: string,
  } | null,
};
