<template>
  <div class="m-full-screen-container">
    <!-- <div ref="domRef" class="inner">
      <slot></slot>
    </div> -->
    <iframe id="child" src="https://dev.ccgis.cn/wuyegl/keshi/index.html" style="width: 100%; height: 100%"></iframe>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  const mounted = ref<boolean>(true)
  const domRef = ref<HTMLElement>()
  const autoResizeScreen = () => {
    // const { width, height } = window.screen
    const { clientWidth, clientHeight } = document.body
    var width = 1920,
      height = 1080
    let left
    let top
    let scale
    // 获取比例  可视化区域的宽高比与 屏幕的宽高比  来进行对应屏幕的缩放
    if (clientWidth / clientHeight > width / height) {
      scale = clientHeight / height
      top = 0
      left = (clientWidth - width * scale) / 2
    } else {
      scale = clientWidth / width
      left = 0
      top = (clientHeight - height * scale) / 2
    }
    // 防止组件销毁后还执行设置状态s
    if (mounted.value) {
      Object.assign(domRef.value.style, {
        transform: `scale(${scale})`,
        left: `${left}px`,
        top: `${top}px`,
      })
    }
  }
  onMounted(() => {
    //window.location.href = 'https://dev.ccgis.cn/wuyegl/keshi/index.html'
    mounted.value = true
    autoResizeScreen()
    window.addEventListener('resize', autoResizeScreen)
  })
  onBeforeUnmount(() => {
    mounted.value = false
    window.removeEventListener('resize', autoResizeScreen)
  })
</script>

<style lang="scss" scoped>
  .m-full-screen-container {
    background-color: #030409;
    width: 100vw;
    height: 100vh;
    .inner {
      overflow: hidden;
      transform-origin: left top;
      z-index: 999;
      position: fixed;
      transition: all 0.3s;
    }
  }
</style>
