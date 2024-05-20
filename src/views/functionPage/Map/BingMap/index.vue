<template>
  <bingmap />
  <div class="overlay">
    <filterView :filterss="dynamicFilters" :listtype="listType"></filterView>
  </div>
</template>

<script lang="ts" setup name="bingMap">
  import bingmap from './components/bingmap.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'

  const listType = 'xcrw'

  const dynamicFilters = [
    {
      label: '任务名称',
      key: 'xcrwName',
      type: 'text',
      placeholder: '请输入任务名称',
    },
    {
      label: '巡查类型',
      key: 'collectionStatus',
      type: 'select',
      placeholder: '请选择巡查类型',
      options: [
        { label: '年度中心巡查', value: '年度中心巡查' },
        { label: '季度中心巡查', value: '季度中心巡查' },
        { label: '季度集团巡查', value: '季度集团巡查' },
        { label: '特殊情况巡查', value: '特殊情况任务' },
      ],
    },
    {
      label: '区域',
      key: 'district',
      type: 'checkbox',
      placeholder: '请选择区域',
      options: [
        { label: '黄浦区', value: '黄浦区' },
        { label: '徐汇区', value: '徐汇区' },
        { label: '长宁区', value: '长宁区' },
        { label: '静安区', value: '静安区' },
        { label: '普陀区', value: '普陀区' },
      ],
    },
    {
      label: '创建单位',
      key: 'dwType',
      type: 'select',
      options: [
        { label: '虹房集团', value: '虹房集团' },
        { label: '南房集团', value: '南房集团' },
        { label: '浦房集团', value: '浦房集团' },
        { label: '卫百辛集团', value: '卫百辛集团' },
        { label: '西部集团', value: '西部集团' },
        { label: '新长宁集团', value: '新长宁集团' },
        { label: '永业集团', value: '永业集团' },
        { label: '金外滩集团', value: '金外滩集团' },
      ],
    },
    {
      label: '创建人',
      key: 'createPerson',
      type: 'text',
      placeholder: '请输入创建人',
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
  ]
</script>

<style>
  .overlay {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: auto !important;
    z-index: 1000;
    display: contents;
  }
</style>
