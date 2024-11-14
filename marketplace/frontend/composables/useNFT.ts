import { useLoading } from '~/composables/layouts/useLoading';
import { useRestApi } from '~/composables/common/useRestApi';

interface NFTTokenRes {
  name: string
  desc: string
  image: string
  url: string
  issued: number
  serial_number: string
}

export const useNFT = () => {
  const { getApi } = useRestApi();
  const { showLoading, hideLoading } = useLoading();
  const nftArray = useState<NFTTokenRes[]>('JDPNFT', () => []);

  const getNFTs = async (): Promise<void> => {
    showLoading();
    try {
      const res = await getApi<{ result: boolean, nft: NFTTokenRes[] }>('api/nft', { });
      if (!res.result) {
        console.error('getNFTs NFT の取得に失敗しました。');
        return;
      }
      nftArray.value = res.nft;
    } catch (e) {
      console.error(e);
      throw new Error('getNFTs NFT の取得に失敗しました。');
    } finally {
      hideLoading();
    }
  }

  return {
    nftArray,
    getNFTs,
  }
}
