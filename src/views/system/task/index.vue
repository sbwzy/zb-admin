<template>
  <div class="app-container">
    <el-segmented v-model="initvalue" :options="cjZt" block @change="changeValue">
      <!-- <template #default="{ item }">
        <div class="flex flex-col items-center gap-2 p-2">
          {{item}}·{{datacurrList.length}}
        </div>
      </template> -->
    </el-segmented>
    <filterView
      :filterss="dynamicFilters"
      :filters="filters"
      :allSelect="initvalue == '采集中' ? true : false"
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
        :total="datacurrList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { buildListinfo } from '@/api/user'
  import { onMounted, reactive, computed, ref, onBeforeMount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  //
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { da } from 'element-plus/es/locale'

  import { buildOperation } from '@/api/user'
  import { getYouliList } from '@/api/user'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  //import { useTagsViewStore } from '@/store/modules/tagsView'

  //const TagsViewStore = useTagsViewStore()
  // const visitedViews = computed(() => TagsViewStore.visitedViews)

  const router = useRouter()
  // const route = useRoute()
  // const xcId = route.query.xcId as string
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  const listType = 'build'
  const xcId = computed(() => {
    return SettingStore.xcrwId
  })
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项）
  const dynamicFilters = SettingStore.dynamicFilters

  //根据当前用户身份设置初始分段  初始这样设计
  const initvalue = ref(UserStore.sfRole.includes('审核员') ? '待审核' : '未采集')
  const cjZt = computed(() => {
    return SettingStore.cjZt
  })

  const filters = computed(() => {
    return SettingStore.search
  })

  const dataList = computed(() => {
    if (initvalue.value == '未采集') {
      return SettingStore.wcjJzList
    } else if (initvalue.value == '采集中') {
      return SettingStore.cjzJzList
    } else if (initvalue.value == '待审核') {
      return SettingStore.dshJzList
    } else if (initvalue.value == '审核驳回') {
      return SettingStore.shbhJzList
    } else {
      return SettingStore.shtgJzList
    }
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
  const changeValue = (val) => {
    console.log('打印', val)
    initvalue.value = val
    pagination.value.pageSize = 10
    pagination.value.currentPage = 1
    //修改属性
  }
  //子组件方法 根据条件触发事件
  const filterMethod = (e1, e2) => {
    console.log('操作方法', e1, e2)

    if (e2 == '模糊查询' || e2 == '查询') {
      e1.listType = listType
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
          //目前有问题是因为接口没弄完
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
