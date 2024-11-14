<script setup lang="ts">
import Cookies from 'js-cookie';
import outputs from "../../amplify_outputs.json";

definePageMeta({
  layout: 'blank',
});

onMounted(async () => {
  const cookieParam = {
    domain: window.location.hostname,
    secure: true,
  };
  if (window.location.protocol === 'http:') {
    cookieParam.secure = false;
  }
  const url = new URL(`${outputs.custom.Auth.URL}start/`);
  const response = await fetch(url);
  const data = await response.json();
  if (!data.auth_url || !data.state_code) {
    console.error("ログインに失敗しました");
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }

  Cookies.set('datalocker_state_code', data.state_code, cookieParam);
  window.location.replace(data.auth_url);
});
</script>

<template>
  <div />
</template>
