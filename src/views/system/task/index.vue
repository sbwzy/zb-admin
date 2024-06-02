<template>
  <div class="app-container">
    <!-- 筛选列表 -->
    <filterView :filterss="dynamicFilters" :listtype="listType" :parent-type-method="filterMethod"></filterView>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="datacurrList" :listtype="listType"></spListView>
    </div>
    <!--分页列表-->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        :page-size="10"
        small
        background
        layout="total,sizes,prev, pager,next"
        :total="dataList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  //import spListView from './components/ListView.vue'
  //import menuView from './components/Menu.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import menuView from '@/components/Table/ListTable/menu.vue'
  import { buildListinfo } from '@/api/user'
  import { onMounted, reactive, computed, ref, onBeforeMount } from 'vue'

  //
  import { useSettingStore } from '../../../store/modules/setting'

  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  const listType = 'build'
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
      label: '区域/小区',
      key: 'district',
      type: 'duoxuan',
      placeholder: '请选择',
      options: [
        {
          value: '徐汇',
          label: '徐汇',
          children: [
            {
              value: '天平路',
              label: '天平路',
              children: [
                {
                  value: '上海新村直管公房',
                  label: '上海新村直管公房',
                },
                {
                  value: '京剧院小区',
                  label: '京剧院小区',
                },
                {
                  value: '伊丽莎白公寓',
                  label: '伊丽莎白公寓',
                },
                {
                  value: '余庆直管公房',
                  label: '余庆直管公房',
                },
                {
                  value: '吴兴直管公房',
                  label: '吴兴直管公房',
                },
              ],
            },
            {
              value: '徐家汇',
              label: '徐家汇',
              children: [
                {
                  value: '徐家汇街道淮海西路345弄小区',
                  label: '徐家汇街道淮海西路345弄小区',
                },
                {
                  value: '漕北高层',
                  label: '漕北高层',
                },
              ],
            },
            {
              value: '枫林路',
              label: '枫林路',
              children: [
                {
                  value: '天钥新村',
                  label: '天钥新村',
                },
                {
                  value: '谨斜小区',
                  label: '谨斜小区',
                },
              ],
            },
            {
              value: '湖南路',
              label: '湖南路',
              children: [
                {
                  value: '东湖直管公房',
                  label: '东湖直管公房',
                },
                {
                  value: '中兴小区',
                  label: '中兴小区',
                },
                {
                  value: '中南小区',
                  label: '中南小区',
                },
              ],
            },
          ],
        },
        {
          value: '普陀',
          label: '普陀',
          children: [
            {
              value: '曹杨新村',
              label: '曹杨新村',
              children: [
                {
                  value: '曹杨一村（源园）',
                  label: '曹杨一村（源园）',
                },
              ],
            },
            {
              value: '长寿路',
              label: '长寿路',
              children: [
                {
                  value: '长寿路街道康宁小区',
                  label: '长寿路街道康宁小区',
                },
                {
                  value: '长寿路街道澳门路660弄小区',
                  label: '长寿路街道澳门路660弄小区',
                },
              ],
            },
          ],
        },
        {
          value: '杨浦',
          label: '杨浦',
          children: [
            {
              value: '五角场',
              label: '五角场',
              children: [
                {
                  value: '长海路街道国京41号小区',
                  label: '长海路街道国京41号小区',
                },
                {
                  value: '长海路街道市光路三十六宅 (东块）小区',
                  label: '长海路街道市光路三十六宅 (东块）小区',
                },
              ],
            },
            {
              value: '大桥',
              label: '大桥',
              children: [
                {
                  value: '平青小区',
                  label: '平青小区',
                },
              ],
            },
            {
              value: '定海路',
              label: '定海路',
              children: [
                {
                  value: '130街坊 贵阳路、海州路、凉州路',
                  label: '130街坊 贵阳路、海州路、凉州路',
                },
                {
                  value: '定海街道137街坊048小区',
                  label: '定海街道137街坊048小区',
                },
              ],
            },
            {
              value: '平凉路',
              label: '平凉路',
              children: [
                {
                  value: '隆昌路331号、355弄',
                  label: '隆昌路331号、355弄',
                },
                {
                  value: '41街坊龙江路',
                  label: '41街坊龙江路',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: '建筑名称',
      key: 'buildingName',
      type: 'text',
      placeholder: '请输入建筑名称',
    },
  ])
  let dataList = ref([
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄7号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00001',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00002',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄6号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00003',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄4号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00004',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00002',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄6号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00003',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄4号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00004',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00002',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄6号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00003',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄4号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00004',
    },
    {
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄4号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      id: '00004',
    },
  ])
  let datacurrList = ref([])
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })

  onMounted(() => {})

  onBeforeMount(() => {
    splitData(dataList.value, pagination.pageSize, pagination.currentPage)
  })

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pagination.pageSize = val
    splitData(dataList.value, pagination.pageSize, pagination.currentPage)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pagination.currentPage = val
    splitData(dataList.value, pagination.pageSize, pagination.currentPage)
  }
  //临时使用分页取数据  后面从数据库分页取
  const splitData = (data, pageSize, pageNum) => {
    //let result = [];
    const startIndex = (pageNum - 1) * pageSize
    const endIndex = Math.min(pageNum * pageSize, data.length)
    console.log(startIndex, endIndex)
    //result = data;
    //slice 是 新建数组   splice 是修改原数组
    datacurrList.value = data.slice(startIndex, endIndex)
    console.log('222', data)
    console.log('333', datacurrList)
  }
  const filterMethod = (el) => {
    console.log('回传的列表', el)
  }
</script>

<style scoped lang="scss">
  .app-container {
    height: 100%;
  }

  .pagination {
    background-color: aliceblue;
    //opacity: 1	;
    left: 0;
    /* 左对齐 */
    right: 0;
    /* 右对齐，保证水平居中 */
    width: 100%;
    position: fixed;
    bottom: 0px;
    /* 固定在底部 */
    display: flex;
    justify-content: center;
    padding-top: 0px;
    box-sizing: border-box;
  }
</style>
