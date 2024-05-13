<template>
  <view class="content">
    <div class="mui-content-padded">
      <menuView :tabs="bztabs"></menuView>
    </div>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="bzList"></spListView>
    </div>
    <!--分页-->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        small
        :hide-on-single-page="onlyOne"
        :page-size="10"
        background
        layout="total, sizes, prev, pager, next"
        :total="bzList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </view>
</template>

<script lang="ts" setup>
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import menuView from '@/components/Table/ListTable/menu.vue'
  import { computed, onMounted, ref, reactive } from 'vue'

  const onlyOne = ref(false)
  const bztabs = [
    {
      name: '全部',
      label: '全部',
      content: '全部',
    },
    {
      name: '注册',
      label: '注册',
      content: '注册',
    },
    {
      name: '采集',
      label: '采集',
      content: '采集',
    },
    {
      name: '预警',
      label: '预警',
      content: '预警',
    },
  ]

  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })

  const bzList = [
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

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pagination.currentPage = val
  }

  const list = computed(() => {
    let arr = JSON.parse(JSON.stringify(props.data))
    return arr.splice((pagination.currentPage - 1) * 10, 10)
  })
</script>

<style scoped lang="scss">
  //@import './index';
  page {
    background: #f3f4f6;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .mui-content-padded {
    margin: 0px 14px;
  }

  .bottomV {
    /* 设置视图置顶 */
    display: flex;
    flex-direction: row;
    position: fixed;
    margin-top: calc(100vh - 168px);
    height: 60px;
    z-index: 9999 !important;
    width: 100vw;
    background-color: white;
    padding-left: 0px;
    padding-bottom: 20px;
  }
  .pagination {
    width: auto;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    box-sizing: border-box;
  }
</style>
