<template>
  <div class="crosshair-container">
    <div class="crosshair-horizontal"></div>
    <div class="crosshair-vertical"></div>
  </div>
</template>

<script>
  export default {
    name: 'FixedCrosshair',
  }
</script>

<style scoped>
  .crosshair-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none; /* 防止鼠标事件影响其他元素 */
  }

  .crosshair-horizontal,
  .crosshair-vertical {
    position: absolute;
    background-color: black;
    pointer-events: none; /* 防止鼠标事件影响其他元素 */
  }

  .crosshair-horizontal {
    height: 1px;
    width: 100%;
    top: 0;
  }

  .crosshair-vertical {
    width: 1px;
    height: 100%;
    left: 50%;
  }
</style>
