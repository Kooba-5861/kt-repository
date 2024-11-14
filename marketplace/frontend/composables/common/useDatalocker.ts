import type { Ref } from 'vue';
import Cookies from 'js-cookie';

export const useDatalocker = () => {
  const JDP_DATALOCKER_SESSION = 'JDP_DATALOCKER_SESSION';
  const token: Ref<string> = useState('DatalockerSession', () => '');
  const isLogin = computed(() => token.value !== '');

  const setToken = (value: string) => {
    token.value = value;
    Cookies.set(JDP_DATALOCKER_SESSION, value, { domain: window.location.hostname, secure: window.location.protocol === 'https:' });
  };

  const recoverToken = (): boolean => {
    const token = Cookies.get(JDP_DATALOCKER_SESSION);
    if (token) {
      setToken(token);
      return true;
    } else {
      return false;
    }
  };

  const removeToken = () => {
    token.value = '';
    Cookies.remove(JDP_DATALOCKER_SESSION);
  };

  return {
    token: readonly(token),
    isLogin,
    setToken,
    recoverToken,
    removeToken,
  };
};
