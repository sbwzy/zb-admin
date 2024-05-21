<template>
  <!-- 展开/收起按钮 -->
  <button v-if="!isExpanded" id="btndown" @click="isExpanded = true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-down"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
  <div class="header" :style="{ paddingTop: (isExpanded ? 8 : 0) + 'px !important' }">
    <el-drawer v-model="drawer" :direction="direction" size="50%" style="height: auto !important" :show-close="false" :with-header="false">
      <template #default>
        <div class="filter-container">
          <el-form label-position="left" label-width="60px">
            <!-- 动态筛选选项 -->
            <el-form-item v-for="(filter, index) in filterss" :key="index" :label="filter.label">
              <el-select v-if="filter.type === 'select'" v-model="filters[filter.key]" :placeholder="filter.placeholder">
                <el-option v-for="option in filter.options" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
              <el-radio-group v-else-if="filter.type === 'radio'" v-model="filters[filter.key]">
                <el-radio v-for="option in filter.options" :key="option.value" :label="option.value">{{ option.label }}</el-radio>
              </el-radio-group>
              <el-input v-else-if="filter.type === 'text'" v-model="filters[filter.key]" :placeholder="filter.placeholder" />
              <el-cascader
                v-else-if="filter.type === 'cascader'"
                v-model="filters[filter.key]"
                :options="filter.options"
                :placeholder="filter.placeholder"
              />
              <el-checkbox-group v-else-if="filter.type === 'checkbox'" v-model="filters[filter.key]">
                <el-checkbox v-for="option in filter.options" :key="option.value" :label="option.value">{{ option.label }}</el-checkbox>
              </el-checkbox-group>
              <el-time-picker v-else-if="filter.type === 'time'" v-model="filters[filter.key]" :placeholder="filter.placeholder" />
              <!-- 更多筛选类型可以在这里添加 -->
            </el-form-item>

            <div v-if="listtype == 'build'">
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
          <el-button @click="reset()">重置</el-button>
          <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
        </div>
      </template>
    </el-drawer>

    <el-form v-if="isExpanded" ref="ruleFormRef" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item v-if="listtype == 'build'" label="建筑名称" prop="jzName">
        <div class="flex gap-1 mt-4">
          <el-input v-model="formInline.jzName" placeholder="请输入建筑名称" />
        </div>
      </el-form-item>
      <el-form-item v-else-if="listtype == 'xcrw'" label="任务名称" prop="wName">
        <div class="flex gap-1 mt-4">
          <el-input v-model="formInline.rwName" placeholder="请输入任务名称" />
        </div>
      </el-form-item>
      <el-form-item prop="sift" style="float: right; margin-right: 0px">
        <div class="flex gap-2 mt-4">
          <SvgIcon icon-class="listType" class-name="icon" @click="drawer = true" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      <!-- 展开/收起按钮 -->
      <button v-if="isExpanded" id="btnup" @click="isExpanded = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-up"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance, ComponentSize, DrawerProps } from 'element-plus'
  import { onMounted, reactive, computed, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  import { useSettingStore } from '@/store/modules/setting'

  // 筛选条件状态
  const filters = reactive({
    price: 'all',
    rating: 'all',
    type: 'all',
  })
  let props = defineProps({
    filterss: {
      type: Array,
      default() {
        return []
      },
    },
    listtype: {
      type: String,
      default() {
        return ''
      },
    },
  })

  const isExpanded = ref(false)
  const drawer = ref(false)
  const direction = ref<DrawerProps['direction']>('ttb')
  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)
  const ruleFormRef = ref<FormInstance>()
  const formInline = ref({
    jzName: '', //建筑名称
    rwName: '', //任务名称
  })
  const checked1 = ref(false)
  const checked2 = ref(false)

  const onSubmit = () => {
    console.log('submit!', formInline)
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  //重置方法没做好
  const reset = () => {
    loading.value = true
    formInline.value.rwName = ''

    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  onMounted(() => {
    console.log(props.filterss)
    console.log(props.listtype)
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
</script>

<style scoped lang="scss">
  #btnup {
    z-index: 21;
    margin-left: 43%;
    display: block;
    width: 60px;
    border-radius: 6px 6px 0 0;
    height: 12px;
    border: 0;
    border-left: 1px solid rgb(23, 32, 43, 0.2);
    background: #409eff;
    color: #fff;
    cursor: pointer;
  }
  #btndown {
    position: absolute; /* 设置绝对定位 */
    top: 92px; /* 根据需要调整距离顶部的位置 */
    left: 50%; /* 使按钮左侧居中 */
    transform: translateX(-50%);
    z-index: 21;
    display: block;
    width: 60px;
    border-radius: 0 0 6px 6px;
    height: 12px;
    border: 0;
    border-left: 1px solid rgb(23, 32, 43, 0.2);
    background: #409eff;
    color: #fff;
    cursor: pointer;
  }
  #btnup:hover {
    background: #409eff; /* 鼠标悬停时的颜色 */
  }
  #btndown:hover {
    background: #409eff; /* 鼠标悬停时的颜色 */
  }

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
    padding: 8px 8px 0px 8px;
    margin-bottom: 2px;
    border-radius: 2px;
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
