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
  import { useRouter } from 'vue-router'

  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  //const tableData = ref(deptData)
  //const loading = ref(true)
  const deptDialog = ref()
  //const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  onMounted(() => {})
  const router = useRouter()
  //当前页面类型
  const listType = 'xcrw'

  const filters = computed(() => {
    return SettingStore.search
  })

  const dynamicFilters = computed(() => {
    return SettingStore.xcrwFilters
  })
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
    if (UserStore.sfRole.includes('超级管理员')) {
      router.push({
        path: '/form/validateForm',
        query: {
          id: e1.id,
        },
      })
    } else {
      //如果是采集员 点击进入建筑任务列表
      router.push({
        path: '/system/task',
        query: {
          xcId: e1.id,
        },
      })
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
