import { useRestApi } from "~/composables/common/useRestApi";

export const useUserApp = () => {
  const { getApi } = useRestApi();

  const getUserAppUrl = async () => {
    const res = await getApi<{ url: string }>('api/userAppUrl', {});
    return res.url;
  }

  return {
    getUserAppUrl
  }
}
