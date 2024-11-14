import DatabaseService from "../lib/database/DatabaseService";
import { grantNftToken } from "../lib/util/datalocker";

export interface GrantNFTEvent {
  orderId: string;
  productId: string;
  userId: string;
}

export const handler = async (event: GrantNFTEvent): Promise<void> => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  const orderId = event.orderId;
  const productId = event.productId;

  // ここで、orderId に対応する注文情報を取得し、orderStatus に応じて処理を行う
  const database = new DatabaseService();
  await database.init();

  const order = await database.getProductOrder(orderId);
  if (!order) {
    console.error(`Order not found: ${orderId}`);
    throw new Error('Order not found');
  }

  const product = await database.getProduct(productId);
  if (!product) {
    console.error(`Product not found: ${productId}`);
    throw new Error('Product not found');
  }

  if (product.productType !== 'NFT') {
    console.error(`Product type is invalid: ${product.productType}. order id = ${orderId}`);
    throw new Error('Product type is invalid');
  }

// 付与する NFT トークンの在庫を取得
  const productInventories = await database.getProductInventoriesFromOrder(orderId);
  if (productInventories.length === 0) {
    console.error(`ProductInventory not found: ${order.productId}`);
    throw new Error('ProductInventory not found');
  }
  const inventory = productInventories[0];
  await grantNftToken(inventory.appId, inventory.nftId, inventory.resourceId, order.userId);
  await database.soldProductInventory(inventory.productId, inventory.resourceId);
};
