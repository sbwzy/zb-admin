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
        <el-link :icon="OfficeBuilding" type="primary" @click="dialogMethod()">选择建筑</el-link>
      </el-form-item>
      <el-form-item label="用户描述" prop="describe">
        <el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入用户描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="handleClose(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible1" :title="title1" width="80%" style="height: 700px; overflow: auto" @close="close1">
    <mypage @select-alls="selectAll"></mypage>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
  import { MapLocation, Memo, OfficeBuilding, View as IconView } from '@element-plus/icons-vue'
  import { reactive, ref, onMounted, computed } from 'vue'
  import mypage from '@/views/table/ComprehensiveTable/index.vue'
  import { useSettingStore } from '@/store/modules/setting'
  const ruleFormRef = ref<FormInstance>()
  let dialogVisible = ref<boolean>(false)
  let dialogVisible1 = ref<boolean>(false)
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

  const ruleForm = computed(() => {
    return SettingStore.xcrwUser
  })
  //采集员 可以给管理员审核
  //管理员 不可以给自己审核SettingStore.xcoptions
  const xcoptions = SettingStore.xcoptions
  const shoptions = SettingStore.shoptions

  const close = () => {
    //判断状态是否已经被更改 不触发
    if (!dialogMethod) {
      if (ruleForm['jzList'].length !== 0) {
        ElMessageBox.confirm('当前已选择建筑任务,确定删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          draggable: true,
        })
          .then(() => {
            console.log('121212112198')
            ruleFormRef.value.resetFields()
            Object.keys(ruleForm).forEach((key) => {
              if (key === 'jzList') ruleForm[key] = []
              else if (key === 'status') ruleForm[key] = true
              else ruleForm[key] = ''
            })
            dialogVisible.value = false
            ElMessage.success('删除成功')
          })
          .catch(() => {})
      }
    }
  }

  const close1 = () => {
    dialogVisible1.value = false
    console.log('选择结束')
    //不能置空 应该保存 列表
    //ruleForm['key'] = []
  }
  //在打开建筑任务列表的时候
  const dialogMethod = () => {
    //首先给建筑列表进行筛选 判断当前列表多少是被选中
    //先对列表数据进行筛选 当前巡查任务已有分配人员任务进行剔除
    let xcuserHasList = []
    let xcOwnerHasList = []
    const ids = SettingStore.xcrw.rwList.map((item) => item.cjrname)
    const exists = ids.includes(SettingStore.xcrwUser.cjrname)
    SettingStore.xcrw.rwList.forEach((item1) => {
      if (item1.cjrname === SettingStore.xcrwUser.cjrname) {
        item1.jzList.forEach((item2) => {
          xcOwnerHasList.push(item2)
        })
      } else {
        item1.jzList.forEach((item2) => {
          xcuserHasList.push(item2)
        })
      }
    })
    if (!exists) {
      SettingStore.xcrwUser.jzList.forEach((item1) => {
        xcOwnerHasList.push(item1)
      })
    }
    console.log(xcOwnerHasList)
    console.log(xcuserHasList)
    SettingStore.bcjzList = SettingStore.xcjzList.filter((item) => {
      return !xcuserHasList.includes(item.id) && !xcOwnerHasList.includes(item.id)
    })
    SettingStore.bcjzList.forEach((item) => {
      item.isSelect = '未勾选'
    })

    console.log('111', SettingStore.bcjzList)
    dialogVisible1.value = true
  }
  const show = (item = {}) => {
    console.log('1111', item)
    console.log('1112', item.cjrname)
    title.value = '分配采集员'
    if (item.cjrname) {
      console.log('2222')
      //调用接口查询采集员信息
      title.value = '编辑采集员'
      let xcrwUser1 = ref({
        cjrname: item.cjrname,
        shrName: item.shrName,
        status: item.status,
        jzsl: item.jzsl,
        photo: item.photo,
        describe: item.describe,
        createTime: item.createTime,
        jzList: item.jzList,
      })
      SettingStore.setXcrwUser(xcrwUser1.value)
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
        console.log('222', ruleForm.value)
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        let rwList = {
          cjrname: '',
          shrName: '',
          status: true,
          jzsl: 0,
          photo: '',
          describe: '',
          createTime: '',
          jzList: [],
        }
        rwList.cjrname = ruleForm.value.cjrname
        rwList.shrName = ruleForm.value.shrName
        rwList.jzsl = ruleForm.value.jzList?.length
        rwList.createTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        rwList.describe = ruleForm.value.describe
        rwList.status = ruleForm.value.status
        rwList.jzList = ruleForm.value.jzList
        console.log('确定', rwList)
        const ids = SettingStore.xcrw.rwList.map((item) => item.cjrname)
        const exists = ids.includes(ruleForm.value.cjrname)
        if (exists) {
          //如果存在 怎么修改
          SettingStore.xcrw.rwList.forEach((item) => {
            if (item.cjrname === ruleForm.value.cjrname) {
              item.cjrname = ruleForm.value.cjrname
              item.shrName = ruleForm.value.shrName
              item.jzsl = ruleForm.value.jzList?.length
              item.createTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
              item.describe = ruleForm.value.describe
              item.status = ruleForm.value.status
            }
          })
        } else {
          SettingStore.xcrw.rwList.push(rwList)
        }
        console.log('列表', SettingStore.xcrw.rwList)

        // SettingStore.xcrw.rwList.push({
        //   cjrname: ruleForm.cjrname,
        //   shrName: ruleForm.shrName,
        //   jzsl: SettingStore.xcjzList.length,
        //   createTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        //   describe: ruleForm.describe,
        //   status: ruleForm.status,
        //   rwList: ruleForm.jzList,
        // })
        //清空xcrwUser

        dialogVisible.value = false
        //console.log('submit!', ruleForm)
      } else {
        // console.log('error submit!', fields)
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
