<template>
  <!--左侧菜单栏-->
  <div class="sidebar-container" :class="{ 'has-logo': themeConfig.showLogo }">
    <!--菜单栏logo-->
    <Logo v-if="themeConfig.showLogo" :is-collapse="isCollapse" />
    <!--滚动框-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--菜单-->
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="SettingStore.themeConfig.uniqueOpened"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <!--菜单内容-->
        <SubItem v-for="route in permission_routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import Logo from './components/Logo.vue'
  import SubItem from '../SubMenu/SubItem.vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { usePermissionStore } from '@/store/modules/permission'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  // 在setup中获取store
  const route = useRoute()
  const PermissionStore = usePermissionStore()
  const SettingStore = useSettingStore()

  // 是否折叠
  const isCollapse = computed(() => !SettingStore.isCollapse)
  // 设置
  const themeConfig = computed(() => SettingStore.themeConfig)

  // 获取路由
  const permission_routes = computed(() => PermissionStore.permission_routes)

  const activeMenu = computed(() => {
    const { meta, path } = route
    console.log('这里的路由获取到了啥')
    console.log(meta)
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
</script>

<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
  }
</style>
