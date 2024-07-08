<template>
  <el-dialog v-model="dialogVisible" :title="title" width="80%" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="采集员" prop="cjrname">
        <el-select v-model="ruleForm.cjrname" placeholder="请选择采集员" style="width: 100%" @change="handleChange">
          <el-option v-for="item in xcoptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="审核员" prop="shrName">
        <el-select v-model="ruleForm.shrName" placeholder="请选择" style="width: 100%" @change="handleChange1">
          <el-option v-for="item in shoptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="手机号" prop="photo">
        <el-input v-model="ruleForm.photo" placeholder="请输入手机号" />
      </el-form-item> -->
      <!-- <el-form-item label="账户密码">
        <el-input v-model="ruleForm.password" placeholder="请输入账户密码,如果不输入默认123456" type="password" clearable />
      </el-form-item> -->
      <el-form-item label="用户状态">
        <el-switch v-model="ruleForm.status" inline-prompt active-text="启用" inactive-text="禁用"></el-switch>
      </el-form-item>
      <el-form-item label="选择任务范围" prop="delivery">
        <el-link :icon="OfficeBuilding" type="primary" @click="dialogVisible1 = true">选择建筑</el-link>
      </el-form-item>
      <el-form-item label="用户描述" prop="describe">
        <el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入用户描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClose(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible1" :title="title1" width="80%" style="height: 700px; overflow: auto" @close="close">
    <mypage @select-alls="selectAll"></mypage>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
  import { MapLocation, Memo, OfficeBuilding, View as IconView } from '@element-plus/icons-vue'
  import { reactive, ref, onMounted } from 'vue'
  import mypage from '@/views/table/ComprehensiveTable/index.vue'
  import { useSettingStore } from '@/store/modules/setting'
  const ruleFormRef = ref<FormInstance>()
  const dialogVisible = ref<boolean>(false)
  const dialogVisible1 = ref<boolean>(false)
  const title = ref('分配采集员')
  const title1 = ref('选择建筑')

  const rules = reactive({
    // nickname: [
    //   { required: true, message: '请输入昵称', trigger: 'blur' },
    //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    // ],
    // username: [{ required: true, message: '请输入', trigger: 'blur' }],
    cjrname: [{ required: true, message: '请选择采集员', trigger: 'change' }],
    shrName: [{ required: true, message: '请选择审核员', trigger: 'change' }],
  })
  const SettingStore = useSettingStore()
  const ruleForm = reactive({
    cjrname: '',
    shrName: '',
    jzsl: 0,

    // sex: '',
    // role: null,

    photo: null,
    createTime: null,
    // password: null,
    describe: null,
    status: true,
  })
  //采集员 可以给管理员审核
  //管理员 不可以给自己审核SettingStore.xcoptions
  const xcoptions = SettingStore.xcoptions
  const shoptions = SettingStore.shoptions

  function close() {
    ruleFormRef.value.resetFields()
    Object.keys(ruleForm).forEach((key) => {
      // if (key === 'sex') ruleForm[key] = '男'
      // else
      if (key === 'status') ruleForm[key] = true
      else ruleForm[key] = null
    })
  }

  const show = (item = {}) => {
    title.value = '分配采集员'
    if (item.cjrname) {
      //调用接口查询采集员信息

      title.value = '编辑采集员'
      Object.keys(item).forEach((key) => {
        ruleForm[key] = item[key]
      })
    }
    dialogVisible.value = true
  }
  const handleChange = (value) => {
    console.log('111', value)
    //if (ruleForm.shrName != '' && ruleForm.shrName != null) {
    SettingStore.shoptions.forEach((item) => {
      item.disabled = false
      console.log('333', item.value)
      if (item.value == value) {
        console.log('444', item.value)
        item.disabled = true
        console.log(SettingStore.shoptions)
      }
    })
    //}
  }
  const handleChange1 = (value) => {
    console.log('222', value)
    //if (ruleForm.cjrname != '' && ruleForm.cjrname != null) {
    SettingStore.xcoptions.forEach((item) => {
      item.disabled = false
      if (item.value == value) {
        item.disabled = true
      }
    })
    //}
  }
  // const shouldDisable = (item) => {
  //   console.log(1111,item)
  //   //return item.shrName === item.cjrname && item.shrName!= '' && item.shrName!= null && item.cjrname!= '' && item.cjrname!= null
  // }
  const handleClose = async (done: () => void) => {
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        SettingStore.xcrw.rwList.push({
          cjrname: ruleForm.cjrname,
          shrName: ruleForm.shrName,
          jzsl: SettingStore.xcjzList.length,
          createTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
          describe: ruleForm.describe,
          status: ruleForm.status,
        })

        dialogVisible.value = false
        console.log('submit!', ruleForm)
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const selectAll = (val) => {
    console.log(val)
    //后期处理
    // dialogVisible1.value = !dialogVisible1.value
  }

  onMounted(() => {})

  defineExpose({
    show,
  })
</script>
<style lang="scss" scoped></style>
