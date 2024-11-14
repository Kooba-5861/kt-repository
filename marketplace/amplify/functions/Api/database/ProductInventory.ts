import { Schema } from "../../../data/resource";
import { graphQlClient } from "../../lib/graphql";
import { listJDPProductInventories } from "../../lib/graphql/queries";
import { updateJDPProductInventory } from "../../lib/graphql/mutations";

export const getProductInventories = async (productId: string): Promise<Schema["JDPProductInventory"]["type"][]> => {
  const res = await graphQlClient.graphql({
    query: listJDPProductInventories,
    variables: {
      productId,
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("Product not found.");
  }
  if (res.data.listJDPProductInventories) {
    return res.data.listJDPProductInventories.items;
  } else {
    throw new Error("Product not found.");
  }
}

export const reserveProductInventory = async (productId: string, resourceId: string, orderId: string, reservedExpireAt: number): Promise<void> => {
  const res = await graphQlClient.graphql({
    query: updateJDPProductInventory,
    variables: {
      input: {
        productId,
        resourceId,
        orderId,
        reservedExpireAt,
        inventoryStatus: "reserved",
      },
      condition: {
        // inventoryStatus が "active" のものだけ更新
        inventoryStatus: {
          eq: "active",
        }
      }
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("ProductInventory update failed.");
  }
}
