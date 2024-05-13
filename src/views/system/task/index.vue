<template>
  <div class="app-container">
    <!-- 筛选列表 -->
    <filterView :filters="dynamicFilters"></filterView>
    <view class="content">
      <div class="mui-content-padded">
        <!-- 信息列表组件 seniorList:高管数组信息 -->
        <spListView :bz-list="dataList"></spListView>
      </div>
    </view>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  //import spListView from './components/ListView.vue'
  //import menuView from './components/Menu.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import menuView from '@/components/Table/ListTable/menu.vue'

  import { onMounted, reactive, computed, ref } from 'vue'

  //
  import { useSettingStore } from '../../../store/modules/setting'

  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项）
  const dynamicFilters = ref([
    {
      label: '采集状态',
      key: 'collectionStatus',
      type: 'select',
      placeholder: '请选择采集状态',
      options: [
        { label: '未采集', value: '未采集' },
        { label: '采集中', value: '采集中' },
        { label: '待审核', value: '待审核' },
        { label: '已审核', value: '已审核' },
      ],
    },
    {
      label: '区',
      key: 'district',
      type: 'select',
      placeholder: '请选择区',
      options: [
        { label: '黄浦', value: '黄浦' },
        { label: '徐汇', value: '徐汇' },
        { label: '长宁区', value: '长宁区' },
        { label: '静安区', value: '静安区' },
        { label: '普陀区', value: '普陀区' },
      ],
    },
    {
      label: '街道类型',
      key: 'streetType',
      type: 'radio',
      options: [
        { label: '南京东路街道', value: '南京东路街道' },
        { label: '外滩街道', value: '外滩街道' },
        { label: '半淞园路街道', value: '半淞园路街道' },
        { label: '小东门', value: '小东门' },
        { label: '豫园街道', value: '豫园街道' },
      ],
    },
    {
      label: '建筑名称',
      key: 'buildingName',
      type: 'text',
      placeholder: '请输入建筑名称',
    },
    {
      label: '区域选择',
      key: 'region',
      type: 'cascader',
      placeholder: '请选择区域',
      options: [
        {
          value: '黄浦',
          label: '黄浦区',
          children: [
            { value: '南京东路街道', label: '南京东路街道' },
            { value: '外滩街道', label: '外滩街道' },
            // 街道选项...
          ],
        },
        {
          value: '徐汇',
          label: '徐汇区',
          children: [
            { value: '徐家汇街道', label: '徐家汇街道' },
            { value: '田林街道', label: '田林街道' },
            // 街道选项...
          ],
        },
      ],
    },
  ])
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
