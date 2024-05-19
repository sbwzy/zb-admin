<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <filterView :filterss="dynamicFilters" :listtype="listType"></filterView>
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
      <spListView :bz-list="dataList" :listtype="listType"></spListView>
    </div>
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
  import { useRouter } from 'vue-router'
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
  const router = useRouter()
  const listType = 'xcrw'
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项） //数据库配置
  const dynamicFilters = [
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
      type: 'checkbox',
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
      renwuName: '24年度第二季度重点巡查任务',
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
    router.push('/form/validateForm')
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
