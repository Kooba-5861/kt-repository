<script setup lang="ts">
import { type UserProductOrder, useProduct } from "~/composables/useProduct";
import { useUserApp } from "~/composables/useUserApp";
import { useBreadcrumbs } from "~/composables/layouts/useBreadcrumbs";

const route = useRoute();
const { setBreadcrumbs } = useBreadcrumbs();
const { getProductOrder } = useProduct()
const { getUserAppUrl } = useUserApp();

const orderId = route.query.orderId as string;
const order = ref<UserProductOrder | null>(null);

setBreadcrumbs([
  { title: 'TOP', to: '/', disabled: false },
  { title: '購入完了', disabled: false },
]);
const userAppUrl = await getUserAppUrl();

onMounted(async () => {
  if (!orderId) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
  order.value = await getProductOrder(orderId);
  if (!order.value) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
});
</script>

<template>
  <div v-if="order">
    <v-row class="text-center mb-8">
      <v-col cols="12">
        <v-icon
          icon="mdi-check-circle"
          color="success"
          size="64"
          class="mb-4"
        ></v-icon>
        <h1 class="text-h4 mb-2">購入ありがとうございました</h1>
      </v-col>
    </v-row>

    <v-row>
      <!-- NFT画像 -->
      <v-col cols="12" md="6" class="d-flex justify-center align-start">
        <v-img
          :src="order.productImage || 'https://placehold.jp/400x400.png?text=No%20Image'"
          :alt="order.productName"
          class="bg-grey-lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>

      <!-- 購入内容詳細 -->
      <v-col cols="12" md="6">
        <p class="font-weight-bold text-h5 mb-4">購入内容</p>
        <v-sheet border elevation="1" rounded>
          <div
            v-for="item in order.meta"
            :key="item.name"
            class="my-4 mx-4"
          >
            <div class="text-grey-darken-1">{{ item.name }}</div>
            <div class="text-body-1">{{ item.value }}</div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row v-if="order.productType === 'NFT'" class="mt-8 d-flex justify-center">
      <v-btn
        color="primary"
        variant="flat"
        size="large"
        class="w-50 font-weight-bold"
        :href="userAppUrl"
        :target="userAppUrl ? '_blank' : ''"
      >
        NFTの詳細を見る
      </v-btn>
    </v-row>
  </div>
</template>
