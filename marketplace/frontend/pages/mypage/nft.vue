<script setup lang="ts">
import { useNFT } from "~/composables/useNFT";
import { useBreadcrumbs } from "~/composables/layouts/useBreadcrumbs";

const { setBreadcrumbs } = useBreadcrumbs();
setBreadcrumbs([
  { title: 'TOP', to: '/', disabled: false },
  { title: '所有NFT一覧', disabled: false }
]);

const { nftArray, getNFTs } = useNFT();

await getNFTs();
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>所有NFT一覧</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(nft, index) in nftArray" :key="index" cols="12" md="4">
            <v-card>
              <v-img
                :src="nft.image || 'https://placehold.jp/400x400.png?text=No%20Image'"
                height="400"
                contain
              ></v-img>
              <v-card-title>{{ nft.name }}</v-card-title>
              <v-card-text>
                <p>{{ nft.desc }}</p>
                <p v-if="nft.serial_number" class="mt-2">{{ nft.serial_number }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
