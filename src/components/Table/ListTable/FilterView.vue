<template>
  <div class="header">
    <el-drawer v-model="drawer" :direction="direction" size="50%" style="height: auto !important" :show-close="false" :with-header="false">
      <template #default>
        <div class="filter-container">
          <el-form label-position="left" label-width="60px">
            <!-- 动态筛选选项 -->
            <el-form-item v-for="(filter, index) in filterss" :key="index" :label="filter.label">
              <el-select
                v-if="filter.type === 'select'"
                v-model="filters[filter.key]"
                :multiple="listtype === 'xcrw'"
                :placeholder="filter.placeholder"
              >
                <el-option v-for="option in filter.options" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
              <el-radio-group v-else-if="filter.type === 'radio'" v-model="filters[filter.key]">
                <el-radio v-for="option in filter.options" :key="option.value" :label="option.value">{{ option.label }}</el-radio>
              </el-radio-group>
              <el-input v-else-if="filter.type === 'text'" v-model="filters[filter.key]" :placeholder="filter.placeholder" />
              <el-cascader
                v-else-if="filter.type === 'cascader' && listtype == 'xcmap'"
                v-model="filters[filter.key]"
                :options="filter.options"
                :placeholder="filter.placeholder"
              />
              <el-checkbox-group v-else-if="filter.type === 'checkbox' && listtype == 'xcrw'" v-model="filters[filter.key]">
                <el-checkbox v-for="option in filter.options" :key="option.value" :label="option.value">{{ option.label }}</el-checkbox>
              </el-checkbox-group>
              <el-time-picker v-else-if="filter.type === 'time'" v-model="filters[filter.key]" :placeholder="filter.placeholder" />
              <el-cascader
                v-else-if="filter.type === 'duoxuan'"
                ref="cascaderRef"
                v-model="filters[filter.key]"
                size="small"
                :options="filter.options"
                :props="propss"
                collapse-tags
                :show-all-levels="false"
                collapse-tags-tooltip
                clearable
              />

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
          <el-button type="primary" :icon="Search" @click="parentTypeMethod(filters)">查询</el-button>
        </div>
      </template>
    </el-drawer>

    <el-form ref="ruleFormRef" :inline="true" :model="filters" class="demo-form-inline">
      <el-form-item v-if="listtype == 'build' || listtype == 'xcmap'" label="建筑名称" prop="jzName">
        <div class="flex gap-1 mt-4">
          <el-input v-model="filters.jzName" placeholder="请输入建筑名称" />
        </div>
      </el-form-item>
      <el-form-item v-else-if="listtype == 'xcrw'" label="任务名称" prop="wName">
        <div class="flex gap-1 mt-4">
          <el-input v-model="filters.rwName" placeholder="请输入任务名称" />
        </div>
      </el-form-item>
      <el-form-item prop="sift" style="float: right; margin-right: 0px">
        <div class="flex gap-2 mt-4">
          <SvgIcon icon-class="listType" class-name="icon" @click="drawer = true" />
        </div>
      </el-form-item>

      <el-form-item>
        <!-- <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button> -->
        <el-button type="primary" :icon="Search" @click="parentTypeMethod(filters)">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance, ComponentSize, DrawerProps } from 'element-plus'
  import { onMounted, reactive, computed, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  import { useSettingStore } from '@/store/modules/setting'
  const propss = { multiple: true }
  const stype = ref(3)

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
    parentTypeMethod: {
      type: Function,
      default: () => {},
    },
  })

  // 筛选条件状态
  const filters = reactive({
    listtype: props.listtype, //类型
    collectionStatus: '',
    regionmap: '',
    type: '',
    jzName: '', //建筑名称
    rwName: '', //任务名称
    district: null,
  })
  const drawer = ref(false)
  const direction = ref<DrawerProps['direction']>('ttb')
  const SettingStore = useSettingStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)
  const ruleFormRef = ref<FormInstance>()
  // const formInline = ref({
  // jzName: '', //建筑名称
  // rwName: '', //任务名称
  // })
  const checked1 = ref(false)
  const checked2 = ref(false)

  const onSubmit = () => {
    console.log('submit!', filters)
    console.log(filters)
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  //重置方法没做好
  const reset = () => {
    loading.value = true
    // 将响应式对象置空
    Object.keys(filters).forEach((key) => {
      filters[key] = ''
    })

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
