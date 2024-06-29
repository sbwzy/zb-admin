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
    <div>
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
  import { onMounted, reactive, ref,computed } from 'vue'
  //import { deptData } from '@/mock/system'
  //import DeptDialog from './components/deptDialog.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { useRouter } from 'vue-router'
  
  import { useSettingStore } from '@/store/modules/setting'
  //const tableData = ref(deptData)
  //const loading = ref(true)
  const deptDialog = ref()
  //const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const SettingStore = useSettingStore()
  onMounted(() => {})
  const router = useRouter()
  const listType = 'xcrw'
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项） //数据库配置

  const filters = computed(() => {
    return SettingStore.search
  })

  const dynamicFilters = ref([
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
      type: 'select',
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
  ])
  
  const dataList = computed(() => {
    return SettingStore.xcList
  })

  const addHandler = () => {
    router.push('/form/validateForm')
  }

  //筛选条件 回传方法
  const filterMethod = (el) => {
    console.log('回传的列表', el)
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
