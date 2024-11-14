import { Schema } from "../../../data/resource";
import { graphQlClient } from "../../lib/graphql";
import { getJDPUserSession } from "../../lib/graphql/queries";
import { createJDPUserSession, updateJDPUserSession } from "../../lib/graphql/mutations";

export default class UserSessionDatabaseService {
  /**
   * ユーザーセッションの項目を作成.
   * @param appId アプリID(PDLから返却された値)
   * @param deviceId デバイスID(PDLから返却された値)
   * @param userId ユーザーID(PDLから返却された値)
   * @param sessionKey セッションキー(UUID)
   * @param accessToken アクセストークン(PDLから返却された値)
   * @param refreshToken リフレッシュトークン(PDLから返却された値)
   */
  async createUserSessionRecord (appId: string, deviceId: string, userId: string, sessionKey: string, accessToken: string, refreshToken: string): Promise<void> {
    const res = await graphQlClient.graphql({
      query: createJDPUserSession,
      variables: {
        input: {
          accessToken,
          appId,
          deviceId,
          invalid: false,
          refreshToken,
          sessionKey,
          userId,
        }
      }
    });
    if (res.errors) {
      console.error(res.errors);
      throw new Error("UserSession create failed.");
    }
  }

  async getUserSessionRecord (sessionKey: string): Promise<Schema["JDPUserSession"]["type"]> {
    const res = await graphQlClient.graphql({
      query: getJDPUserSession,
      variables: {
        sessionKey
      }
    });
    if (res.errors) {
      console.error(res.errors);
      throw new Error("UserSession not found.");
    }
    if (res.data.getJDPUserSession) {
      if (res.data.getJDPUserSession.invalid) {
        console.error(`UserSessionDatabaseService::getUserSessionRecord user session is invalid. session key = ${sessionKey}`)
        throw new Error('user session not found.')
      }
      return res.data.getJDPUserSession;
    } else {
      throw new Error('user session not found.')
    }
  }

  /**
   * ユーザーセッションのアクセストークンを更新.
   * @param session
   * @param accessToken
   * @param refreshToken
   */
  async updateAccessToken (session: Schema["JDPUserSession"]["type"], accessToken: string, refreshToken: string) {
    const res = await graphQlClient.graphql({
      query: updateJDPUserSession,
      variables: {
        input: {
          sessionKey: session.sessionKey,
          accessToken,
          refreshToken
        }
      }
    });
    if (res.errors) {
      console.error(res.errors);
      throw new Error("UserSession update failed.");
    }
  }

  /**
   * ユーザーセッションを削除.
   * @param sessionKey セッションキー
   */
  async deleteUserSessionStatus (sessionKey: string) {
    const res = await graphQlClient.graphql({
      query: updateJDPUserSession,
      variables: {
        input: {
          sessionKey: sessionKey,
          invalid: true,
        }
      }
    });
    if (res.errors) {
      console.error(res.errors);
      throw new Error("UserSession delete failed.");
    }
  }
}
