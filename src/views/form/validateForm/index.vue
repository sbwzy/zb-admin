<template>
  <PageWrapLayout>
    <div style="max-width: 900px">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="任务区域" prop="delivery">
          <!-- <el-link :icon="MapLocation" type="primary" @click="inMap">进入地图</el-link> -->
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
  import { reactive, ref } from 'vue'
  import { MapLocation, View as IconView } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import Upload from './components/Upload.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const formSize = ref('small')
  const ruleFormRef = ref<FormInstance>()
  const props = { multiple: true }
  const cascaderRef = ref(null)

  const pointslist1 = ref([
    [31.26119881827799, 121.4253616333008],
    [31.32745508030936, 121.3517974853515],
    [31.36530592827279, 121.3593505859375],
    [31.3814392726145, 121.3473342895508],
    [31.21119881827799, 121.4253616333008],
    [31.39745508030936, 121.3517974853515],
    [31.31530592827279, 121.3593505859375],
    [31.3114392726145, 121.3473342895508],
  ])
  const options = [
    {
      value: 1,
      label: '全市',
      children: [
        {
          value: 2,
          label: '静安区',
          children: [
            { value: 3, label: '南京西路街道' },
            { value: 4, label: '曹家渡街道' },
            { value: 5, label: '江宁路街道' },
          ],
        },
        {
          value: 6,
          label: '徐汇区',
          children: [
            { value: 7, label: '天平路街道' },
            { value: 8, label: '湖南路街道' },
            { value: 9, label: '徐家汇街道' },
          ],
        },
        {
          value: 10,
          label: '普陀区',
          children: [
            { value: 11, label: '曹杨新村街道' },
            { value: 12, label: '长寿路街道' },
          ],
        },
      ],
    },
  ]
  const ruleForm = reactive({
    name: '',
    //region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    clubType: '',
    img: [],
  })

  const rules = reactive({
    name: [
      { required: true, message: '请输入任务名称', trigger: 'blur' },
      { min: 3, message: '长度大于3个字符', trigger: 'blur' },
    ],
    img: [{ required: false, message: '请上传图片', trigger: 'blur' }],
    // region: [
    //   {
    //     required: true,
    //     message: '请选择任务区域',
    //     trigger: 'change',
    //   },
    // ],
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
        type: 'array',
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
        message: '请进入地图选择区域方位\n',
        trigger: 'change',
      },
      {
        validator: (rule, value, callback) => {
          if (value) {
            callback() // 如果选择true，则验证通过
          } else {
            callback(new Error('请进入地图选择区域方位')) // 如果选择false，则返回错误信息
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

  const inMap = () => {
    router.push(
      { name: 'BingMap', params: { id: '0', type: 'xcmap' } },
      //,params:{list:JSON.stringify(pointslist1.value)}
    )
  }
</script>
<style lang="scss">
  .el-cascader-menu {
    min-width: 40px;
  }
</style>
