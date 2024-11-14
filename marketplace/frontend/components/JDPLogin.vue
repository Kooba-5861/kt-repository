<script setup lang="ts">
import { useDatalocker } from "~/composables/common/useDatalocker";
import { useLogin } from "~/composables/useLogin";
import { useLogout } from "~/composables/useLogout";

const { isLogin } = useDatalocker();
const { login } = useLogin();
const { logout } = useLogout();
</script>

<template>
  <div>
    <v-btn color="primary" variant="flat" @click="login" v-if="!isLogin" class="text-body-2 text-md-button">ログイン/会員登録</v-btn>
    <v-btn color="primary" variant="flat" @click="logout" v-else>ログアウト</v-btn>
  </div>
</template>
