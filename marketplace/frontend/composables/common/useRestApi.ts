import { get, post, ApiError  } from 'aws-amplify/api';
import { useDatalocker } from '~/composables/common/useDatalocker';
import { useLoading } from '~/composables/layouts/useLoading';

export const useRestApi = () => {
  const loading = ref(false);
  const config = useRuntimeConfig();
  const { token, removeToken } = useDatalocker();
  const { showLoading, hideLoading } = useLoading();

  const getApi = async <T> (path: string, queryParameters: { [key: string]: any }, loading: boolean = true) => {
    if (loading) {
      showLoading();
    }
    try {
      const operation = get({
        apiName: config.public.clientRestApiName,
        path,
        options: {
          queryParams: {
            sessionKey: token.value,
            ...queryParameters,
          }
        }
      });
      const { body } = await operation.response;
      return await body.json() as T;
    } catch (e: any) {
      removeToken();
      console.error(e);
      if (e instanceof ApiError) {
        const error = e as ApiError;
        if (error.response?.statusCode) {
          throw showError(createError({ statusCode: error.response.statusCode, statusMessage: e.message }));
        }
      }
      throw showError(createError({ statusCode: 500, statusMessage: e.message }));
    } finally {
      if (loading) {
        hideLoading();
      }
    }
  };

  const postApi = async <T> (path: string, body: { [key: string]: any }, shorError = true) => {
    showLoading();
    try {
      const operation = post({
        apiName: config.public.clientRestApiName,
        path,
        options: {
          body: {
            sessionKey: token.value,
            ...body,
          }
        }
      });
      const response = await operation.response;
      return await response.body.json() as T;
    } catch (e: any) {
      removeToken();
      console.error(e);
      if (e instanceof ApiError) {
        const error = e as ApiError;
        if (error.response?.statusCode) {
          if (error.response.statusCode === 413) {
            throw e;
          } else {
            if (shorError) {
              throw showError(createError({ statusCode: error.response.statusCode, statusMessage: e.message }));
            } else {
              throw e;
            }
          }
        }
      }
      if (shorError) {
        throw showError(createError({ statusCode: 500, statusMessage: e.message }));
      } else {
        throw e;
      }
    } finally {
      hideLoading();
    }
  };

  // 非同期 getApi
  const getApiAsync = <T> (path: string, queryParameters: { [key: string]: any }) => {
    const operation = get({
      apiName: config.public.clientRestApiName,
      path,
      options: {
        queryParams: {
          sessionKey: token.value,
          ...queryParameters,
        }
      }
    });
    return operation.response as Promise<T>;
  }

  return {
    loading: readonly(loading),
    getApi,
    postApi,
    getApiAsync,
  };
};
