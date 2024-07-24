<template>
  <div class="login-title">
    <img class="icon" src="@/assets/image/logo1.png" alt="logo" />
    <h2 class="title">优历直管公房数据采集平台</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
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
</template>
<script lang="ts" setup>
  import { ref, reactive, defineProps } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'
  import { loginInfoUser } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'
  import { buildListinfo, xcrwXQ } from '@/api/user'
  import dayjs from 'dayjs' // 引入dayjs库用于日期处理

  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('password')
  const loading = ref(false)
  const SettingStore = useSettingStore()

  const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    username: '18855551800',
    password: '123456',
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

        loginInfoUser(ruleForm.username, ruleForm.password).then((res) => {
          if (res.data.result == -1) {
            setTimeout(async () => {
              /**
               * A.判断当前用户身份
               *  1.当前是 [超级管理员]   新建巡查任务  管理巡查任务   禁用巡查任务?
               *  2.当前是 [审核员]  审核数据
               *  3.当前是 [采集员]  采集数据
               *  4.当前是 [审核员、采集员]  审核数据 采集数据
               * B.存储 用户信息 和 数据信息
               * C.跳转页面
               **/
              //巡查任务列表 res.data.data.xcssList
              let xcssList = ref([
                {
                  id: 1,
                  renwuName: '24年度第一季度巡查任务',
                  xcsjS: '2024-04-01',
                  xcsjE: '2024-05-31',
                  type: '年度中心巡查',
                  cjdw: '物业管理中心',
                  cjr: 'xxxx',
                  progress: '进行中',
                },
                {
                  id: 2,
                  renwuName: '24年度第二季度巡查任务',
                  xcsjS: '2024-06-01',
                  xcsjE: '2024-09-01',
                  type: '季度中心巡查',
                  cjdw: '物业管理中心',
                  cjr: 'xxxx',
                  progress: '进行中', //任务进展情况
                },
                {
                  id: 3,
                  renwuName: '24年度第二季度重点巡查任务',
                  xcsjS: '2024-06-01',
                  xcsjE: '2024-06-30',
                  type: '特殊情况巡查',
                  cjdw: '物业管理中心',
                  cjr: 'xxxx',
                  progress: '未开始',
                },
              ])
              SettingStore.setXcssList(xcssList.value)
              //赋值用户信息
              let userType = []
              if (ruleForm.username == 'admin') {
                userType = ['超级管理员']
              } else if(ruleForm.username !== 'caijiyuan'){
                userType = ['审核员']
              }

              let userInfo = { username: ruleForm.username, userType: userType, ssbm: '徐房集团' }
              UserStore.login(userInfo, userType)
              if (userType.includes('超级管理员')) {
                router.push({
                  path: '/',
                })
              } else {
                //找到最近的巡查任务直接进入建筑列表
                let cussids = []
                xcssList.value.forEach((item) => {
                  if (item.progress == '进行中' && dayjs(item.xcsjS) <= dayjs() && dayjs() <= dayjs(item.xcsjE)) {
                    cussids.push(item)
                  }
                })
                if (cussids.length == 1) {
                  SettingStore.setXcrwId = cussids[0].id
                  buildListinfo(cussids[0].id).then((res) => {
                    if (res.data.result == -11) {
                      let jzList = [
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄7号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00001',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄5号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00002',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00003',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00004',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄5号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00005',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00006',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00007',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '未采集',
                          shouQuanDZ: '安化路200弄5号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00008',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '采集中',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00009',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '采集中',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00010',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '采集中',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00011',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '待审核',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00012',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '待审核',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00013',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '待审核',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00014',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '审核驳回',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00015',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '审核驳回',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00016',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '审核通过',
                          shouQuanDZ: '安化路200弄6号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00017',
                        },
                        {
                          xiaoQu: '福世花园',
                          jieZhen: '江苏路街道',
                          cjZt: '审核通过',
                          shouQuanDZ: '安化路200弄4号',
                          standardType: '花园住宅',
                          fangWuYTOld: '非居住办公用房',
                          id: '00018',
                        },
                      ]
                      let wcjJzList = []
                      let cjzJzList = []
                      let dshJzList = []
                      let shbhJzList = []
                      let shtgJzList = []
                      jzList.forEach((item) => {
                        if (item.cjZt == '未采集') {
                          wcjJzList.push(item)
                        } else if (item.cjZt == '采集中') {
                          cjzJzList.push(item)
                        } else if (item.cjZt == '待审核') {
                          dshJzList.push(item)
                        } else if (item.cjZt == '审核驳回') {
                          shbhJzList.push(item)
                        } else if (item.cjZt == '审核通过') {
                          shtgJzList.push(item)
                        }
                      })
                      SettingStore.setJzList(jzList)
                      SettingStore.setWcjJzList(wcjJzList)
                      SettingStore.setCjzJzList(cjzJzList)
                      SettingStore.setDshJzList(dshJzList)
                      SettingStore.setShbhJzList(shbhJzList)
                      SettingStore.setShtgJzList(shtgJzList)
                    }
                    setTimeout(async () => {
                      router.push({
                        path: '/form/task',
                      })
                    }, 500)
                  })
                } else {
                  router.push({
                    path: '/form/dept',
                  })
                }
              }

              ElNotification({
                title: getTimeStateStr(),
                message: '欢迎登录 监测管理平台',
                type: 'success',
                duration: 3000,
              })
              loading.value = true
            }, 1000)
          } else {
            console.log('错误请求', res.data.message)
            return false
          }
        })
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  const props = defineProps({
    onRegister: Function,
  })
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
