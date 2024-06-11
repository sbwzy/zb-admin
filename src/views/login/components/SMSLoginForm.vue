<template>
  <div class="login-title">
    <img class="icon" src="@/assets/image/logo1.png" alt="logo" />
    <h2 class="title">优历直管公房数据采集</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="phone">
      <el-input
        v-model="ruleForm.phone"
        placeholder="请输入手机号"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <!-- <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template> -->
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="yzm">
      <!-- <el-input
        v-model="ruleForm.yzm"
        placeholder="请输入验证码"
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
      </el-input> -->
      <el-row :gutter="0" style="width: 100%">
        <el-col :span="14">
          <el-input v-model="ruleForm.yzm" placeholder="请输入验证码" style="position: relative"></el-input>
        </el-col>
        <el-col :span="10" class="button-col">
          <el-button type="primary" :disabled="countdown > 0" @click="sendCode">
            发送验证码{{ countdown > 0 ? `(${countdown}s)` : '' }}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button :loading="loading" class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
    <el-link class="register" type="primary" @click="onRegister">注册账号</el-link>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, reactive, onUnmounted, defineProps } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'
  import { getYZM } from '@/api/user'
  import { loginInfo } from '@/api/user'
  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  //const passwordType = ref('password')
  const loading = ref(false)

  const rules = reactive({
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
    ],
    yzm: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    phone: '',
    yzm: '',
  })

  const gfIDList = {
    gfID: '1',
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true

        loginInfo(ruleForm.phone, ruleForm.yzm).then((res) => {
          console.log(res)
          if (res.data.result == 1) {
            setTimeout(async () => {
              await UserStore.login1(ruleForm)
              await router.push({
                path: '/',
              })
              ElNotification({
                title: getTimeStateStr(),
                message: '欢迎登录 监测管理平台',
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
        // getYZM(ruleForm).then((res) => {
        //   console.log('打印', res)
        //   //把后面代码写在这里面
        // })
        // 登录
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  const countdown = ref(0)
  let intervalId = null

  const sendCode = () => {
    if (countdown.value > 0) {
      return
    }
    countdown.value = 60
    intervalId = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(intervalId)
      }
    }, 1000)

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    })

    return {
      countdown,
      sendCode,
    }
  }

  const props = defineProps({
    onRegister: Function,
  })
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
