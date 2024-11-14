export const useLoading = () => {
  const loadingCount = useState<number>('JDPLoadingCount', () => 0);
  const isLoading = useState<boolean>('JDPLoading', () => false);

  const showLoading = () => {
    loadingCount.value += 1;
    isLoading.value = true;
  };

  const hideLoading = () => {
    loadingCount.value -= 1;
    if (loadingCount.value <= 0) {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    showLoading,
    hideLoading,
  };
};
