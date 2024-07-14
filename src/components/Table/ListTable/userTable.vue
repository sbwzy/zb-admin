<template>
  <div class="m-user-table">
    <!-- <div class="header">
      <el-form ref="ruleFormRef" :inline="true" :model="formInline">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formInline.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
          <el-button @click="reset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="footer">
      <div class="util">
        <el-button type="primary" @click="addHandler">
          <el-icon><Plus /></el-icon>
          分配用户任务
        </el-button>
      </div>
      <div class="table-inner">
        <el-table v-loading="loading" :data="tableData" style="width: 100%; height: 100%" border>
          <el-table-column prop="cjrname" label="采集员" align="center" width="120" />
          <!-- <el-table-column prop="nickname" label="昵称" align="center" /> -->
          <!-- <el-table-column prop="sex" label="性别" align="center" /> -->
          <el-table-column prop="shrName" label="审核员" align="center" width="140" />
          <el-table-column prop="photo" label="手机号" align="center" width="160" />
          <el-table-column prop="jzsl" label="任务建筑数量" align="center" width="160" />
          <el-table-column prop="status" label="用户状态" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
                @change="changeStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="describe" :show-overflow-tooltip="true" width="280" label="采集员描述" align="center" />
          <el-table-column prop="createTime" label="创建时间" align="center" width="280" />
          <el-table-column prop="operator" label="操作" width="120px" align="center" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" icon="Edit" circle @click="editHandler(scope.row)"></el-button>
              <el-button type="danger" size="small" icon="Delete" circle @click="del(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="pagination">
        <el-pagination
          v-model:currentPage="currentPage1"
          :page-size="10"
          background
          layout="total, prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>
<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
  import { Search } from '@element-plus/icons-vue'
  import { onMounted, reactive, ref } from 'vue'
  import { userData } from '@/mock/system'
  import UserDialog from './userDialog.vue'
  import { useSettingStore } from '@/store/modules/setting'
  const SettingStore = useSettingStore()
  let props = defineProps({
    tableData: {
      type: Array,
      default() {
        return []
      },
    },
  })
  //const tableData = ref(userData)
  const dialogVisible = ref(false)
  const userDialog = ref()
  const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const loading = ref(true)
  const currentPage1 = ref(1)

  const onSubmit = () => {
    console.log('submit!', formInline)
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }

  const reset = (formEl: FormInstance | undefined) => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
  //新增用户任务
  const addHandler = () => {
    //重置所有的用户可选  判断当前巡查任务 是否存在其他用户有任务
    console.log('触发事件')
    console.log(SettingStore.xcrwUser)
    //已有用户列表的用户集合
    let ids = props.tableData.map((item) => item.cjrname)
    let ids1 = props.tableData.map((item) => item.shrName)
    SettingStore.xcoptions.forEach((item) => {
      //已有用户列表 是否包含某个用户
      let exists = ids.includes(item.value)
      //包含的话 是true  不给选
      if (exists) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
    SettingStore.shoptions.forEach((item) => {
      let exists = ids1.includes(item.value)
      if (exists) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })

    let xcrwUser1 = ref({
      cjrname: '',
      shrName: '',
      status: true,
      jzsl: 0,
      photo: '',
      describe: '',
      createTime: '',
      jzList: [],
    })
    SettingStore.setXcrwUser(xcrwUser1.value)
    console.log(SettingStore.xcrwUser)

    userDialog.value.show()
  }
  const editHandler = (row) => {
    console.log('点击了编辑')
    userDialog.value.show(row)
  }

  const del = (row) => {
    ElMessageBox.confirm('你确定要删除当前采集员吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        loading.value = true
        let tableData = props.tableData
        tableData.splice(tableData.indexOf(row), 1)

        setTimeout(() => {
          loading.value = false
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        }, 200)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
  }
  const changeStatus = (row) => {
    ElMessageBox.confirm(`确定要${!row.status ? '禁用' : '启用'} ${row.username} 采集员吗？`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        // ElMessage({
        //   type: 'info',
        //   message: `请及时处理${!row.cjrname}处理的任务!`,
        // })
        //调用接口
      })
      .catch(() => {
        row.status = !row.status
      })
  }

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }

  const handleCurrentChange = (val: number) => {
    currentPage1.value = val
  }

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })
</script>
<style lang="scss" scoped>
  @import '../../../views/form/validateForm/index.scss';
</style>
