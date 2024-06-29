<template>
  <div class="app-container">
    <!-- 筛选列表 -->
    <filterView
      :filterss="dynamicFilters"
      :filters="filters"
      :allSelect="dataList[0]?.cjZt == '采集中' ? true : false"
      :listtype="listType"
      :parent-type-method="filterMethod"
    ></filterView>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="datacurrList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
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
  import { useRouter } from 'vue-router'
  //
  import { useSettingStore } from '../../../store/modules/setting'
  import { da } from 'element-plus/es/locale'

  import { buildOperation } from '@/api/user'
  import { getYouliList } from '@/api/user'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

  const router = useRouter()
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

  const filters = computed(() => {
    return SettingStore.search
  })

  const dataList = computed(() => {
    return SettingStore.jzList
  })

  const pagination = computed(() => {
    return SettingStore.pagination
  })

  const datacurrList = computed(() => {
    const startIndex = (pagination.value.currentPage - 1) * pagination.value.pageSize
    const endIndex = Math.min(pagination.value.currentPage * pagination.value.pageSize, dataList.value.length)
    console.log(startIndex, endIndex)
    //result = data;
    //slice 是 新建数组   splice 是修改原数组
    return dataList.value.slice(startIndex, endIndex)
  })
  onMounted(() => {})

  // onBeforeMount(() => {
  //   //splitData(dataList.value, pagination.value.pageSize, pagination.value.currentPage)
  // })

  const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val
  }
  const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val
  }

  //子组件方法 根据条件触发事件
  const filterMethod = (e1, e2) => {
    console.log('操作方法', e1, e2)

    if (e2 == '模糊查询' || e2 == '查询') {
      //将搜索类型赋值到条件里面 searchType
      e1.searchType = e2
      //查询 后搜索列表的接口
      getYouliList(e1).then((res) => {
        console.log(res)
        //接口目前没有做好
        if (res.data.result != 1) {
          // 默认修改数据
          dataList.value.push({
            xiaoQu: '福世花园',
            jieZhen: '江苏路街道',
            cjZt: '采集中',
            shouQuanDZ: '安化路201弄4号',
            standardType: '花园住宅',
            fangWuYTOld: '非居住办公用房',
            id: '00012',
          })
          SettingStore.setJzList(dataList.value)
        } else {
          ElMessage({
            message: '搜索条件有误',
            type: 'error',
          })
          return
        }
      })
    } else if (e2 == '详情') {
      //进入详情页面
      router.push({ name: 'collection', params: { id: e1.id } })
    } else if (e2 == '重置' || e2 == '模糊重置') {
      // 将响应式对象置空
      Object.keys(filters.value).forEach((key) => {
        ;(filters.value[key] = ''), (filters.value['collectionStatus'] = '采集中'), (filters.value['streetType'] = '未分配')
      })
      SettingStore.setSearch(filters.value)
    } else {
      //e2 == '提交' || e2 == '全部提交' || e2 =='撤回'
      //触发接口 e0 id集合 e2 操作类型 e3 审批拒绝操作内容   e0 是接口数据不存在 测试使用
      let ids = []
      let stringids = ''

      if (e2 != '全部提交') {
        ids = [e1.id]
      } else {
        if (dataList.value.length != 0) {
          dataList.value.forEach((item) => {
            ids.push(item.id)
          })
        } else {
          ElMessage({
            message: '当前没有数据可以提交审批',
            type: 'warning',
          })
          return
        }
      }
      stringids = ids.join(',')
      buildOperation(stringids, e2, '审批驳回的意见').then((res) => {
        console.log(res)
        //接口目前没有做好
        if (res.data.result != 1) {
          ElMessage.success(res.data.msg)
          // if (e2 == '提交待审批') {
          //   ElMessage.success(res.data.msg)
          // } else if (e2 == '撤回') {
          //   ElMessage.success(res.data.msg)
          // }
          //目前接口没有做好 先做修改
          let list = ids
          //let list = res.data.succids.splice(',')
          let filteredArray = dataList.value.filter((item) => !list.includes(item.id))
          SettingStore.setJzList(filteredArray)
          //...
        } else {
          ElMessage({
            message: '数据出错,xxxxx',
            type: 'error',
          })
        }
      })
    }
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
