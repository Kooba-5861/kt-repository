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
    const controller = await PaymentController.getController();
    const validateRequest = await controller.validatePostRequest(req);
    if (!validateRequest) {
      res.status(401).json({ result: false, message: 'Unauthorized' }).end();
      return;
    }

    const userId: string = controller.userId;
    const productId = req.body.productId;

    if (typeof productId !== "string") {
      res.status(403).json({ result: false, message: 'Forbidden' }).end();
      return;
    }

    // 商品情報の取得
    const product = await getProduct(productId);
    if (!product) {
      res.status(404).json({ result: false, message: 'Not Found' }).end();
      return;
    }

    const productInventories = await getProductInventories(productId);
    // active な在庫を一つ取得
    const inventory = productInventories.find((item) => item.inventoryStatus === "active");
    if (!inventory) {
      res.status(404).json({ result: false, message: 'Not Found' }).end();
      return;
    }

    const totalAmount = product.productPrice;
    const totalTax = product.productTax;
    const host = req.headers.host || "";
    const orderId = `JDP${controller.getRandomString(24)}`;

    const gmoExpireDate = dayjs().tz("Asia/Tokyo").add(5, "minute");
    const param: LinkPlusUrlPaymentParam = {
      orderId: orderId,
      amount: totalAmount,
      tax: totalTax,
      redirectUrl: `https://${host}/prod/api/payment/callback/?orderId=${orderId}&redirect_host=${req.headers["origin"]}`,
      clientField1: userId,
      clientField2: `商品 ${product.productName}`,
      clientField3: `トークンID ${inventory.resourceId}`,
      paymentExpireDate: gmoExpireDate.format("YYYYMMDDHHmm"),
    };

    try {
      const result = await getLinkPlusUrlPayment(param);
      const order = await createProductOrder({
        userId, orderId, amount: totalAmount, tax: totalTax, linkUrl: result.LinkUrl, linkUrlExpiredAt: gmoExpireDate.unix(), productId: product.productId, productType: product.productType, accessId: result.AccessID, accessPass: result.AccessPass,
      });
      if (!order) {
        res.status(500).json({ result: false, message: 'Internal Server Error' }).end();
        return;
      }
      // gmoExpireDate + 5分後に在庫を予約.
      await reserveProductInventory(productId, inventory.resourceId, orderId, gmoExpireDate.add(5, "minute").unix());
      res.status(200).send({
        result: true,
        url: result.LinkUrl,
        orderId,
      }).end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ result: false, message: 'Internal Server Error' }).end();
    }
  }

  public static callbackApiPayment = async (req: Request, res: Response): Promise<void> => {
    if (typeof req.query.orderId !== "string" || typeof req.query.redirect_host !== "string") {
      res.status(403).end();
      return;
    }

    const order = await getProductOrder(req.query.orderId);
    if (!order) {
      console.error(`Order not found: ${req.query.orderId}`);
      res.status(403).end();
      return;
    }

    if (order?.orderStatus === "UNPROCESSED") {
      // wait を入れる.
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // req.body の Buffer をパース
    const params = new URLSearchParams(req.body.toString());
    const result = params.get("result");
    if (result) {
      const gmoResult = parseGmoResult(result);
      if (gmoResult.transactionresult.Result === "PAYSUCCESS") {
        const accessId = gmoResult.transactionresult.AccessID;
        const accessPass = gmoResult.transactionresult.AccessPass;
        await updateProductOrderAccessInfo(req.query.orderId, accessId, accessPass);
        return res.redirect(`${req.query.redirect_host}/products/complete/?orderId=${req.query.orderId}`);
      }
    }
    res.redirect(`${req.query.redirect_host}/products/${order?.productId}/?orderId=${req.query.orderId}`);
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
