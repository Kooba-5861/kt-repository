import { Handler } from 'aws-lambda';
import DatabaseService from "../lib/database/DatabaseService";

// Lambda のハンドラー関数
export const handler: Handler = async (event, context) => {
  try {
    // 現在時刻を取得
    const currentTime = new Date().toISOString();

    const database = new DatabaseService();
    await database.init();
    const productInventories = await database.getExpiredProductInventory();
    if (productInventories.length > 0) {
      for (const inventory of productInventories) {
        await database.activeProductInventory(inventory.productId, inventory.resourceId);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Scheduled task completed successfully',
        timestamp: currentTime
      })
    };
  } catch (error) {
    console.error('Error in Lambda execution:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

