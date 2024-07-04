<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <filterView
        :filterss="dynamicFilters"
        :filters="filters"
        :allSelect="dataList[0]?.cjZt == '采集中' ? true : false"
        :listtype="listType"
        :parent-type-method="filterMethod"
      >
      </filterView>
    </div>
    <div v-if="UserStore.sfRole.includes('超级管理员')">
      <el-button style="float: right" type="primary" @click="addHandler">
        <el-icon>
          <Plus />
        </el-icon>
        新增巡查
      </el-button>
    </div>
    <div>
      <spListView :bz-list="dataList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
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
  import { ElMessageBox, FormInstance } from 'element-plus'
  //import { Search } from '@element-plus/icons-vue'
  import { onMounted, reactive, ref, computed } from 'vue'
  //import { deptData } from '@/mock/system'
  //import DeptDialog from './components/deptDialog.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { useRouter, useRoute } from 'vue-router'

  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { buildListinfo } from '@/api/user'

  //import { useTagsViewStore } from '@/store/modules/tagsView'
  //const tableData = ref(deptData)
  //const loading = ref(true)
  const deptDialog = ref()
  //const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  //const TagsViewStore = useTagsViewStore()
  const route = useRoute()
  //const visitedViews = computed(() => TagsViewStore.visitedViews)
  onMounted(() => {})
  const router = useRouter()
  //当前页面类型
  const listType = 'xcrw'

  const filters = computed(() => {
    return SettingStore.search
  })

  const dynamicFilters = SettingStore.xcrwFilters

  //当前角色的 可查看的 巡查任务列表
  const dataList = computed(() => {
    return SettingStore.xcList
  })

  const addHandler = () => {
    router.push('/form/validateForm')
  }

  //点击事件 巡查任务详情
  const filterMethod = (e1, e2) => {
    console.log('回传的列表', e1, e2)
    //如果是超级管理员 可以对巡查任务进行编辑
    if (e2 == '编辑') {
      router.push({
        path: '/form/validateForm',
        query: {
          id: e1.id,
        },
      })
    } else if (e2 == '详情') {
      SettingStore.setXcrwId = e1.id
      //调用接口 获取该巡查任务下的建筑任务列表
      //未采集列表 、采集中列表、待审核列表、审核驳回列表、审核通过列表
      buildListinfo(e1.id).then((res) => {
        console.log(res)
        if (res.data.result == -11) {
          //赋值五个列表的值
          let wcjJzList = []
          let cjzJzList = []
          let dshJzList = []
          let shbhJzList = []
          let shtgJzList = []
          SettingStore.jzList.forEach((item) => {
            if (item.cjZt == '未采集') {
              wcjJzList.push(item)
            } else if (item.cjZt == '采集中') {
              cjzJzList.push(item)
            } else if (item.cjZt == '待审核') {
              dshJzList.push(item)
            } else if (item.cjZt == '审核驳回') {
              shbhJzList.push(item)
            } else if (item.cjZt == '审核通过') {
              shtgJzList.push(item)
            }
          })
          SettingStore.setWcjJzList(wcjJzList)
          SettingStore.setCjzJzList(cjzJzList)
          SettingStore.setDshJzList(dshJzList)
          SettingStore.setShbhJzList(shbhJzList)
          SettingStore.setShtgJzList(shtgJzList)
          //SettingStore.setWcjJzList(res.data.data.wcjJzList)
          //SettingStore.setCjzJzList(res.data.data.cjzJzList)
          //SettingStore.setDshJzList(res.data.data.dshJzList)
          //SettingStore.setShbhJzList(res.data.data.shbhJzList)
          //SettingStore.setShtgJzList(res.data.data.shtgJzList)
          setTimeout(async () => {
            //进入建筑列表页面
            router.push({
              path: '/system/task',
            })
          }, 500)
        }
      })
    } else if (e2 == '模糊查询' || e2 == '查询') {
      e1.listType = listType
      e1.searchType = e2
      console.log(e1)
    } else if (e2 == '重置' || e2 == '模糊重置') {
      // 将响应式对象置空
      Object.keys(filters.value).forEach((key) => {
        ;(filters.value[key] = ''), (filters.value['collectionStatus'] = '采集中'), (filters.value['streetType'] = '未分配')
      })
      SettingStore.setSearch(filters.value)
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    height: auto;
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
  }

  // @import './index';
</style>
