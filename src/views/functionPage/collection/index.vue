<template>
  <div class="app-container">
    <div class="app-container-inner">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon label-position="left">
        <el-form-item label="建筑名称">
          <el-input v-model="ruleForm.standartName" />
        </el-form-item>

        <el-form-item label="授权地址">
          <el-input v-model="ruleForm.shouQuanDZ" />
        </el-form-item>

        <el-form-item label="物业联系人员">
          <el-input v-model="ruleForm.wyName" />
        </el-form-item>

        <el-form-item label="物业联系方式">
          <el-input v-model="ruleForm.wyPhone" />
        </el-form-item>
        <el-form-item label="房屋类型">
          <el-input v-model="ruleForm.standardType" />
        </el-form-item>
        <el-form-item label="原产业状态">
          <el-input v-model="ruleForm.IndustrStatusOld" />
        </el-form-item>
        <el-form-item label="当前产业状态">
          <el-input v-model="ruleForm.IndustrStatus" />
        </el-form-item>
        <el-form-item label="原房屋用途">
          <el-input v-model="ruleForm.fangWuYTOld" />
        </el-form-item>
        <el-form-item label="当前房屋用途">
          <el-input v-model="ruleForm.fangWuYT" />
        </el-form-item>
        <el-form-item label="建筑现状">
          <el-input v-model="ruleForm.desc2" />
        </el-form-item>
        <el-form-item label="现场是否有铭牌">
          <el-input v-model="ruleForm.sfmpqs" />
        </el-form-item>
        <el-form-item label="保护铭牌内容">
          <el-input v-model="ruleForm.bhmpCont" />
        </el-form-item>
        <el-form-item label="使用人-">
          <el-input v-model="ruleForm.shiYongROld" />
        </el-form-item>
        <el-form-item label="现场带看情况">
          <el-input v-model="ruleForm.dkdesc" />
        </el-form-item>
        <el-form-item label="外业巡查情况备注">
          <el-input v-model="ruleForm.desc" />
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="ruleForm.descShenHe" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item label="匹配文字变色（搜索时）" prop="keyword" class="item-form">
          <div>示例：<span v-html="keyword"></span></div>
          <el-input v-model="ruleForm.keyword" placeholder="请输入关键字" @input="onVerifyKeywordColor" />
        </el-form-item>

        <el-form-item label="身份证" prop="idCard" class="item-form">
          <div>验证身份证是否正确</div>
          <el-input v-model="ruleForm.idCard" placeholder="请输入身份证" />
        </el-form-item>

        <el-form-item label="网址" prop="website" class="item-form">
          <div>验证url是否正确。</div>
          <el-input v-model="ruleForm.website" placeholder="请输入url" />
        </el-form-item>

        <el-form-item label="html标签" prop="html" class="item-form">
          <div>是否是html标签</div>
          <el-input v-model="ruleForm.html" placeholder="请输入html标签" />
        </el-form-item>

        <el-form-item label="日期" prop="date" class="item-form">
          <div>是否是正确的日期</div>
          <el-input v-model="ruleForm.date" placeholder="请输入日期" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email" class="item-form">
          <div>是否是正确的邮箱</div>
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
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
  const ruleFormRef = ref<FormInstance>()
  let text = '只要自己不放弃，没有任何人可以打倒你'
  let keyword = ref<string>(text)
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
</script>

<style lang="scss" scoped>
  .app-container {
    color: #606266;
  }
  ::v-deep(.item-form) {
    .el-form-item__label {
      margin-bottom: 0 !important;
    }
  }
</style>
