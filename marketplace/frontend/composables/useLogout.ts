import { useRestApi } from '~/composables/common/useRestApi';
import { useDatalocker } from "~/composables/common/useDatalocker";

export const useLogout = () => {
  const router = useRouter();
  const { getApi } = useRestApi();
  const { removeToken } = useDatalocker();

  const logout = async () => {
    try {
      await getApi('api/logout', {});
    } catch (e) {
      console.error(e);
    }
    removeToken();
    await router.replace("/")
  };

  return {
    logout,
  };
};
