<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useProduct } from "~/composables/useProduct";
import { useBreadcrumbs } from "~/composables/layouts/useBreadcrumbs";

const { setBreadcrumbs } = useBreadcrumbs();
setBreadcrumbs([]);

const { products, productCategories, getProducts, getProductsWithCategory, getProductCategories } = useProduct();
const selectedCategories = ref<string[]>([]);
const showBottomSheet = ref(false);
// Vuetifyのブレークポイント
const { xs, sm } = useDisplay();
const isMobile = computed(() => xs.value || sm.value);

const clearFilters = () => {
  selectedCategories.value = [];
};

onMounted(async () => {
  await getProductCategories();
  await getProducts();
});

// selectedCategories の変更を検知.
watch(selectedCategories, async () => {
  if (selectedCategories.value.length === 0) {
    await getProducts();
  } else {
    await getProductsWithCategory(selectedCategories.value);
  }
});
</script>

<template>
  <div>
    <!-- モバイル用フィルターボタン -->
    <v-btn
      v-if="isMobile"
      block
      class="mb-4"
      @click="showBottomSheet = true"
    >
      カテゴリーフィルター
      <v-badge
        :content="selectedCategories.length.toString()"
        :value="selectedCategories.length"
        color="primary"
        class="ml-2"
        inline
      ></v-badge>
    </v-btn>

    <v-row>
      <!-- カテゴリーフィルター（デスクトップ） -->
      <v-col
        v-if="!isMobile"
        cols="12"
        md="3"
        class="pr-md-4"
      >
        <v-card>
          <v-card-title>カテゴリー</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="category in productCategories"
                :key="category"
                :value="category"
              >
                <v-checkbox
                  v-model="selectedCategories"
                  :label="`${category}`"
                  :value="category"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-list-item>
            </v-list>

            <v-btn
              v-if="selectedCategories.length > 0"
              variant="text"
              block
              class="mt-4"
              @click="clearFilters"
            >
              フィルターをクリア
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- NFT一覧 -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col v-for="product in products" :key="product.productId" cols="12" sm="6" md="4" lg="3">
            <v-card :to="`/products/${product.productId}/`">
              <v-img :src="product.productImage || 'https://via.placeholder.com/300'" height="200" cover></v-img>
              <v-card-text>
                <v-col class="pa-0">
                  <h2>{{ product.productName }}</h2>
                  <v-row align="center" no-gutters class="mt-2">
                    <v-icon icon="mdi-currency-jpy" size="small"></v-icon>
                    <p class="text-h6">{{ (product.productPrice + product.productTax).toLocaleString() }}円(税込)</p>
                  </v-row>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="flat"
                  block
                  class="font-weight-bold"
                  :to="`/products/${product.productId}/`"
                >
                  詳細を見る
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- モバイル用Bottom Sheet -->
    <v-bottom-sheet v-model="showBottomSheet">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          カテゴリー
          <v-btn icon @click="showBottomSheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item
              v-for="category in productCategories"
              :key="category"
              :value="category"
            >
              <v-checkbox
                v-model="selectedCategories"
                :label="`${category} `"
                :value="category"
                hide-details
                density="compact"
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="selectedCategories.length > 0"
            variant="text"
            block
            class="mb-2"
            @click="clearFilters"
          >
            フィルターをクリア
          </v-btn>
          <v-btn
            color="primary"
            block
            @click="showBottomSheet = false"
          >
            完了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
