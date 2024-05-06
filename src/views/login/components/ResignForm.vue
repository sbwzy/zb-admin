<template>
  <div class="login-title">
    <img class="icon" src="@/assets/image/logo1.png" alt="logo" />
    <h2 class="title">账号注册</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="phoneNumber">
      <el-input
        v-model="ruleForm.phoneNumber"
        placeholder="手机号"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="district">
      <el-input
        v-model="ruleForm.district"
        placeholder="区"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="street">
      <el-input
        v-model="ruleForm.street"
        placeholder="街道"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="profile">
      <el-input
        v-model="ruleForm.profile"
        placeholder="身份"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="propertyCompany">
      <el-input
        v-model="ruleForm.propertyCompany"
        placeholder="物业公司"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        v-model="ruleForm.password"
        placeholder="请输入密码"
        auto-complete="on"
        :type="passwordType"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="repeatPassword">
      <el-input
        v-model="ruleForm.repeatPassword"
        placeholder="请重复输入密码"
        auto-complete="on"
        :type="passwordType"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button :loading="loading" class="login-btn" type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'
  import { getLocationInfo } from '@/api/user'

  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('password')
  const loading = ref(false)

  const rules = reactive({
    phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    district: [{ required: true, message: '请输入区', trigger: 'blur' }],
    street: [{ required: true, message: '请输入街道', trigger: 'blur' }],
    profile: [{ required: true, message: '请输入身份', trigger: 'blur' }],
    propertyCompany: [{ required: true, message: '请输入物业公司', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    repeatPassword: [{ required: true, message: '请重复输入密码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    phoneNumber: '',
    district: '',
    street: '',
    profile: '',
    propertyCompany: '',
    password: '',
    repeatPassword: '',
  })

  // 显示密码图标
  const showPwd = () => {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true
        // 登录
        setTimeout(async () => {
          await UserStore.login(ruleForm)
          await router.push({
            path: '/',
          })
          ElNotification({
            title: getTimeStateStr(),
            message: '欢迎登录 公房监测管理平台',
            type: 'success',
            duration: 3000,
          })
          loading.value = true
        }, 1000)
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  const handleRegister = () => {
    // 在这里处理点击事件
    console.log('点击注册')
  }

  onMounted(async () => {
    console.log('mounted')
    // try {
    const data = {
      // 在这里添加请求参数
    }
    // const response = await getLocationInfo(data)
    getLocationInfo(data).then((res) => {
      console.log('打印', res)
      //把后面代码写在这里面
    })
    // console.log(response)
  })
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
