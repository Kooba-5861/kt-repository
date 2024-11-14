import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import querystring from "querystring";
import DatabaseService from "../lib/database/DatabaseService";
import { invokeGrantNFT } from "../lib/util/lambda";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  // https://mp-faq.gmo-pg.com/s/article/F00182
  if (event.requestContext.stage === 'main' && event.requestContext.http.sourceIp !== '210.175.7.20') {
    console.error(`Invalid IP address: ${event.requestContext.http.sourceIp}`);
    return {
      statusCode: 403,
      body: 'Forbidden'
    };
  }

  if (event.requestContext.http.method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  if (!event.body) {
    console.error(`Invalid body: ${event.body}`);
    return {
      statusCode: 403,
      body: 'Forbidden'
    };
  }

  let body = event.body;
  if (event.isBase64Encoded) {
    body = Buffer.from(event.body, 'base64').toString();
    console.info(`Decoded body: ${body}`);
  }
  const paymentResult = querystring.parse(body);
  const orderId = paymentResult['OrderID'];
  const orderStatus = paymentResult['JobCd'];
  const accessId = paymentResult['AccessID'];
  const accessPass = paymentResult['AccessPass'];

  if (typeof orderId !== 'string' || typeof orderStatus !== 'string' || typeof accessId !== 'string' || typeof accessPass !== 'string') {
    console.error(`Invalid OrderID or Status: ${orderId}, ${orderStatus}`);
    console.error(`Invalid AccessID or AccessPass: ${accessId}, ${accessPass}`);
    return {
      statusCode: 200,
      body: '0'
    };
  }

  if (orderStatus !== 'CAPTURE' && orderStatus !== 'VOID') {
    console.error(`Invalid Status: ${orderStatus}`);
    return {
      statusCode: 200,
      body: '0'
    };
  }

  const database = new DatabaseService();
  await database.init();

  const order = await database.getProductOrder(orderId);
  if (!order) {
    console.error(`Order not found: ${orderId}`);
    return {
      statusCode: 200,
      body: '0'
    };
  }

  if (orderStatus === 'VOID') {
    if (order.orderStatus === 'CAPTURE') {
      await database.updateProductOrderStatus(orderId, 'VOID');
    } else {
      console.error(`Order already voided: ${orderId}`);
    }
    return {
      statusCode: 200,
      body: '0'
    };
  }

  if (orderStatus === 'CAPTURE' && order.orderStatus !== 'UNPROCESSED') {
    console.error(`Order already CAPTURE: ${orderId}`);
    return {
      statusCode: 200,
      body: '0'
    };
  }

  const product = await database.getProduct(order.productId);
  if (!product) {
    console.error(`Product not found: ${order.productId}`);
    return {
      statusCode: 200,
      body: '0'
    };
  }

  // ORDER ステータスを AUTH に更新
  await database.updateProductOrderStatus(orderId, 'CAPTURE');

  if (product.productType === 'NFT') {
    await invokeGrantNFT({
      orderId,
      productId: order.productId,
      userId: order.userId
    });
  } else {
    const inventories = await database.getProductInventoriesFromOrder(orderId);
    if (inventories.length === 0) {
      console.error(`ProductInventory not found: ${order.productId}`);
      return {
        statusCode: 200,
        body: '0'
      };
    }
    const inventory = inventories[0];
    await database.soldProductInventory(inventory.productId, inventory.resourceId);
  }

  return {
    statusCode: 200,
    body: '0'
  };
};
