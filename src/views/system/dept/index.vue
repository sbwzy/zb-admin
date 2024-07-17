<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <filterView :filterss="dynamicFilters" :listtype="listType" :parent-type-method="filterMethod"></filterView>
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
  //import { Search } from '@element-plus/icons-vue'
  import { onMounted, reactive, ref } from 'vue'
  //import { deptData } from '@/mock/system'
  //import DeptDialog from './components/deptDialog.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { useRouter, useRoute } from 'vue-router'

  import { useSettingStore } from '@/store/modules/setting'
  const SettingStore = useSettingStore()
  //const tableData = ref(deptData)
  //const loading = ref(true)
  const deptDialog = ref()
  //const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})

  onMounted(() => {})
  const router = useRouter()
  const listType = 'xcrw'
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项） //数据库配置
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

  let dataList = ref([
    {
      id: 1,
      renwuName: '24年度第一季度巡查任务',
      xcsjS: '2024-2月',
      xcsjE: '2024-5月',
      type: '年度中心巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      progress: '进行中',
      jieZhen: 'jieZhen',
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
      type: '季度中心巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      progress: '进行中', //任务进展情况
      jieZhen: '江苏路街道',
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
      type: '特殊情况巡查',
      cjdw: '物业管理中心',
      cjr: 'xxxx',
      progress: '未开始',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄5号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房',
      notemsg: '00003',
    },
  ])

  const addHandler = () => {
    let xcrw = {
      id: '',
      name: '',
      //region: '',
      date1: '',
      date2: '',
      status: false,
      // delivery: false,
      resource: '',
      desc: '',
      clubType: '',
      rwList: [],
    }
    SettingStore.setXcrw(xcrw)
    //SettingStore.setXcrwId(null)
    setTimeout(async () => {
      //进入建筑列表页面
      router.push({
        path: '/form/validateForm',
      })
    }, 500)
  }

  //筛选条件 回传方法
  const filterMethod = (el) => {
    console.log('回传的列表', el)
    // dataList.value = [{
    // 	id: 1,
    // 	renwuName: '24年度第一季度巡查任务',
    // 	xcsjS: '2024-2月',
    // 	xcsjE: '2024-5月',
    // 	type: '年度中心巡查',
    // 	cjdw: '物业管理中心',
    // 	cjr: 'xxxx',
    // 	progress: '进行中',
    // 	//jieZhen: 'jieZhen',
    // 	shouQuanDZ: '安化路200弄7号',
    // 	standardType: '花园住宅',
    // 	fangWuYTOld: '非居住办公用房',
    // 	notemsg: '00001',
    // },
    // {
    // 	id: 2,
    // 	renwuName: '24年度第二季度巡查任务',
    // 	xcsjS: '2024-6月',
    // 	xcsjE: '2024-9月',
    // 	type: '季度中心巡查',
    // 	cjdw: '物业管理中心',
    // 	cjr: 'xxxx',
    // 	progress: '进行中', //任务进展情况
    // 	//jieZhen: '江苏路街道',
    // 	shouQuanDZ: '安化路200弄5号',
    // 	standardType: '花园住宅',
    // 	fangWuYTOld: '非居住办公用房',
    // 	notemsg: '00002',
    // }
    // ]
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
  // @import './index';
</style>
