import axios from "axios";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const AMPLIFY_ARTIFACT_ID = process.env.AMPLIFY_ARTIFACT_ID || '';
const GMO_HOST = process.env.GMO_HOST || '';
const GMO_SHOP_ID = process.env.GMO_SHOP_ID || '';
const GMO_SHOP_PASS = process.env.GMO_SHOP_PASS || '';

// 決済変更処理
export const alterTransactionGmo = async (param: {
  accessId: string, accessPass: string, jobCb: "CANCEL" | "SALES", amount: number, tax: number
}): Promise<void> => {
  let gmoShopPass = GMO_SHOP_PASS;
  if (gmoShopPass === '') {
    gmoShopPass = await getGmoPass()
  }

  const formData = new URLSearchParams();
  formData.append('ShopID', GMO_SHOP_ID);
  formData.append('ShopPass', gmoShopPass);
  formData.append('AccessID', param.accessId);
  formData.append('AccessPass', param.accessPass);
  formData.append('JobCd', param.jobCb);
  formData.append('Amount', param.amount.toString());
  formData.append('Tax', param.tax.toString());

  try {
    await axios.post(`${GMO_HOST}/payment/AlterTran.idPass`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "charset": "windows-31j",
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to alter transaction ${param.accessId} ${param.accessPass}`);
  }
}

const getGmoPass = async () => {
  const parts = AMPLIFY_ARTIFACT_ID.split('-');
  const output = parts[0] + '/' + parts[1] + '/' + parts.slice(2).join('-');

  const client = new SSMClient({
    apiVersion: "2014-11-06",
    region: "ap-northeast-1"
  });
  const command = new GetParameterCommand({
    Name: `/${output}/GMO_SHOP_PASS`,
    WithDecryption: true
  });
  const response = await client.send(command);
  if (!response.Parameter || !response.Parameter.Value) {
    throw new Error("GMO SSM Parameter not found.");
  }
  return response.Parameter.Value;
}
