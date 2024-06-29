<template>
  <div class="zb-pro-table">
    <div class="header">
      <filterView :filterss="filters" :listtype="listType" :parent-type-method="filterMethod"></filterView>
    </div>
    <!--底部-->
    <div class="footer">
      <!--工具栏操作工具-->
      <!-- <div class="operator">
        <slot name="btn"></slot>
      </div> -->

      <!--表格-->
      <div class="table">
        <!-- <el-table
		    :data="tableData"
		    row-key="id"
		    :border="parentBorder"
		    :default-expanded-keys="defaultExpandedKeys"
		    :expand-row-keys="defaultExpandedKeys"
		    style="width: 100%"
		  > -->
        <el-table
          ref="tableRef"
          :data="list"
          row-key="id"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="selectchange"
          @select-all="selectAllchange"
        >
          <!-- <el-table-column :reserve-selection="true" type="selection" width="40" /> -->
          <el-table-column label="区域" prop="qu" width="55" />
          <el-table-column show-overflow-tooltip label="街道" prop="jieZhen" width="65" />
          <el-table-column v-if="props.listType == 'newxcrw'" show-overflow-tooltip label="房屋类型" prop="standardType" />
          <el-table-column show-overflow-tooltip label="授权地址" prop="shouQuanDZ" width="120" />
          <el-table-column v-if="props.listType == 'zyfp'" show-overflow-tooltip label="采集人" prop="workPerson" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button v-if="scope.row.isSelect == '已勾选'" size="small" type="danger" @click="deleteAction(scope.$index, scope.row)">
                删除
              </el-button>
              <el-button v-else="scope.row.isSelect == '未勾选'" size="small" type="danger" @click="selectAction(scope.$index, scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分配采集人-->
      <el-dialog v-if="props.listType == 'zyfp'" v-model="dialogVisible" title="分配采集人" width="80%">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">
            <h4 :id="titleId" :class="titleClass">当前已选择{{ multipleSelection.length }}幢建筑</h4>
          </div>
        </template>
        <el-form :model="form" size="large">
          <el-form-item label="人员" label-width="40px">
            <el-select v-model="form.region" placeholder="请分配采集人">
              <el-option label="张三" value="张三" />
              <el-option label="李四" value="李四" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <!--分页-->
      <div class="pagination">
        <el-pagination
          v-model:currentPage="pagination.currentPage"
          :page-size="20"
          small
          background
          layout="total, prev, pager"
          :total="data.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import SearchForm from '@/components/SearchForm/index.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import { reactive } from 'vue'

  let props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    listType: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  })

  //const etitle = props.entryType == 'xcrw'? '请选择建筑范围':'分配采集人'
  const ruleFormRef = ref<FormInstance>()

  //const listType = 'xzlb'
  const dialogVisible = ref(false)
  let isAllSelected = ref(false)
  const selected = ref(null)
  const options = ref([
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ])
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  //const parentBorder = ref(false)
  //const childBorder = ref(false)

  //const defaultExpandedKeys = tableData.map((item) => item.id) selectedRow
  const selectedRow = ref([])
  const multipleSelection = ref([])

  const tableRef = ref(null)
  const selectAll = ref(false) // 全选状态

  const emit = defineEmits(['reset', 'delete', 'select', 'selectAll', 'onSubmit', 'selection-change', 'selectsearch'])

  const handleSelectionChange = (val) => {
    console.log(val)
    console.log(val.length)
    let selectlist = []
    val.forEach((item) => {
      selectlist.push(item.id)
    })
    multipleSelection.value = selectlist
  }

  // 过滤调需要进行搜索选择的
  const baseFormColumns = computed(() => {
    return props.columns.filter((item) => item.valueType && item.search)
  })

  const pagination = reactive({
    currentPage: 1,
    pageSize: 20,
  })

  const getRowKeys = (row) => {
    return row.id
  }

  const selectAllchange = () => {}

  const selectchange = () => {}
  const currentPage = ref(1)
  // 收缩展开
  //const isExpand = ref(false)

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pagination.currentPage = val
  }
  //删除某条记录
  const handleDelete = (index: number, row) => {
    console.log(index, row)
  }

  const filterMethod = (e1, e2) => {
    console.log(e1, e2)
    if (e1 == 1) {
      console.log('修改列表')
      selectsearch(e2)
    } else if (e1 == 3) {
      dialogVisible.value = !dialogVisible.value
    } else if (e1 == 4) {
      if (e2) {
        //调用方法
        emit('selectAll')
        ElMessage.success('成功添加' + props.data.length + '幢建筑')
      }
    }
  }

  const selectsearch = (val) => {
    emit('selectsearch', val)
  }

  const save = () => {
    console.log('确定建筑或者联系人')
    console.log(form.region)
    //dialogVisible.value = false
  }
  //当前页面的list  勾选记录时需要需要存下来
  const list = computed(() => {
    let arr = JSON.parse(JSON.stringify(props.data))
    let gxarr = multipleSelection

    //tableRef.value.clearSelection()
    //tableRef.value.toggleAllSelection()
    return arr.splice((pagination.currentPage - 1) * 20, 20)
  })

  const listLoading = ref(false)
  const confirmEdit = (row) => {
    row.edit = false
  }
  const cancelEdit = (row) => {
    row.edit = false
  }

  let obj = {}
  let search = []
  for (let item of props.columns) {
    if (item.inSearch) {
      obj[item.name] = null
    }
    if (item.inSearch) {
      search.push(item)
    }
  }
  const formSearchData = ref(search)
  const formInline = reactive(obj)

  const onSubmit = () => {
    emit('onSubmit', formInline)
  }

  const reset = (formEl: FormInstance | undefined) => {
    formSearchData.value.forEach((item) => {
      formInline[item.name] = null
    })
    emit('reset')
  }
  const deleteAction = (index, row) => {
    ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        // list.value = list.value.filter((item) => item.id !== row.id)
        emit('delete', index, row)
        ElMessage.success('删除成功')
      })
      .catch(() => {})
  }

  const selectAction = (index, row) => {
    emit('select', index, row)
  }
</script>
<style scoped lang="scss">
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .zb-pro-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      padding: 16px 16px 0 16px;
      margin-bottom: 16px;
      border-radius: 4px;
      background: white;
      box-shadow: 0 0 12px rgb(0 0 0 / 5%);

      :deep(.advancedForm) {
        flex: 1;
      }
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
      min-height: 300px;

      .operator {
        margin-bottom: 15px;
      }

      .table {
        position: relative;
        flex: 1;
      }

      .zb-table {
        position: absolute;
        height: 100%;
      }
    }

    ::v-deep {
      .el-table__header th {
        font-size: 15px;
        font-weight: 700;
        color: #252525;
      }
    }

    .pagination {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
</style>
