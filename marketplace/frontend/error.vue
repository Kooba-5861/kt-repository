<script setup lang="ts">
const error = useError();
</script>

<template>
  <div>
    <div class="error_box text-center px-2">
      <div v-if="error && error.statusCode === 404">
        <p class="text-h5 text-sm-h4 py-8">
          お探しのページが見つかりませんでした
        </p>
        <p class="text-subtitle-1">
          申し訳ありません。お探しのページが見つかりませんでした。<br>
          お手数ですが、ログイン画面から再度ログインしてください。
        </p>
      </div>
      <div v-else-if="error && error.statusCode === 403">
        <div>
          <p class="text-h5 text-sm-h4 py-8">
            アクセスできません
          </p>
          <p class="text-subtitle-1">
            お客様はアクセスできません。
          </p>
        </div>
      </div>
      <div v-else-if="error && error.statusCode === 401">
        <p class="text-h5 text-sm-h4 py-8">
          ログインセッションが無効です
        </p>
        <p class="text-subtitle-1">
          ログイン情報が無効になっています。<br>
          お手数ですが、ログイン画面から再度ログインしてください。
        </p>
      </div>
      <div v-else-if="error && error.statusCode === 400">
        <p class="text-h5 text-sm-h4 py-8">
          ログインが完了しておりません
        </p>
        <p class="text-subtitle-1">
          ログインが完了しておりません。<br>
          お手数ですが、トップページから再度ログインをお願いします。
        </p>
      </div>
      <div v-else>
        <p class="text-h5 text-sm-h4 py-8">
          申し訳ありません
        </p>
        <p class="text-subtitle-1">
          予期せぬエラーが発生しました。お時間をおいて再度お試しください。
        </p>
      </div>
    </div>
    <div>
      <div class="mt-16 d-flex justify-center">
        <v-btn variant="flat" size="x-large" class="font-weight-bold" href="/">
          TOPへ戻る
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error_box {
  height: 360px;
  color: white;
  background-color: #F6921E;
}

.link-faq > a {
  background-color: #F6921E;
}
</style>
