<template>
  <div class="app-container m-user">
    <AppSide />
    <AppTable />
  </div>
</template>

<script lang="ts" setup>
  import AppTable from './components/appTable.vue'
  import AppSide from './components/appSide.vue'
</script>

<style scoped lang="scss">
  @import './index';
</style>
