<template>
  <div class="home-container">
    <el-row class="row-bg" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="8">
        <el-card class="box-card" style="height: 100%">
          <div>
            <gauge-charts id="bar4" height="300px" width="100%"></gauge-charts>
          </div>
          <div>
            <candlestick-charts id="bar2" height="300px" width="100%"></candlestick-charts>
          </div>
          <div>
            <funnel-charts id="bar3" height="300px" width="100%"></funnel-charts>
          </div>
          <div>
            <line-charts id="bar6" height="300px" width="100%"></line-charts>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>系列</span>
            </div>
          </template>
          <div style="display: flex">
            <el-card
              style="flex: 1; margin-right: 20px; cursor: pointer"
              class="card-item"
              @click="goTo('https://ext.dcloud.net.cn/plugin?id=7511')"
            >
              <div style="color: white; margin-bottom: 10px"></div>
              <!-- <div style="font-size: 12px; color: white"
                >uniapp 表格组件
                支持固定表头和首列、上拉加载更多、及固定多列，表格自适应内容，排序，多选checkbox、可点击删除，编辑、合计功能，兼容多端</div
              > -->
            </el-card>
            <el-card style="flex: 1; cursor: pointer" class="card-item" @click="goTo('')">
              <!-- <div style="color: white; margin-bottom: 10px"><h3>vue-admin-perfect</h3></div>
              <div style="font-size: 12px; color: white">系统基于vue3+vuex+ element-plus+ts后台管理系统</div> -->
            </el-card>
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>任务总览</span>
            </div>
          </template>
          <div>
            <stacked-horizontal-bar-charts id="bar8" height="300px" width="100%"></stacked-horizontal-bar-charts>
          </div>
          <div>
            <graph-charts id="bar5" height="300px" width="100%"></graph-charts>
          </div>
          <div>
            <pictorial-bar-charts id="bar7" height="300px" width="100%"></pictorial-bar-charts>
          </div>
          <div>
            <bar-charts id="bar1" height="300px" width="100%"></bar-charts>
          </div>
          <div>
            <stacked-horizontal-bar-charts id="bar8" height="300px" width="100%"></stacked-horizontal-bar-charts>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
  import { User } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import AvatarLogo from '@/assets/image/avatar.png'
  import weLogo from '@/assets/image/we.png'
  import CountTo from '@/components/CountTo/index.vue'
  import BarCharts from '@/views/echarts/simple/components/bar.vue'
  import CandlestickCharts from '@/views/echarts/simple/components/candlestick.vue'
  import FunnelCharts from '@/views/echarts/simple/components/funnel.vue'
  import GaugeCharts from '@/views/echarts/simple/components/gauge.vue'
  import GraphCharts from '@/views/echarts/simple/components/graph.vue'
  import LineCharts from '@/views/echarts/simple/components/line.vue'
  import PictorialBarCharts from '@/views/echarts/simple/components/pictorialBar.vue'
  import StackedHorizontalBarCharts from '@/views/echarts/simple/components/stackedHorizontalBar.vue'

  const goTo = (url) => {
    window.open(url, '_blank')
  }
</script>

<style scoped lang="scss">
  @import './index';
</style>
