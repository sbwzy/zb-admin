<template>
  <div class="m-tool-left">
    <!-- <CollapseIcon /> -->
    <div class="logoTitle">优历直管公房巡查</div>
    <Hamburger />
  </div>
</template>

<script lang="ts" setup>
  import CollapseIcon from './components/CollapseIcon.vue'
  import Hamburger from './components/Hamburger.vue'
</script>

<style lang="scss" scoped>
  .m-tool-left {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .logoTitle {
    font-family: Arial, sans-serif;
    font-weight: bold;
    margin-left: 20px;
    font-size: 15px;
  }
</style>
