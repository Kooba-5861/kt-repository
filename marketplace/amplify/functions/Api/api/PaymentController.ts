import { Request, Response } from 'express'
import dayjs from "dayjs";
import Timezone from "dayjs/plugin/timezone";
import Utc from "dayjs/plugin/utc";
import RequestValidator from "../util/RequestValidator";
import { getProduct } from "../database/Product";
import { createProductOrder, getProductOrder, updateProductOrderAccessInfo } from "../database/ProductOrder";
import { LinkPlusUrlPaymentParam, getLinkPlusUrlPayment, parseGmoResult } from "../util/payment";
import { invokeGrantNFT } from "../../lib/util/lambda";
import { getProductInventories, reserveProductInventory } from "../database/ProductInventory";

dayjs.extend(Timezone);
dayjs.extend(Utc);

export class PaymentController  extends RequestValidator {
  private static paymentController: PaymentController | null = null;

  public static createPaymentUrl = async (req: Request, res: Response): Promise<void> => {
    console.error(`The payment sdk is not yet setting.`);
    res.status(500).json({result:false, message:'Internal Server Error (The payment sdk is not yet setting)'}).end();
    return;
  }

  public static callbackApiPayment = async (req: Request, res: Response): Promise<void> => {
    console.error(`The payment sdk is not yet setting.`);
    res.status(403).end();
    return;
  }

  private getRandomString = (length: number): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  private static async getController (): Promise<PaymentController> {
    if (!PaymentController.paymentController) {
      PaymentController.paymentController = new PaymentController();
      PaymentController.paymentController.dataLocker.initialize();
    }
    return PaymentController.paymentController;
  }
}
