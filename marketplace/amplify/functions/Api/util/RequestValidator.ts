import { Request } from "express";
import UserSessionDatabaseService from "../database/UserSessionDatabaseService";
import { DataLockerService } from "../dataLocker/DataLockerService";

export default class RequestValidator {

  protected userId: string = '';
  protected deviceId: string = '';
  protected accessToken: string = '';

  protected readonly userSessionDatabase: UserSessionDatabaseService;
  protected readonly dataLocker: DataLockerService = new DataLockerService();

  constructor() {
    this.userSessionDatabase = new UserSessionDatabaseService();
  }

  async validateGetRequest (req: Request): Promise<boolean> {
    if (typeof req.query.sessionKey !== 'string') {
      return false;
    }
    return await this.validateSession(req.query.sessionKey);
  }

  async validatePostRequest (req: Request): Promise<boolean> {
    if (typeof req.body.sessionKey !== 'string') {
      return false;
    }
    return await this.validateSession(req.body.sessionKey);
  }

  async validateSession(sessionKey: string): Promise<boolean> {
    try {
      const session = await this.userSessionDatabase.getUserSessionRecord(sessionKey);
      if (!session || session.invalid) {
        return false;
      }
      // トークンの更新.
      const [statusCode, accessToken, refreshToken] = await this.dataLocker.refreshAccessToken(session)
      if (statusCode !== 200 || !accessToken || !refreshToken) {
        console.error(`validateSession error. failed refresh token. User ID = ${session.userId}`)
        await this.userSessionDatabase.deleteUserSessionStatus(sessionKey);
        return false;
      }
      await this.userSessionDatabase.updateAccessToken(session, accessToken, refreshToken);
      this.userId = session.userId;
      this.deviceId = session.deviceId;
      this.accessToken = accessToken;
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }
}
