<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
  import * as echarts from 'echarts'
  import { EChartsType } from 'echarts/core'
  import { onMounted } from 'vue'
  import { useSettingStore } from '@/store/modules/setting'

  let props = defineProps({
    className: {
      type: String,
      default: 'chart',
    },
    config: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '200px',
    },
  })
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: [],
    },
    series: [],
    // series: [
    //   {
    //     name: '采集中',
    //     type: 'bar',
    //     stack: 'total',
    //     label: {
    //       show: true,
    //     },
    //     emphasis: {
    //       focus: 'series',
    //     },
    //     data: [320, 2, 301, 334, 390, 330, 320],
    //   },
    //   {
    //     name: '待审核',
    //     type: 'bar',
    //     stack: 'total',
    //     label: {
    //       show: true,
    //     },
    //     emphasis: {
    //       focus: 'series',
    //     },
    //     data: [120, 132, 108, 134, 90, 230, 210],
    //   },
    //   {
    //     name: '已审核',
    //     type: 'bar',
    //     stack: 'total',
    //     label: {
    //       show: true,
    //     },
    //     emphasis: {
    //       focus: 'series',
    //     },
    //     data: [220, 182, 230, 120, 290, 330, 310],
    //   },
    //   {
    //     name: '今日已完成',
    //     type: 'bar',
    //     stack: 'total',
    //     label: {
    //       show: true,
    //     },
    //     emphasis: {
    //       focus: 'series',
    //     },
    //     data: [150, 212, 201, 154, 190, 330, 410],
    //   },
    //   {
    //     name: '全部任务',
    //     type: 'bar',
    //     stack: 'total',
    //     label: {
    //       show: true,
    //     },
    //     emphasis: {
    //       focus: 'series',
    //     },
    //     data: [820, 832, 901, 934, 1290, 1330, 1320],
    //   },
    // ],
  }
  const settingStore = useSettingStore()
  const echartsData = settingStore.echartsData

  let chart: EChartsType
  const initChart = () => {
    let chart = echarts.init(document.getElementById(props.id))
    // let options = {
    //   series: settingStore.echartsData,
    // }
    options.yAxis.data = echartsData.yAxisData
    options.series = echartsData.seriesData.map((item) => ({
      name: item.name,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: item.data,
    }))

    chart.setOption(options)
    return chart
  }
  onMounted(() => {
    chart = initChart()
    window.addEventListener('resize', function () {
      chart && chart.resize()
    })
  })
</script>
