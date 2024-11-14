<script setup lang="ts">
import { useLoading } from "~/composables/layouts/useLoading";

const { isLoading } = useLoading();
</script>

<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
      width="7"
    ></v-progress-circular>
  </v-overlay>
</template>
