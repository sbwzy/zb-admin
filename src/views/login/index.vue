<template>
  <div class="login-container">
    <div class="login-box">
      <SwitchDark class="login-dark" />
      <div class="login-left">
        <img src="@/assets/image/login/side-logo.png" />
      </div>
      <div class="login-form">
        <div class="info-qrcode">{{ accountLogin ? '短信登录' : '账号登录' }}</div>
        <div>
          <img v-if="accountLogin" src="@/assets/image/login/smsLogin-icon.png" class="qrcode" @click="handleClick" />
          <img v-else src="@/assets/image/login/accountLogin-icon.png" class="qrcode" @click="handleClick" />
        </div>
        <!-- <el-button-group class="button-group">
          <el-button type="info" @click="switchForm('LoginForm')">账号登录</el-button>
          <el-button type="info" @click="switchForm('LoginQrcode')">二维码登录</el-button>
          <el-button type="info" @click="switchForm('SMSLoginForm')">短信登录</el-button>
        </el-button-group> -->

        <!-- <LoginForm v-if="currentForm === 'LoginForm'" />
        <LoginQrcode v-else-if="currentForm === 'LoginQrcode'" />
        <SMSLoginForm v-else /> -->

        <LoginForm v-if="accountLogin" />
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

  const accountLogin = ref<boolean>(true)

  const handleClick = () => {
    console.log('=======', accountLogin)
    accountLogin.value = !accountLogin.value
  }

  // const currentForm = ref('LoginForm')
  // const switchForm = (formName) => {
  //   currentForm.value = formName
  // }
</script>
<style lang="scss" scoped>
  @import './index';
</style>
