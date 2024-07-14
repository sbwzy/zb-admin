<template>
  <PageWrapLayout>
    <div style="">
      <el-form ref="ruleFormRef" size="large" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="巡查时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择时间" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2" style="text-align: center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker v-model="ruleForm.date2" type="date" placeholder="选择时间" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container m-user">
      <UserTable :table-data="ruleForm.rwList" />
    </div>
    <div class="centered-buttons">
      <el-form-item>
        <el-button type="primary" size="large" @click="submitForm(ruleFormRef, 1)">创建</el-button>
        <el-button type="info" size="large" @click="submitForm(ruleFormRef, 2)">暂存</el-button>
        <el-button size="large" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </div>
  </PageWrapLayout>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted, computed } from 'vue'
  import { MapLocation, Memo, OfficeBuilding, View as IconView } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  import type { FormInstance, Action } from 'element-plus'
  import { useSettingStore } from '@/store/modules/setting'
  import Upload from './components/Upload.vue'
  import UserTable from '@/components/Table/ListTable/userTable.vue'
  import { useRouter } from 'vue-router'
  import { ru } from 'element-plus/es/locale'
  import { files } from 'jszip'
  import { saveXcrw } from '@/api/user'
  //import { userData } from '@/mock/system'
  const router = useRouter()
  //const tableData = ref(userData)
  const formSize = ref('small')
  const ruleFormRef = ref<FormInstance>()
  const props = { multiple: true }
  const cascaderRef = ref(null)
  const UseSettingStore = useSettingStore()
  //目前没有作用
  const xcId = computed(() => {
    return UseSettingStore.xcrwId
  })
  //如果是新建 置空xcrw  如果是编辑  赋值
  let ruleForm = computed(() => {
    return UseSettingStore.xcrw
  })
  //验证规则
  const rules = reactive({
    name: [
      { required: true, message: '请输入任务名称', trigger: 'blur' },
      { min: 3, message: '长度大于3个字符', trigger: 'blur' },
    ],
    date1: [
      {
        type: 'date',
        required: true,
        message: '请填写开始时间',
        trigger: 'change',
      },
    ],
    date2: [
      {
        type: 'date',
        required: true,
        message: '请填写结束时间',
        trigger: 'change',
      },
    ],
    clubType: [
      {
        type: String,
        required: true,
        message: '请分配一个团队',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: '请选择活动资源\n',
        trigger: 'change',
      },
    ],
    desc: [{ required: false, message: '请填写活动形式', trigger: 'blur' }],
    // rwList: [
    //   (value) => {
    //     // 验证数组是否为空
    //     return value.length > 0 || '您尚未分配任务人员'
    //   },
    // ],
  })
  //保存后 把store中的数据清空
  const submitForm = async (formEl: FormInstance | undefined, num) => {
    // let delivery = UseSettingStore.selJZList.length > 0 ? true : false
    // console.log('1111', delivery)
    // ruleForm.value.delivery = delivery
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      console.log('222', valid, fields)
      if (valid) {
        if (ruleForm.value.rwList.length == 0) {
          ElMessageBox.alert('当前巡查任务没有进行人员分配,请分配任务后再操作', '提示', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: '确定',
            callback: (action: Action) => {
              ElMessage({
                type: 'warning',
                message: `请添加人员任务!`,
              })
            },
          })
        } else {
          saveXcrw(ruleForm.value).then((res) => {
            if (res.data.result == -11) {
              //let xcssList = res.data.data.xcssList;
              let date1 = new Date(ruleForm.value.date1)
              let year1 = date1.getFullYear()
              let month1 = date1.getMonth() + 1 // getMonth() 返回的是 0-11，所以需要加 1
              let xcsjs = `${year1}-${month1.toString().padStart(2, '0')}`
              let date2 = new Date(ruleForm.value.date2)
              let year2 = date2.getFullYear()
              let month2 = date2.getMonth() + 1 // getMonth() 返回的是 0-11，所以需要加 1
              let xcsje = `${year2}-${month2.toString().padStart(2, '0')}`
              let newXcssList = UseSettingStore.xcssList
              newXcssList.push({
                id: 4,
                renwuName: ruleForm.value.name,
                xcsjS: xcsjs,
                xcsjE: xcsje,
                type: '季度物业巡查',
                cjdw: '静安物业中心',
                cjr: '张三',
                progress: '未提交',
              })
              //UseSettingStore.setXcssList(xcssList)

              ElMessage({
                type: 'success',
                message: `保存成功!`,
              })
              setTimeout(async () => {
                router.push({
                  path: '/system/dept',
                })
              }, 500)
            }
          })
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  const resetForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (ruleForm.value.rwList.length !== 0) {
      ElMessageBox.alert('当前巡查任务存在人员分配,确定清空吗？', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: Action) => {
          // ElMessage({
          //   type: 'warning',
          //   message: `请添加人员任务!`,
          // })
          ruleForm.value.name = ''
          ruleForm.value.clubType = ''
          ruleForm.value.date1 = ''
          ruleForm.value.date2 = ''
          ruleForm.value.rwList = []
        },
      })
    } else {
      ruleForm.value.name = ''
      ruleForm.value.clubType = ''
      ruleForm.value.date1 = ''
      ruleForm.value.date2 = ''
      ruleForm.value.rwList = []
    }
  }

  onMounted(() => {})
</script>
<style lang="scss">
  .el-cascader-menu {
    min-width: 40px;
  }
  .m-user {
    display: flex;
    flex-direction: row;
  }
  .app-container {
    height: 60%;
  }
  .centered-buttons {
    display: flex;
    justify-content: center;
  }
</style>
