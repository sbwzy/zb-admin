<template>
  <div class="app-container">
    <!-- 筛选列表 -->
    <filterView></filterView>
    <view class="content">
      <div class="mui-content-padded">
        <!-- 信息列表组件 seniorList:高管数组信息 -->
        <spListView :bz-list="dataList"></spListView>
      </div>
    </view>
  </div>
</template>

<script lang="ts" setup>
  import filterView from './components/FilterView.vue'
  import spListView from './components/ListView.vue'
  import menuView from './components/Menu.vue'
  import { onMounted, reactive, computed, ref } from 'vue'

  //
  import { useSettingStore } from '../../../store/modules/setting'

  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)
  let dataList = [
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄7号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00001',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00002',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄6号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00003',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄4号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00004',
    },
  ]

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
</script>

<style scoped lang="scss"></style>
