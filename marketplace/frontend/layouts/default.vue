<script setup lang="ts">
import JDPLogin from "~/components/JDPLogin.vue";
import JDPLoading from "~/components/layouts/JDPLoading.vue";
import { useDisplay } from "vuetify";
import { useBreadcrumbs } from "~/composables/layouts/useBreadcrumbs";
import { useDatalocker } from "~/composables/common/useDatalocker";

const route = useRoute();
const { breadcrumbs } = useBreadcrumbs();
const { isLogin } = useDatalocker();

onMounted(() => {
  if (route.path.startsWith("/mypage") && !isLogin.value) {
    return showError(createError({ statusCode: 404, statusMessage: "Page Not Found" }));
  }
});

const { mdAndUp } = useDisplay();
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <div class="d-flex align-center">
          <v-img
            :src="`/img/jasmy.png`"
            :max-height="mdAndUp ? 40 : 20"
            :max-width="mdAndUp ? 40 : 20"
            contain
            :class="mdAndUp ? 'mr-3' : 'mr-1'"
          ></v-img>
          <span class="font-weight-bold text-body-1 text-lg-h6">NFT Marketplace</span>
        </div>
      </v-app-bar-title>
      <JDPLogin class="mr-4" />
    </v-app-bar>
    <v-main>
      <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
      <v-container fluid>
        <NuxtPage />
      </v-container>
    </v-main>
    <JDPLoading />
  </v-app>
</template>

<style>
.text-decoration-none {
  text-decoration: none;
  color: inherit;
}
</style>
