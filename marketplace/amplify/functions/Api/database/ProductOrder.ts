import { Schema } from "../../../data/resource";
import { graphQlClient } from "../../lib/graphql";
import { getJDPProductOrder } from "../../lib/graphql/queries";
import { createJDPProductOrder, updateJDPProductOrder } from "../../lib/graphql/mutations";

export const createProductOrder = async (param: {
  userId: string,
  orderId: string,
  amount: number,
  tax: number,
  linkUrl: string,
  linkUrlExpiredAt: number,
  productId: string,
  productType: string,
  accessId: string,
  accessPass: string,
}): Promise<Schema["JDPProductOrder"]["type"]> => {
  const res = await graphQlClient.graphql({
    query: createJDPProductOrder,
    variables: {
      input: {
        orderId: param.orderId,
        productId: param.productId,
        productType: param.productType,
        userId: param.userId,
        amount: param.amount,
        tax: param.tax,
        orderStatus: "UNPROCESSED",
        linkUrl: param.linkUrl,
        linkUrlExpiredAt: param.linkUrlExpiredAt,
        accessId: param.accessId,
        accessPass: param.accessPass,
      }
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("createProductOrder failed.");
  }
  return res.data.createJDPProductOrder;
}

export const getProductOrder = async (orderId: string): Promise<Schema["JDPProductOrder"]["type"] | null> => {
  const res = await graphQlClient.graphql({
    query: getJDPProductOrder,
    variables: {
      orderId,
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("ProductOrder not found.");
  }
  if (res.data.getJDPProductOrder) {
    return res.data.getJDPProductOrder;
  } else {
    return null;
  }
}

export const updateProductOrderAccessInfo = async (orderId: string, accessId: string, accessPass: string): Promise<void> => {
  const res = await graphQlClient.graphql({
    query: updateJDPProductOrder,
    variables: {
      input: {
        orderId,
        accessId,
        accessPass,
      }
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("updateProductOrderAccessInfo failed.");
  }
}
