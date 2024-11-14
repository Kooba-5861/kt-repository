const JDP_AUTH_REDIRECT_PATH_KEY = 'jdp_auth_redirect_path';

export const useLogin = () => {
  const router = useRouter();
  const login = async () => {
    // 現在のURLを取得
    const currentPath = router.currentRoute.value.fullPath;
    // ログイン後にリダイレクトするための sessionStorage に保存
    sessionStorage.setItem(JDP_AUTH_REDIRECT_PATH_KEY, currentPath);
    await router.replace('/login/');
  };

  const getRedirectPath = () => {
    const path = sessionStorage.getItem(JDP_AUTH_REDIRECT_PATH_KEY);
    sessionStorage.removeItem(JDP_AUTH_REDIRECT_PATH_KEY);
    return path || '/';
  }

  return {
    login,
    getRedirectPath
  };
}
