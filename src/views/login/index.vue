<template>
  <div class="login-container">
    <div class="login-box">
      <SwitchDark class="login-dark" />
      <div class="login-left">
        <img src="@/assets/image/login/side-logo.png" />
      </div>
      <div class="login-form">
        <!-- <div class="info-qrcode">{{ accountLogin ? '扫码登录' : '账号登录' }}</div>
        <img src="@/assets/image/login/qrcode-icon.png" class="qrcode" @click="handleClick" /> -->
        <el-button-group class="button-group">
          <el-button type="info" @click="switchForm('LoginForm')">账号登录</el-button>
          <el-button type="info" @click="switchForm('LoginQrcode')">二维码登录</el-button>
          <el-button type="info" @click="switchForm('SMSLoginForm')">短信登录</el-button>
        </el-button-group>

        <LoginForm v-if="currentForm === 'LoginForm'" />
        <LoginQrcode v-else-if="currentForm === 'LoginQrcode'" />
        <SMSLoginForm v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import LoginForm from './components/LoginForm.vue'
  import SwitchDark from '@/components/SwitchDark/index.vue'
  import LoginQrcode from './components/LoginQrcode.vue'
  import SMSLoginForm from './components/SMSLoginForm.vue'

  const currentForm = ref('LoginForm')
  const switchForm = (formName) => {
    currentForm.value = formName
  }
</script>
<style lang="scss" scoped>
  @import './index';
</style>
