import { Schema } from "../../../data/resource";
import { graphQlClient } from "../../lib/graphql";
import { listJDPProductCategories } from "../../lib/graphql/queries";

export const getProductCategory = async (): Promise<string[]> => {
  const res = await graphQlClient.graphql({
    query: listJDPProductCategories,
    variables: {
      limit: 1000,
    }
  });
  if (res.errors) {
    console.error(res.errors);
    throw new Error("ProductCategory not found.");
  }
  if (res.data.listJDPProductCategories) {
    return res.data.listJDPProductCategories.items.map((item: Schema["JDPProductCategory"]["type"]) => item.categoryName);
  } else {
    throw new Error("ProductCategory not found.");
  }
}
