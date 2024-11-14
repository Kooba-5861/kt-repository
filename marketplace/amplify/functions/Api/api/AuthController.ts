import { Request, Response } from 'express'
import RequestValidator from "../util/RequestValidator";

export class AuthController  extends RequestValidator {
  private static authController: AuthController | null = null;

  public static updateSession = async (req: Request, res: Response): Promise<void> => {
    const controller = await AuthController.getController();
    // リクエストのバリデーションでセッションを更新する.
    const validateRequest = await controller.validatePostRequest(req);
    if (!validateRequest) {
      res.status(401).json({ result: false, message: 'Unauthorized' }).end();
      return;
    }

    res.status(200).json({ result: true }).end();
  }

  public static logout = async (req: Request, res: Response): Promise<void> => {
    const controller = await AuthController.getController();
    const validateRequest = await controller.validateGetRequest(req);
    if (!validateRequest) {
      res.status(401).json({ result: false, message: 'Unauthorized' }).end();
      return;
    }

    const sessionKey = req.query.sessionKey;
    if (typeof sessionKey !== "string") {
      console.error(`sessionKey is not string. sessionKey = ${sessionKey}`);
      res.status(400).json({ result: false, message: 'Bad Request' }).end();
      return;
    }

    await controller.userSessionDatabase.deleteUserSessionStatus(sessionKey);
    res.status(200).json({ result: true }).end();
  }

  private static async getController (): Promise<AuthController> {
    if (!AuthController.authController) {
      AuthController.authController = new AuthController();
      AuthController.authController.dataLocker.initialize();
    }
    return AuthController.authController;
  }
}
