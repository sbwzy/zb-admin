<template>
  <el-tabs v-model="activeName" class="demo-tabs" stretch @tab-click="handleClick">
    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"> </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'

  const activeName = ref('全部')
  let props = defineProps({
    tabs: {
      type: Array,
      default: () => [],
    },
  })

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
</script>

<style>
  .demo-tabs > .el-tabs__content {
    padding: 0px;
    color: #6b778c;
    font-size: 30px;
    font-weight: 00;
    width: 100%;
  }
</style>
