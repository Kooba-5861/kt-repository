import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { JDPProduct, JDPProductInventory, JDPProductOrder } from "./types";

const PRODUCT_TABLE_PARAMETER_NAME = `/jdp/amplify/${process.env.AMPLIFY_ARTIFACT_ID}/JDPProduct`;
const PRODUCT_ORDER_TABLE_PARAMETER_NAME = `/jdp/amplify/${process.env.AMPLIFY_ARTIFACT_ID}/JDPProductOrder`;
const PRODUCT_INVENTORY_TABLE_PARAMETER_NAME = `/jdp/amplify/${process.env.AMPLIFY_ARTIFACT_ID}/JDPProductInventory`;

export default class DatabaseService {
  readonly client: DynamoDBDocumentClient;
  private productTable: string = '';
  private productOrderTable: string = '';
  private productInventoryTable: string = '';

  constructor () {
    this.client = DynamoDBDocumentClient.from(new DynamoDBClient({
      apiVersion: "2012-08-10",
      region: "ap-northeast-1"
    }));
  }

  public async init () {
    const client = new SSMClient({
      apiVersion: "2014-11-06",
      region: "ap-northeast-1"
    });

    const command = new GetParametersCommand({
      Names: [
        PRODUCT_TABLE_PARAMETER_NAME,
        PRODUCT_ORDER_TABLE_PARAMETER_NAME,
        PRODUCT_INVENTORY_TABLE_PARAMETER_NAME
      ]
    });
    const response = await client.send(command);
    if (!response.Parameters || response.Parameters.length !== 3) {
      throw new Error("SSM Parameter not found.");
    }
    this.productTable = response.Parameters.filter(p => p.Name === PRODUCT_TABLE_PARAMETER_NAME)[0].Value ?? '';
    this.productOrderTable = response.Parameters.filter(p => p.Name === PRODUCT_ORDER_TABLE_PARAMETER_NAME)[0].Value ?? '';
    this.productInventoryTable = response.Parameters.filter(p => p.Name === PRODUCT_INVENTORY_TABLE_PARAMETER_NAME)[0].Value ?? '';
  }

  public async getProduct (productId: string, consistentRead: boolean = false) {
    try {
      const command = new GetCommand({
        TableName: this.productTable,
        Key: {
          productId: productId
        },
        ConsistentRead: consistentRead
      });
      const res = await this.client.send(command);
      if (!res.Item) {
        return null;
      }
      return JDPProduct.from(res.Item);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async getProductOrder (orderId: string, consistentRead: boolean = false) {
    try {
      const command = new GetCommand({
        TableName: this.productOrderTable,
        Key: {
          orderId: orderId
        },
        ConsistentRead: consistentRead
      });
      const res = await this.client.send(command);
      if (!res.Item) {
        return null;
      }
      return JDPProductOrder.from(res.Item);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async getProductInventories (productId: string) {
    const command = new QueryCommand({
      TableName: this.productInventoryTable,
      KeyConditionExpression: 'productId = :productId',
      ExpressionAttributeValues: {
        ':productId': productId
      }
    });
    const res = await this.client.send(command);
    return res.Items?.map(item => JDPProductInventory.from(item)) ?? [];
  }

  public async getProductInventoriesFromOrder (orderId: string) {
    const command = new QueryCommand({
      TableName: this.productInventoryTable,
      IndexName: 'OrderIdIndex',
      KeyConditionExpression: 'orderId = :orderId',
      ExpressionAttributeValues: {
        ':orderId': orderId
      }
    });
    const res = await this.client.send(command);
    return res.Items?.map(item => JDPProductInventory.from(item)) ?? [];
  }

  public async updateProductOrderStatus (orderId: string, orderStatus: string) {
    const command = new UpdateCommand({
      TableName: this.productOrderTable,
      Key: {
        orderId: orderId
      },
      UpdateExpression: 'SET orderStatus = :orderStatus',
      ExpressionAttributeValues: {
        ':orderStatus': orderStatus
      }
    });
    await this.client.send(command);
  }

  public async updateProductOrderMeta (orderId: string, meta: any) {
    const command = new UpdateCommand({
      TableName: this.productOrderTable,
      Key: {
        orderId: orderId
      },
      UpdateExpression: 'SET meta = :meta',
      ExpressionAttributeValues: {
        ':meta': meta
      }
    });
    await this.client.send(command);
  }

  public async soldProductInventory (productId: string, resourceId: string) {
    // inventoryStatus を "sold" に更新
    const command = new UpdateCommand({
      TableName: this.productInventoryTable,
      Key: {
        productId: productId,
        resourceId: resourceId,
      },
      UpdateExpression: 'SET inventoryStatus = :inventoryStatus',
      ExpressionAttributeValues: {
        ':inventoryStatus': 'sold'
      }
    });
    await this.client.send(command);
  }

  public async getExpiredProductInventory () {
    // 期限切れの商品在庫を取得するクエリを作成. パーティションキーは inventoryStatus でソートキーは reservedExpireAt. 現在時刻よりも古い商品在庫を取得する.
    const command = new QueryCommand({
      TableName: this.productInventoryTable,
      IndexName: 'ExpiredIndex',
      KeyConditionExpression: 'inventoryStatus = :status AND reservedExpireAt < :currentTime',
      ExpressionAttributeValues: {
        ':status': 'reserved',
        ':currentTime': Math.floor(Date.now() / 1000)
      }
    });
    const res = await this.client.send(command);
    if (!res.Items) {
      return [];
    }
    return res.Items.map(item => JDPProductInventory.from(item));
  };

  public async activeProductInventory (productId: string, resourceId: string) {
    // 商品在庫のステータスを "active" に更新
    const command = new UpdateCommand({
      TableName: this.productInventoryTable,
      Key: {
        productId: productId,
        resourceId: resourceId,
      },
      UpdateExpression: 'SET inventoryStatus = :inventoryStatus REMOVE orderId, reservedExpireAt',
      ExpressionAttributeValues: {
        ':inventoryStatus': 'active',
      }
    });
    await this.client.send(command);
  }
}
