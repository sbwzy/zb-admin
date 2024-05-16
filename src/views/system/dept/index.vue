<template>
  <div class="app-container">
    <div style="margin-bottom: 2px">
      <filterView :filters="dynamicFilters"></filterView>
    </div>
    <div>
      <el-button style="float: right" type="primary" @click="addHandler">
        <el-icon>
          <Plus />
        </el-icon>
        新增巡查
      </el-button>
    </div>
    <spListView :bz-list="dataList" :list-type="listType"></spListView>
    <!-- <DeptDialog ref="deptDialog" /> -->
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, FormInstance } from 'element-plus'
  import { Search } from '@element-plus/icons-vue'
  import { onMounted, reactive, ref } from 'vue'
  import { deptData } from '@/mock/system'
  import DeptDialog from './components/deptDialog.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'

  const tableData = ref(deptData)
  const loading = ref(true)
  const deptDialog = ref()
  const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })

  const listType = 'build'
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项）
  const dynamicFilters = [
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
      label: '区',
      key: 'district',
      type: 'select',
      placeholder: '请选择区',
      options: [
        { label: '黄浦', value: '黄浦' },
        { label: '徐汇', value: '徐汇' },
        { label: '长宁区', value: '长宁区' },
        { label: '静安区', value: '静安区' },
        { label: '普陀区', value: '普陀区' },
      ],
    },
    {
      label: '街道类型',
      key: 'streetType',
      type: 'radio',
      options: [
        { label: '南京东路街道', value: '南京东路街道' },
        { label: '外滩街道', value: '外滩街道' },
        { label: '半淞园路街道', value: '半淞园路街道' },
        { label: '小东门', value: '小东门' },
        { label: '豫园街道', value: '豫园街道' },
      ],
    },
    {
      label: '建筑名称',
      key: 'buildingName',
      type: 'text',
      placeholder: '请输入建筑名称',
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

  let dataList = [
    {
      id: 1,
      renwuName: '24年度第一季度巡查任务',
      xcsjS: '2024-2月',
      xcsjE: '2024-5月',
      type: '常规巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      //jieZhen: 'jieZhen',
      shouQuanDZ: '安化路200弄7号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00001',
    },
    {
      id: 2,
      renwuName: '24年度第二季度巡查任务',
      xcsjS: '2024-6月',
      xcsjE: '2024-9月',
      type: '常规巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      //jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00002',
    },
    {
      id: 3,
      renwuName: '24年度第二季度巡查任务',
      xcsjS: '2024-6月',
      xcsjE: '2024-6月',
      type: '特殊巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      //jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00003',
    },
  ]

  const onSubmit = () => {
    console.log('submit!', formInline)
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  const reset = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  const addHandler = () => {
    deptDialog.value.show()
  }
  const editHandler = (row) => {
    deptDialog.value.show(row)
  }

  const del = () => {
    ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {})
      .catch(() => {})
  }
  const changeStatus = (row) => {
    ElMessageBox.confirm(`确定要${!row.status ? '禁用' : '启用'} ${row.deptName} 账户吗？`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {})
      .catch(() => {
        row.status = !row.status
      })
  }
</script>

<style scoped lang="scss">
  @import './index';
</style>
