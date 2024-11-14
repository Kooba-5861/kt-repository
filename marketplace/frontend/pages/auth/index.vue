<script setup lang="ts">
import Cookies from 'js-cookie';
import outputs from '../../../amplify_outputs.json';
import { useDatalocker } from "~/composables/common/useDatalocker";
import { useLogin } from "~/composables/useLogin";

definePageMeta({
  layout: 'blank',
});

const router = useRouter();
const { query } = useRoute();
const { getRedirectPath } = useLogin()
const errorMessage = ref<string>('');
const { setToken } = useDatalocker();

onMounted(async () => {
  if (!query.state || !query.session_state || !query.code) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
  const stateCode = Cookies.get('datalocker_state_code');
  if (!stateCode) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
  if (stateCode !== query.state) {
    return showError(createError({ statusCode: 404, statusMessage: 'Page Not Found' }));
  }
  try {
    const url = new URL(`${outputs.custom.Auth.URL}complete/`);
    url.searchParams.append('state', query.state);
    url.searchParams.append('session_state', query.session_state as string);
    url.searchParams.append('code', query.code as string);
    const response = await fetch(url);
    const data = await response.json();
    if (data.code !== "success" && data.message) {
      console.error("ログインに失敗しました");
      errorMessage.value = data.message;
      return;
    }
    Cookies.remove('datalocker_state_code');

    setToken(data.sessionKey);
    await router.push(getRedirectPath());
  } catch (e) {
    console.error(e);
    return showError(createError({ statusCode: 500, statusMessage: '' }));
  }
});
</script>

<template>
  <div class="flex justify-center mt-40">
    <div v-html="errorMessage" />
  </div>
</template>
