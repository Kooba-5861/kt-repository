import { useRestApi } from "~/composables/common/useRestApi";

interface CreatePaymentUrlResponse {
  result: boolean;
  url: string;
  orderId: string;
}

interface CreatePaymentUrlParam {
  productId: string;
}

export const usePayment = () => {
  const { postApi } = useRestApi();

  const createPaymentUrl = async (param: CreatePaymentUrlParam) => {
    return await postApi<CreatePaymentUrlResponse>('api/payment', param) ;
  }

  return {
    createPaymentUrl,
  }
}
