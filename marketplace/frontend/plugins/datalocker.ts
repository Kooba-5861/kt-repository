import { useDatalocker } from "~/composables/common/useDatalocker";
import { useRestApi } from "~/composables/common/useRestApi";

export default defineNuxtPlugin(async nuxtApp => {
  const { recoverToken, removeToken } = useDatalocker();
  if (recoverToken()) {
    const { postApi } = useRestApi();
    try {
      await postApi('api/session', {}, false);
    } catch (e) {
      // セッション更新不可のためログアウト.
      removeToken();
    }
  }
});
