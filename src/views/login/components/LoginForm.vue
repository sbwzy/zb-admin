<template>
  <div class="login-title">
    <!-- <img class="icon" src="@/assets/image/logo1.png" alt="logo" /> -->
    <h2 class="title">优历直管公房巡查</h2>
  </div>
  <el-form v-if="msgType == '' || msgType == undefined || msgType == null" ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名"
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

    <el-form-item style="width: 100%">
      <el-button :loading="loading" class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
    <!-- <el-link class="register" type="primary" @click="onRegister">注册账号</el-link> -->
  </el-form>
  <div v-else-if="msgType == 'succ'" class="transition-page">
    <div class="content">
      <h1>{{ msg }}</h1>
      <p>请稍候...</p>
      <el-button v-if="!editFetch" @click.stop="back">重试{{ errormsg }}</el-button>
    </div>
  </div>
  <div v-else="msgType == 'err'" class="transition-page">
    <div class="content">
      <h1>当前跳转失败...</h1>
      <p>{{ msg }}</p>
      <el-button @click.stop="back">后退</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, defineProps, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter, useRoute } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'
  import { loginInfoUser } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'
  import { loginInfo, buildListinfo1, xcrwXQ, getQueryMPZInfo, buildListinfo, getUserInfo } from '@/api/user'
  import dayjs from 'dayjs' // 引入dayjs库用于日期处理
  import { writeXLSX } from 'xlsx'
  import { ElMessage, ElMessageBox, ElButton, ElIcon } from 'element-plus'

  import wx from 'weixin-js-sdk'

  const router = useRouter()
  const route = useRoute()
  let msg = route.query.msg as string
  //let msgType = (route.query.msgType as string) || 'succ'
  let msgType = route.query.msgType as string
  console.log('获取传递过来的token', msg)
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('password')
  const loading = ref(false)
  const editFetch = ref(true)
  let errormsg = ref('')
  const SettingStore = useSettingStore()
  // 获取数据
  const { XiaoQuList } = storeToRefs(SettingStore)

  const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    username: '15755586070',
    password: '',
  })

  // 显示密码图标
  const showPwd = () => {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
  }
  const targetPath = '/' // 目标页面路径
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true

        loginInfo(ruleForm.username, ruleForm.password)
          .then((res) => {
            if (res.data.result === 1) {
              // 设置定时器，在指定时间后跳转
              //验证 本地的话结构是-11 表示未登录 》=0 表示 已登录

              getQueryMPZInfo()
                .then((res) => {
                  if (res.data.result >= 0) {
                    editFetch.value == true
                    getUserInfo()
                      .then((res) => {
                        if (res.data.result === 1) {
                          let userInfo = {
                            username: res.data.userInfo.userName,
                            userType: 'admin',
                          }
                          UserStore.login(userInfo)
                          //UserStore.setUserInfo(res.data.userInfo)
                          buildListinfo()
                            .then((res) => {
                              if (res.data.result === 1) {
                                ElNotification({
                                  title: getTimeStateStr(),
                                  message: '欢迎登录 公房巡查平台',
                                  type: 'success',
                                  duration: 3000,
                                })
                                loading.value = true
                                SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                                SettingStore.setXiaoQumsg(res.data.notemsg)
                                setTimeout(async () => {
                                  router.push('/')
                                }, 2000)
                              } else {
                                ElMessage({
                                  showClose: true,
                                  message: res.data.msg,
                                  type: 'error',
                                  duration: 0,
                                })
                              }
                            })
                            .catch((error) => {
                              //接口失败时 显示当前接口错误
                              ElMessage({
                                showClose: true,
                                message: error,
                                type: 'error',
                                duration: 0,
                              })
                            })
                        } else {
                          ElMessage({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 0,
                          })
                        }
                      })
                      .catch((error) => {
                        //接口失败时 显示当前接口错误
                        ElMessage({
                          showClose: true,
                          message: error,
                          type: 'error',
                          duration: 0,
                        })
                      })
                  } else {
                    editFetch.value == false
                    errormsg.value = res.data.msg
                    ElMessage({
                      showClose: true,
                      message: res.data.msg,
                      type: 'error',
                      duration: 0,
                    })
                  }
                })
                .catch((error) => {
                  //接口失败时 显示当前接口错误
                  loading.value = false
                  ElMessage({
                    showClose: true,
                    message: error,
                    type: 'error',
                    duration: 0,
                  })
                })
            }
          })
          .catch((error) => {
            //接口失败时 显示当前接口错误
            loading.value = false
            ElMessage({
              showClose: true,
              message: error,
              type: 'error',
              duration: 0,
            })
          })
      }
    })
  }

  const back = () => {
    //window.location.href = '/pagesService/historicalBuilding/login'
    wx.miniProgram.navigateTo({ url: '/pagesService/historicalBuilding/login' })
  }

  const props = defineProps({
    onRegister: Function,
  })

  onMounted(() => {
    //直接触发 跳转
    if (msgType == 'succ') {
      // 设置定时器，在指定时间后跳转
      getQueryMPZInfo()
        .then((res) => {
          if (res.data.result >= 0) {
            editFetch.value = true
            getUserInfo()
              .then((res) => {
                if (res.data.result === 1) {
                  let userInfo = {
                    username: res.data.userInfo.userName,
                    userType: 'admin',
                  }
                  UserStore.login(userInfo)
                  buildListinfo()
                    .then((res) => {
                      if (res.data.result === 1) {
                        SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                        SettingStore.setXiaoQumsg(res.data.notemsg)
                        if (route.query.redirect) {
                          const redirectPath = route.query.redirect
                          router.push(redirectPath)
                        } else {
                          router.push('/home') // 默认跳转到 /home
                        }
                      } else {
                        ElMessage({
                          showClose: true,
                          message: res.data.msg,
                          type: 'error',
                          duration: 0,
                        })
                      }
                    })
                    .catch((error) => {
                      //接口失败时 显示当前接口错误
                      ElMessage({
                        showClose: true,
                        message: error,
                        type: 'error',
                        duration: 0,
                      })
                    })
                } else {
                  ElMessage({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error',
                    duration: 0,
                  })
                }
              })
              .catch((error) => {
                //接口失败时 显示当前接口错误
                ElMessage({
                  showClose: true,
                  message: error,
                  type: 'error',
                  duration: 0,
                })
              })
          } else {
            editFetch.value = false
            errormsg.value = res.data.msg
            ElMessage({
              showClose: true,
              message: res.data.msg,
              type: 'error',
              duration: 0,
            })
          }
        })
        .catch((error) => {
          //接口失败时 显示当前接口错误
          ElMessage({
            showClose: true,
            message: error,
            type: 'error',
            duration: 0,
          })
        })
    }
  })
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
