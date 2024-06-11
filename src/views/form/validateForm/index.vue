<template>
  <PageWrapLayout>
    <div style="max-width: 900px">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="任务区域" prop="delivery">
          <el-link :icon="OfficeBuilding" type="primary" @click="inBuilds">选择建筑</el-link>
        </el-form-item>
        <el-form-item label="任务团队分配" prop="clubType">
          <el-select v-model="ruleForm.clubType" placeholder="请选择一个团队">
            <el-option label="xx保险公司" value="xx保险公司" />
            <el-option label="xx行外业团队" value="xx行外业团队" />
          </el-select>
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
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageWrapLayout>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue'
  import { MapLocation, Memo, OfficeBuilding, View as IconView } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import { useSettingStore } from '@/store/modules/setting'
  import Upload from './components/Upload.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const formSize = ref('small')
  const ruleFormRef = ref<FormInstance>()
  const props = { multiple: true }
  const cascaderRef = ref(null)
  const UseSettingStore = useSettingStore()

  let ruleForm = reactive({
    name: '',
    //region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    clubType: '',
  })

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
    delivery: [
      {
        required: true,
        message: '请选择区域范围\n',
        trigger: 'change',
      },
      {
        validator: (rule, value, callback) => {
          if (value) {
            callback() // 如果选择true，则验证通过
          } else {
            callback(new Error('请进入选择区域范围')) // 如果选择false，则返回错误信息
          }
        },
        trigger: 'change',
      },
    ],
    desc: [{ required: false, message: '请填写活动形式', trigger: 'blur' }],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const inBuilds = () => {
    //缓存当前页面的信息
    UseSettingStore.setXcrw(ruleForm)
    router.push(
      { name: 'comprehensive', params: { type: 'newxcrw', id: '1' } },
      //,params:{list:JSON.stringify(pointslist1.value)}
    )
  }

  onMounted(() => {
    //初始化是赋值信息
    console.log('赋值新建的巡查任务字段')
    ruleForm = UseSettingStore.xcrw
  })
</script>
<style lang="scss">
  .el-cascader-menu {
    min-width: 40px;
  }
</style>
