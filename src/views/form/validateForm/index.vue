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
        <el-form-item label="选择物业公司">
          <el-checkbox-group v-model="ruleForm.comps" @change="handleCheckedCompsChange">
            <el-checkbox v-for="comp in Comps" :key="comp" :label="comp" :value="comp">
              {{ comp }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="启用任务">
          <el-switch v-model="ruleForm.delivery" style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66" />
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container m-user">
      <UserTable :table-data="ruleForm.rwList" :group="UserStore.userInfo.rolelevel == '3' ? grouplist1 : grouplist" />
    </div>
    <div class="centered-buttons">
      <el-form-item>
        <el-button v-if="ruleForm.id == '' || ruleForm.id == null" type="primary" size="large" @click="submitForm(ruleFormRef, 1)"
          >创建</el-button
        >
        <el-button v-if="ruleForm.id != '' && ruleForm.id != null" type="primary" size="large" @click="submitForm(ruleFormRef, 1)"
          >编辑保存</el-button
        >
        <el-button v-if="ruleForm.id == '' || ruleForm.id == null" type="info" size="large" @click="submitForm(ruleFormRef, 2)"
          >暂存</el-button
        >
        <el-button v-if="ruleForm.id == '' || ruleForm.id == null" size="large" @click="resetForm(ruleFormRef)">重置</el-button>
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
  import { useUserStore } from '@/store/modules/user'
  //import { userData } from '@/mock/system'
  const UserStore = useUserStore()
  const router = useRouter()
  //const tableData = ref(userData)
  const formSize = ref('small')
  const ruleFormRef = ref<FormInstance>()
  const props = { multiple: true }
  const cascaderRef = ref(null)
  const UseSettingStore = useSettingStore()
  const checkAll = ref(true)
  const isIndeterminate = ref(true)
  const Comps = computed(() => {
    return UseSettingStore.compList
  })
  //目前没有作用
  const xcId = computed(() => {
    return UseSettingStore.xcrwId
  })
  //如果是新建 置空xcrw  如果是编辑  赋值
  let ruleForm = computed(() => {
    return UseSettingStore.xcrw
  })
  const grouplist = [
    {
      name: '物业公司',
      prop: 'wygs',
      width: '180',
    },
    {
      name: '物业负责人',
      prop: 'wyfzr',
      width: '120',
    },
    {
      name: '物业负责人电话',
      prop: 'wyfzrp',
      width: '180',
    },
    {
      name: '已分配建筑数量',
      prop: 'yfpjzsl',
      width: '120',
    },
    {
      name: '未分配建筑数量',
      prop: 'wfpjzsl',
      width: '120',
    },
    {
      name: '创建时间',
      prop: 'createTime',
      width: '280',
    },
  ]

  const grouplist1 = [
    {
      name: '采集员',
      prop: 'cjrname',
      width: '120',
    },
    {
      name: '审核员',
      prop: 'shrName',
      width: '120',
    },
    {
      name: '用户状态',
      prop: 'status',
      width: '160',
    },
    {
      name: '任务建筑数量',
      prop: 'jzsl',
      width: '160',
    },
    {
      name: '创建时间',
      prop: 'createTime',
      width: '280',
    },
  ]
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
    desc: [{ required: false, message: '请填写活动形式', trigger: 'blur' }],
    // rwList: [
    //   (value) => {
    //     // 验证数组是否为空
    //     return value.length > 0 || '您尚未分配任务人员'
    //   },
    // ],
  })
  const handleCheckedCompsChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === Comps.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < Comps.value.length
  }
  //保存后 把store中的数据清空
  const submitForm = async (formEl: FormInstance | undefined, num) => {
    // let delivery = UseSettingStore.selJZList.length > 0 ? true : false
    // console.log('1111', delivery)
    // ruleForm.value.delivery = delivery
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      console.log('222', valid, fields)
      if (valid) {
        if (num == 1 && ruleForm.value.rwList.length == 0) {
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
              if (ruleForm.value.id == '') {
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
              }
              //UseSettingStore.setXcssList(xcssList)

              ElMessage({
                type: 'success',
                message: `保存成功!`,
              })
              setTimeout(async () => {
                router.push({
                  path: '/form/dept',
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
