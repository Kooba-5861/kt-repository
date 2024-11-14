import crypto from "crypto";
import axios, { isAxiosError } from "axios";

export interface LinkPlusUrlPaymentParam {
  orderId: string
  redirectUrl: string
  amount: number
  tax: number
  clientField1?: string
  clientField2?: string
  clientField3?: string
  paymentExpireDate?: string
}

interface LinkPlusUrlPaymentResponse {
  OrderID: string;
  LinkUrl: string;
  ProcessDate: string;
  AccessID: string;
  AccessPass: string;
}

interface RejectLinkPlusUrlPaymentResponse {
  OrderID: string;
  Status: string;
  errCode: string;
  errInfo: string;
}

type ParsedGmoResult = "CREATE" | "SEND" | "PAYSTART" | "CONFIRM" | "REQPROCESS" | "REQSUCCESS" | "PAYSUCCESS" | "ERROR" | "EXPIRED" | "INVALID";

interface ParsedGmoResultResponse {
  transactionresult: {
    AccessID: string;
    AccessPass: string;
    OrderID: string;
    Result: ParsedGmoResult;
    Processdate: string;
    ErrCode: string | null;
    ErrInfo: string | null;
    Paymethod: string;
  };
  credit: {
    Status: string;
    Forward: string;
    Method: string;
    PayTimes: string | null;
    TranID: string;
    Approve: string;
    TranDate: string;
  };
}

const gmoHost = process.env.GMO_HOST || "";
const gmoShopId = process.env.GMO_SHOP_ID || "";
const gmoShopPass = process.env.GMO_SHOP_PASS || "";
const gmoLinkPlusConfigId = process.env.GMO_LINK_PLUS_CONFIG_ID || "";

export const getLinkPlusUrlPayment = async (param: LinkPlusUrlPaymentParam): Promise<void> => {}

// GMO からの result を解析する
export const parseGmoResult = "";

export const rejectLinkPlusUrlPayment = async (orderId: string): Promise<void> => {}

