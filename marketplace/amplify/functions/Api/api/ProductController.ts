import { Request, Response } from 'express'
import RequestValidator from "../util/RequestValidator";
import { getProductQuantity, getProduct } from "../database/Product";
import { getProductOrder } from "../database/ProductOrder";

export class ProductController  extends RequestValidator {
  private static productController: ProductController | null = null;

  public static getProductQuantity = async (req: Request, res: Response): Promise<void> => {
    const productId = req.query.productId;
    if (typeof productId !== "string") {
      res.status(400).json({ result: false, message: 'Bad Request' }).end();
      return;
    }

    const quantity = await getProductQuantity(productId);
    res.status(200).json({ result: true, quantity }).end();
  }

  public static getProductOrder = async (req: Request, res: Response): Promise<void> => {
    const controller = await ProductController.getController();
    const validateRequest = await controller.validateGetRequest(req);
    if (!validateRequest) {
      res.status(401).json({ result: false, message: 'Unauthorized' }).end();
      return;
    }

    const orderId = req.query.orderId;
    if (typeof orderId !== "string") {
      res.status(400).json({ result: false, message: 'Bad Request' }).end();
      return;
    }

    const order = await getProductOrder(orderId);
    if (!order) {
      res.status(404).json({ result: false, message: 'Not Found' }).end();
      return;
    }

    const product = await getProduct(order.productId);
    if (!product) {
      res.status(404).json({ result: false, message: 'Not Found' }).end();
      return;
    }

    const meta: { name: string, value: string }[] = [];
    meta.push({ name: '商品名', value: product.productName });
    meta.push({ name: '説明', value: product.productDescription });
    meta.push({ name: '価格', value: `${product.productPrice.toLocaleString("ja-JP")}円` });
    meta.push({ name: '税', value: `${product.productTax.toLocaleString("ja-JP")}円` });

    res.status(200).json({ result: true, order: { productName: product.productName, productType: product.productType, productImage: product.productImage, meta}}).end();
  }

  private static async getController (): Promise<ProductController> {
    if (!ProductController.productController) {
      ProductController.productController = new ProductController();
      ProductController.productController.dataLocker.initialize();
    }
    return ProductController.productController;
  }
}
