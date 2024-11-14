<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Schema } from '../../../amplify/data/resource';
import { usePayment } from "~/composables/usePayment";
import { useBreadcrumbs } from "~/composables/layouts/useBreadcrumbs";
import { useDatalocker } from "~/composables/common/useDatalocker";
import { useLogin } from "~/composables/useLogin";

const route = useRoute();
const { setBreadcrumbs } = useBreadcrumbs();
const { getProduct, getProductQuantity } = useProduct();
const { createPaymentUrl } = usePayment();
const { login } = useLogin();
const { isLogin } = useDatalocker();
const nft = ref<Schema['JDPProduct']['type'] | null>(null);
const productQuantity = ref<number | null>(null);
const notFoundError = ref<boolean>(false);
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

const productId = route.params.id as string;
if (!productId) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

try {
  nft.value = await getProduct(productId);
} catch (e) {
  console.error(e);
  notFoundError.value = true;
}

setBreadcrumbs([
  { title: 'TOP', to: '/', disabled: false },
  { title: nft.value?.productName || 'Product', disabled: false }
]);

onMounted(async () => {
  if (notFoundError.value) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
  productQuantity.value = await getProductQuantity(nft.value?.productId || '');
});

const handlePurchase = async () => {
  if (!nft.value) {
    return;
  }

  const res = await createPaymentUrl({ productId: nft.value.productId });
  if (!res.result) {
    showNotificationError('購入に失敗しました。もう一度お試しください。');
    return;
  }

  window.location.href = res.url;
};

const showNotificationError = (message: string) => {
  snackbar.value = {
    show: true,
    text: message,
    color: 'error'
  };
};
</script>

<template>
  <div>
    <v-row v-if="nft">
      <!-- 左側: NFT画像 -->
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-img
            :src="nft.productImage || 'https://placehold.jp/400x400.png?text=No%20Image'"
            class="bg-grey-lighten-2"
          ></v-img>
        </v-card>
      </v-col>

      <!-- 右側: NFT情報 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h4">{{ nft.productName }}</v-card-title>

          <v-card-text>
            <!-- 価格 -->
            <v-row class="mt-4">
              <v-col cols="12">
                <div class="text-h5 d-flex align-center">
                  <v-icon icon="mdi-currency-jpy" size="small"></v-icon>
                  {{ (nft.productPrice + nft.productTax).toLocaleString() }} 円(税込)
                </div>
              </v-col>
            </v-row>

            <!-- 在庫数 -->
            <v-row>
              <v-col cols="12">
                <div v-if="productQuantity !== null" class="text-subtitle-1">
                  残り在庫数: {{ productQuantity }}
                  <v-chip
                    :color="productQuantity > 0 ? 'success' : 'error'"
                    class="ml-2"
                  >
                    {{ productQuantity > 0 ? '在庫あり' : '在庫切れ' }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>

            <!-- 説明 -->
            <v-row>
              <v-col cols="12">
                <div class="text-h6 mb-2">説明</div>
                <p class="text-body-1">{{ nft.productDescription }}</p>
              </v-col>
            </v-row>

            <!-- 購入セクション -->
            <v-row v-if="productQuantity !== null" class="mt-4">
              <v-col cols="12">
                <v-form v-if="isLogin" @submit.prevent="handlePurchase">
                  <v-btn
                    block
                    color="primary"
                    size="large"
                    :disabled="productQuantity === 0"
                    type="submit"
                    class="mt-4"
                  >
                    <v-icon left>mdi-shopping</v-icon>
                    {{ productQuantity === 0 ? '在庫切れ' : '購入する' }}
                  </v-btn>
                </v-form>
                <v-btn
                  v-else
                  block
                  color="primary"
                  size="large"
                  @click="login"
                  class="mt-4"
                >
                    ログインして購入する
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ローディング表示 -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
