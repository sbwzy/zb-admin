<template>
  <div v-if="device === 'mobile' && !isCollapse" class="drawer-bg" @click="handleClickOutside" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  // hooks 是什么配置文件夹 | useResizeHandler 又是什么
  import { useResizeHandler } from '@/hooks/useResizeHandler'
  import { useSettingStore } from '@/store/modules/setting'
  // device 是 用来监听 移动端还是pc端的值
  let { device } = useResizeHandler()
  const SettingStore = useSettingStore()

  // 是否折叠左侧菜单栏
  const isCollapse = computed(() => !SettingStore.isCollapse)

  // 关闭菜单栏
  const handleClickOutside = () => {
    console.log('我点击了菜单栏之外的模态框')
    SettingStore.closeSideBar({ withoutAnimation: false })
  }
</script>

<style lang="scss" scoped></style>
