<template>
  <div class="app-container">
    <div class="app-container-local right-align-inputs">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon label-position="left">
        <el-form-item label="建筑名称">
          <el-input v-model="ruleForm.standartName" readonly />
        </el-form-item>

        <el-form-item label="授权地址">
          <el-input v-model="ruleForm.shouQuanDZ" readonly />
        </el-form-item>

        <el-form-item label="物业联系人员">
          <el-input v-model="ruleForm.wyName" readonly />
        </el-form-item>

        <el-form-item label="物业联系方式">
          <el-input v-model="ruleForm.wyPhone" readonly />
        </el-form-item>
        <el-form-item label="房屋类型">
          <el-input v-model="ruleForm.standardType" readonly />
        </el-form-item>
        <el-form-item label="原产业状态">
          <el-input v-model="ruleForm.IndustrStatusOld" readonly />
        </el-form-item>
        <el-form-item label="当前产业状态">
          <el-input v-model="ruleForm.IndustrStatus" readonly />
        </el-form-item>
        <el-form-item label="原房屋用途">
          <el-input v-model="ruleForm.fangWuYTOld" readonly />
        </el-form-item>
        <el-form-item label="当前房屋用途">
          <el-input v-model="ruleForm.fangWuYT" readonly />
        </el-form-item>
        <el-form-item label="建筑现状">
          <el-input v-model="ruleForm.desc2" readonly />
        </el-form-item>
        <el-form-item label="现场是否有铭牌">
          <el-input v-model="ruleForm.sfmpqs" readonly />
        </el-form-item>
        <el-form-item label="保护铭牌内容">
          <el-input v-model="ruleForm.bhmpCont" readonly />
        </el-form-item>
        <el-form-item label="使用人-">
          <el-input v-model="ruleForm.shiYongROld" readonly />
        </el-form-item>
        <el-form-item label="现场带看情况">
          <el-input v-model="ruleForm.dkdesc" readonly />
        </el-form-item>
        <el-form-item label="外业巡查情况备注">
          <el-input v-model="ruleForm.desc" readonly />
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="ruleForm.descShenHe" readonly />
        </el-form-item>
      </el-form>

      <div>
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><calendar /></el-icon>
                <span>照片1</span>
              </span>
            </template>
            <!-- <div class="container">
        <img src="../../../assets/image/avatar.png" alt="Your Image" class="image" />
        <div class="text">
            Lorem ipsum dolor sit ame
        </div>
      </div> -->
            <el-row class="cardContainer" :gutter="20">
              <el-col v-for="item in lists" :key="item" :xs="12" :sm="8" :md="6" :lg="{ span: '7' }">
                <el-card
                  class="card"
                  shadow="hover"
                  :body-style="{
                    padding: '10px',
                    boxSizing: 'border-box',
                    width: '100%',
                  }"
                >
                  <div class="content">
                    <img :src="item.imgUrl" class="image" alt="图片" />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Config"> </el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
        <!-- 图片模块 -->
        <div class="itemCloum" title="">
          <div title="">
            <!--照片类型-->
            <div class="bg-white nav">
              <div class="cu-item">
                <span class="margin-right-xs"></span>
              </div>
            </div>

            <!-- 自定义弹出框组件 -->
            <div class="tooltip-popup"> </div>

            <!--照片库-->
            <div>
              <div class="example-body">
                <div></div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>

            <div class="button-sp-area">
              <el-button class="mini-btn">取消</el-button>
              <el-button class="mini-btn">暂存</el-button>
              <el-button class="mini-btn">保存并提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  // 在这里引入接口
  import { collectionInfo, getLocationInfo } from '@/api/user'
  import { useUserStore } from '@/store/modules/user'
  import {
    validatorMethod,
    verifyPhone,
    verifyTextColor,
    verifyIdCard,
    verifyWebsite,
    verifyHtml,
    verifyDate,
    verifyEmail,
  } from '@/utils/validate'

  interface ListItem {
    imgUrl: string
    name: string
  }
  const loading = ref(true)
  const ruleFormRef = ref<FormInstance>()
  let text = '只要自己不放弃，没有任何人可以打倒你'
  let keyword = ref<string>(text)
  const currentDate = new Date().toDateString()

  const lists = ref<ListItem[]>([])
  const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  const ruleForm = reactive({
    standartName: '测试名称',
    shouQuanDZ: '测试地址',
    wyName: '测试联系人',
    wyPhone: '测试联系方式',
    standardType: '测试类型',
    IndustrStatusOld: '测试状态',
    IndustrStatus: '测试状态',
    fangWuYTOld: '测试用途',
    fangWuYT: '测试用途',
    desc2: '测试现状',
    sfmpqs: '测试是否有铭牌',
    bhmpCont: '测试铭牌内容',
    shiYongROld: '测试使用人',
    dkdesc: '测试带看情况',
    desc: '测试巡查情况',
    descShenHe: '测试审核意见',
    phone: '',
    keyword: '',
    percent: '',
    idCard: null,
    website: null,
    html: null,
    date: null,
    email: null,
  })

  const rules = reactive<FormRules>({
    phone: [
      {
        required: true,
        validator: validatorMethod(verifyPhone, '请输入正确的手机号'),
        trigger: ['blur', 'change'],
      },
    ],
    idCard: [
      {
        required: true,
        validator: validatorMethod(verifyIdCard, '请输入正确的身份证'),
        trigger: ['blur', 'change'],
      },
    ],
    website: [
      {
        required: true,
        validator: validatorMethod(verifyWebsite, '请输入正确的网址'),
        trigger: ['blur', 'change'],
      },
    ],
    html: [
      {
        required: true,
        validator: validatorMethod(verifyHtml, '请输入正确的html标签'),
        trigger: ['blur', 'change'],
      },
    ],
    date: [
      {
        required: true,
        validator: validatorMethod(verifyDate, '请输入正确的日期'),
        trigger: ['blur', 'change'],
      },
    ],
    email: [
      {
        required: true,
        validator: validatorMethod(verifyEmail, '请输入正确的邮箱'),
        trigger: ['blur', 'change'],
      },
    ],
  })

  const onVerifyKeywordColor = (value) => {
    if (!value) keyword.value = text
    else keyword.value = verifyTextColor(value, text)
  }

  let props = defineProps({
    componentType: {
      type: String,
      default() {
        return ''
      },
    },
  })

  const gfIDList = {
    gfID: '1',
  }

  onMounted(() => {
    // collectionInfo(gfIDList).then((res) => {
    //   console.log(res)
    // })
    lists.value = [
      {
        imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        name: 'Deer',
      },
      {
        imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        name: 'Horse',
      },
      {
        imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        name: 'Mountain Lion',
      },
    ]
  })
</script>

<style lang="scss">
  .app-container {
    color: #606266;
  }

  ::v-deep(.item-form) {
    .el-form-item__label {
      margin-bottom: 0 !important;
    }
  }

  .right-align-inputs .el-form-item .el-input__inner {
    text-align: right;
    background-color: transparent;
  }

  .right-align-inputs .el-form-item {
    margin-bottom: 9px;
  }

  .app-container-local {
    height: 100%;
    width: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: white;
    padding: 5px;
    box-sizing: border-box;
  }

  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .image {
    width: 100px; /* 或者你需要的尺寸 */
    height: 100px; /* 或者你需要的尺寸 */
    margin-right: 20px; /* 图片和文本之间的距离 */
  }
  .el-card {
    border: 0px;
    margin-bottom: 40px;
    .content {
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
