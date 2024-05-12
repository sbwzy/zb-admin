<template>
  <div class="app-container">
    <div class="header">
      <el-drawer
        v-model="drawer"
        :direction="direction"
        size="70%"
        style="height: auto !important"
        :show-close="false"
        :with-header="false"
      >
        <template #default>
          <div class="filter-container">
            <el-form label-position="left" label-width="80px">
              <!-- 采集状态筛选 -->
              <el-form-item label="采集状态">
                <el-select v-model="filters.price" placeholder="请选择">
                  <el-option label="未采集" value="未采集"></el-option>
                  <el-option label="采集中" value="采集中"></el-option>
                  <el-option label="待审核" value="待审核"></el-option>
                  <el-option label="已审核" value="已审核"></el-option>
                </el-select>
              </el-form-item>

              <!-- 区筛选 -->
              <el-form-item label="区">
                <el-select v-model="filters.rating" placeholder="请选择">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="1-2星" value="1-2"></el-option>
                  <el-option label="2-3星" value="2-3"></el-option>
                  <el-option label="3-4星" value="3-4"></el-option>
                  <el-option label="4-5星" value="4-5"></el-option>
                </el-select>
              </el-form-item>

              <!-- 商家类型筛选 -->
              <el-form-item label="商家类型">
                <el-select v-model="filters.type" placeholder="请选择">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="餐厅" value="restaurant"></el-option>
                  <el-option label="咖啡厅" value="cafe"></el-option>
                  <el-option label="面包店" value="bakery"></el-option>
                  <el-option label="快餐" value="fast-food"></el-option>
                </el-select>
              </el-form-item>
              <div>
                <el-check-tag :checked="checked1" title="花园住宅" type="primary" @change="checked1 = !checked1">花园住宅</el-check-tag>
                <el-check-tag :checked="checked2" title="优历公房" type="primary" @change="checked2 = !checked2">优历公房</el-check-tag>
              </div>
            </el-form>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <!-- 应用筛选 -->
            <el-button type="primary" @click="confirmClick">应用筛选</el-button>
          </div>
        </template>
      </el-drawer>

      <el-form ref="ruleFormRef" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称" prop="roleName">
          <div class="flex gap-1 mt-4">
            <el-input placeholder="请输入角色名称" />
          </div>
        </el-form-item>
        <el-form-item prop="sift" style="float: right; margin-right: 0px">
          <div class="flex gap-2 mt-4">
            <SvgIcon icon-class="listType" class-name="icon" @click="drawer = true" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
          <el-button @click="reset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <view class="content">
      <div class="mui-content-padded">
        <!-- 信息列表组件 seniorList:高管数组信息 -->
        <spListView :bz-list="dataList"></spListView>
      </div>
    </view>
  </div>
</template>

<script lang="ts" setup>
  import spListView from './components/ListView.vue'
  import menuView from './components/Menu.vue'
  import { ElMessageBox, ElMessage, FormInstance, ComponentSize, DrawerProps } from 'element-plus'
  import { onMounted, reactive, computed, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  //
  import { useSettingStore } from '../../../store/modules/setting'

  // 筛选条件状态
  const filters = reactive({
    price: 'all',
    rating: 'all',
    type: 'all',
  })

  const drawer = ref(false)
  const direction = ref<DrawerProps['direction']>('ttb')
  const radio = ref('Option 1')
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure you want to close this?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  function cancelClick() {
    drawer.value = false
  }
  function confirmClick() {
    ElMessageBox.confirm(`Are you confirm to chose ${radio.value} ?`)
      .then(() => {
        drawer.value = false
      })
      .catch(() => {
        // catch error
      })
  }

  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const checked1 = ref(false)
  const checked2 = ref(false)
  let dataList = [
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

  const onSubmit = () => {
    console.log('submit!', formInline)
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  const reset = (formEl: FormInstance | undefined) => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
</script>

<style scoped lang="scss">
  .filter-container {
    margin: 20px;
  }
  .el-overlay {
    top: 90px !important;
  }
  .scrollbar-demo-item {
    margin: 10px;
  }
  .header {
    display: flex;
    padding: 16px 16px 0px 16px;
    margin-bottom: 16px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
  }
  .footer {
    flex: 1;
    display: flex;
    padding: 16px;
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    position: relative;
    box-sizing: border-box;
    .util {
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
    }
    .table-inner {
      flex: 1;
      position: relative;
    }
    .table {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
