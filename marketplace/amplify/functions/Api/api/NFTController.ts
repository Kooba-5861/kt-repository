import { Request, Response } from 'express'
import RequestValidator from "../util/RequestValidator";

interface FormatedNFTToken {
  name: string
  desc: string
  image: string
  url: string
  issued: number
  serial_number: string
}

interface NFTTokenRes {
  app_id: string
  token_id: string
  owner_id: string
  nft_id: string
  attr: string
  status: string
  meta: {
    name: string
    desc: string
    image: string
    url: string
    issued: number
  }
}

interface NFTTokenListRes {
  value: NFTTokenRes[]
}

export class NFTController  extends RequestValidator {
  private static nftController: NFTController | null = null;
  readonly clientId: string = process.env.DATALOCKER_CLIENT_ID || ''

  public static getNFT = async (req: Request, res: Response): Promise<void> => {
    const controller = await NFTController.getController();
    const validateRequest = await controller.validateGetRequest(req);
    if (!validateRequest) {
      res.status(401).json({ result: false, message: 'Unauthorized' }).end();
      return;
    }

    let pagingStart = 0;
    const pagingCount = 100;

    const tokenRes: FormatedNFTToken[] = [];

    while (true) {
      const [nftRes, statusCode] = await controller.dataLocker.callApi('/api/v1/nft/user/token/list', {
        nft_id: process.env.DATALOCKER_NFT_ID,
        paging_start: pagingStart,
        paging_count: pagingCount
      }, {
        userId: controller.userId,
        deviceId: controller.deviceId,
        accessToken: controller.accessToken
      }) as [NFTTokenListRes, number];

      if (statusCode !== 200) {
        res.status(500).json({ result: false, message: 'Internal Server Error' }).end();
        return;
      }

      const formatedNft = nftRes.value.map((nft) => {
        let serialNumber = "";
        try {
          serialNumber = JSON.parse(nft.attr).serial_number;
        } catch (e) {}
        return {
          name: nft.meta.name,
          desc: nft.meta.desc,
          image: nft.meta.image,
          url: nft.meta.url,
          issued: nft.meta.issued,
          serial_number: serialNumber
        }
      });

      tokenRes.push(...formatedNft);

      if (nftRes.value.length === 0 || nftRes.value.length < pagingCount) {
        break;
      }

      pagingStart += pagingCount;
    }

    res.status(200).json({ result: true, nft: tokenRes }).end();
  }

  private static async getController (): Promise<NFTController> {
    if (!NFTController.nftController) {
      NFTController.nftController = new NFTController();
      NFTController.nftController.dataLocker.initialize();
    }
    return NFTController.nftController;
  }
}
