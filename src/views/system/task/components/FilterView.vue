<template>
  <div class="header">
    <el-drawer v-model="drawer" :direction="direction" size="40%" style="height: auto !important" :show-close="false" :with-header="false">
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
                <el-option label="黄浦" value="黄浦"></el-option>
                <el-option label="徐汇" value="徐汇"></el-option>
                <el-option label="长宁区" value="长宁区"></el-option>
                <el-option label="静安区" value="静安区"></el-option>
                <el-option label="普陀区" value="普陀区"></el-option>
              </el-select>
            </el-form-item>

            <!-- 街道筛选 -->
            <el-form-item label="街道类型">
              <el-select v-model="filters.type" placeholder="请选择">
                <el-option label="南京东路街道" value="南京东路街道"></el-option>
                <el-option label="外滩街道" value="外滩街道"></el-option>
                <el-option label="半淞园路街道" value="半淞园路街道"></el-option>
                <el-option label="小东门" value="小东门"></el-option>
                <el-option label="豫园街道" value="豫园街道"></el-option>
              </el-select>
            </el-form-item>
            <div>
              <el-space wrap>
                <el-check-tag :checked="checked1" title="花园住宅" type="primary" @change="checked1 = !checked1">花园住宅</el-check-tag>
                <el-check-tag :checked="checked2" title="优历公房" type="primary" @change="checked2 = !checked2">优历公房</el-check-tag>
              </el-space>
            </div>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="reset(ruleFormRef)">重置</el-button>
          <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
        </div>
      </template>
    </el-drawer>

    <el-form ref="ruleFormRef" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="建筑名称" prop="roleName">
        <div class="flex gap-1 mt-4">
          <el-input placeholder="请输入建筑名称" />
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
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance, ComponentSize, DrawerProps } from 'element-plus'
  import { onMounted, reactive, computed, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  //
  import { useSettingStore } from '../../../../store/modules/setting'

  // 筛选条件状态
  const filters = reactive({
    price: 'all',
    rating: 'all',
    type: 'all',
  })

  const drawer = ref(false)
  const direction = ref<DrawerProps['direction']>('ttb')
  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)
  const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const checked1 = ref(false)
  const checked2 = ref(false)

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
