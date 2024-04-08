<template>
  <div class="login-qrcode">
    <h2 class="title">公房监测管理平台</h2>
    <vue-qr text="https://dev.ccgis.cn/wuyegl/leafletMap/index.html"></vue-qr>
  </div>
</template>

<script lang="ts" setup>
  import vueQr from 'vue-qr/src/packages/vue-qr.vue'
</script>

<style lang="scss" scoped>
  @import '../index';
</style>
