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
        <LoginForm v-if="accountLogin" :on-register="handleRegister" />
        <ResignForm v-else-if="resignPage" />
        <SMSLoginForm v-else :on-register="handleRegister" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import LoginForm from './components/LoginForm.vue'
  import ResignForm from './components/ResignForm.vue'
  import SwitchDark from '@/components/SwitchDark/index.vue'
  import SMSLoginForm from './components/SMSLoginForm.vue'

  const accountLogin = ref<boolean>(true)
  const resignPage = ref<boolean>(false)

  const handleClick = () => {
    console.log('=======', accountLogin)
    accountLogin.value = !accountLogin.value
    resignPage.value = false
  }

  const handleRegister = () => {
    resignPage.value = true
  }
  defineExpose({
    handleRegister,
  })
</script>
<style lang="scss" scoped>
  @import './index';
</style>
