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

export const getLinkPlusUrlPayment = async (param: LinkPlusUrlPaymentParam): Promise<LinkPlusUrlPaymentResponse> => {
  const requestParam = {
    configid: gmoLinkPlusConfigId,
    transaction: {
      OrderID: param.orderId,
      Amount: param.amount,
      Tax: param.tax,
      ClientField1: param.clientField1 ?? " ",
      ClientField2: param.clientField2 ?? " ",
      ClientField3: param.clientField3 ?? " ",
      PayMethods: ["credit"],
      RetUrl: param.redirectUrl,
      PaymentExpireDate: param.paymentExpireDate ?? "",
      Detail: param.clientField2 ?? "",
    },
    geturlparam: {
      ShopID: gmoShopId,
      ShopPass: gmoShopPass,
    },
    displaysetting: {
      ShopName: "JDPマーケットプレイスサンプル",
    },
    credit: {
      JobCd: "CAPTURE",
      Method: "1",
    },
  };
  try {
    const res = await axios.post<LinkPlusUrlPaymentResponse>(`${gmoHost}/payment/GetLinkplusUrlPayment.json`, requestParam, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw new Error("Payment error.");
  }
};

// GMO からの result を解析する
export const parseGmoResult = (result: string): ParsedGmoResultResponse => {
  // result の解析. ドット で分割.
  const resultArray = result.split(".");
  // 最初の文字列と gmoShopPass を連結してsha256 でハッシュ化
  const hash = crypto.createHash('sha256').update(resultArray[0] + gmoShopPass).digest('hex');

  // ハッシュと result の最後の文字列が一致するかどうか
  if (hash === resultArray[resultArray.length - 1]) {
    // 一致していれば result をデコードして返す
    const resultString = Buffer.from(resultArray[0], 'base64').toString();
    return JSON.parse(resultString) as ParsedGmoResultResponse;
  } else {
    throw new Error("Invalid result.");
  }
}

export const rejectLinkPlusUrlPayment = async (orderId: string): Promise<RejectLinkPlusUrlPaymentResponse> => {
  const requestParam = {
    ShopID: gmoShopId,
    ShopPass: gmoShopPass,
    OrderID: orderId,
  };
  try {
    const res = await axios.post<RejectLinkPlusUrlPaymentResponse>(`${gmoHost}/payment/RejectLinkplusUrlPayment.json`, requestParam, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw new Error("Payment error.");
  }
};
