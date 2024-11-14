import { Schema } from "../../../data/resource";
import { graphQlClient } from "../../lib/graphql";
import { getJDPProduct, listJDPProductInventoryByProductIdAndInventoryStatus } from "../../lib/graphql/queries";

export const getProduct = async (productId: string): Promise<Schema["JDPProduct"]["type"]> => {
  const res = await graphQlClient.graphql({
    query: getJDPProduct,
    variables: {
      productId,
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("Product not found.");
  }
  if (res.data.getJDPProduct) {
    return res.data.getJDPProduct;
  } else {
    throw new Error("Product not found.");
  }
}

export const getProductQuantity = async (productId: string): Promise<number> => {
  const res = await graphQlClient.graphql({
    query: listJDPProductInventoryByProductIdAndInventoryStatus,
    variables: {
      productId,
      inventoryStatus: {
        eq: "active",
      },
    },
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("getProductQuantity Product not found.");
  }
  const productInventories = res.data.listJDPProductInventoryByProductIdAndInventoryStatus.items;
  if (!productInventories) {
    return 0;
  }
  return productInventories.length;
}
