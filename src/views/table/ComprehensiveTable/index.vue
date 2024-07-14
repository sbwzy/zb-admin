<template>
  <div ref="appContainer" class="app-container">
    <PropTable
      :loading="loading"
      :data="list"
      :filterss="dynamicFilters"
      :filters="filters"
      :list-type="entryType"
      @selection-change="selectionChange"
      @reset="reset"
      @delete="deleteAction"
      @select="selectAction"
      @selectAll="selectAllAction"
      @on-submit="onSubmit"
      @selectsearch="selectSearch"
    >
    </PropTable>
  </div>
</template>
<script lang="ts" setup name="comprehensive">
  import { ref, reactive, onMounted, nextTick, computed } from 'vue'
  import * as dayjs from 'dayjs'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import PropTable from '@/components/Table/PropTable/index.vue'
  import { useRoute } from 'vue-router'
  import { useSettingStore } from '@/store/modules/setting'
  const SettingStore = useSettingStore()
  const loading = ref(true)
  const appContainer = ref(null)
  let selList = [] //选择的id列表
  const route = useRoute()
  const UseSettingStore = useSettingStore()
  // const sId = route.params.id as string
  const entryType = 'newxcrw'
  const emit = defineEmits(['selectAlls'])
  const filters = ref({
    district: null,
    buildType: ['优秀历史建筑', '花园住宅'], //房屋类型
    isSelect: ['未勾选'], //巡查任务条件
  })

  const list = computed(() => {
    return SettingStore.bcjzList
  })

  const dynamicFilters = computed(() => {
    return entryType == 'newxcrw' ? SettingStore.dynamicFilters1 : SettingStore.dynamicFilters1
  })
  let props = defineProps({
    parentTypeMethod: {
      type: Function,
      default: () => {},
    },
  })
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    //sex: null,
    //: null,
  })
  let ruleForm1 = {}
  const rules = reactive({
    name: [
      { required: true, message: '请输入活动名称活动区域', trigger: 'blur' },
      { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' },
    ],
    //price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    // sex: [
    //   {
    //     required: true,
    //     message: '请选择性别',
    //     trigger: 'change',
    //   },
    // ],
  })

  const dialogVisible = ref(false)
  const title = ref('新增')
  const rowObj = ref({})
  const selectObj = ref([])

  const batchDelete = () => {
    if (!selectObj.value.length) {
      return ElMessage.error('未选中任何行')
    }
    ElMessageBox.confirm('你确定要删除选中项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        ElMessage.success('模拟删除成功')
        //list = list.value.concat([])
      })
      .catch(() => {})
  }
  const selectionChange = (val) => {
    selectObj.value = val
  }
  //按钮触发 选择全部
  const selectAllAction = () => {
    //ruleForm1 = UseSettingStore.xcrw
    //将列表中的未勾选的id 赋值到xcrwUser.jzList中
    const ids = SettingStore.xcrwUser.jzList
    console.log('ids', ids)
    list.value.forEach((item) => {
      if (item.isSelect == '未勾选') {
        console.log('1111', item)
        if (!ids.includes(item.id)) {
          console.log('不包含')
          UseSettingStore.xcrwUser.jzList.push(item.id)
          //如果搜索条件包含了已勾选
          if (
            (UseSettingStore.search.isSelect.length != 0 && UseSettingStore.search.isSelect.includes('已勾选')) ||
            UseSettingStore.search.isSelect.length == 0
          ) {
            console.log('搜索条件', UseSettingStore.search.isSelect)
            UseSettingStore.bcjzList.forEach((item1) => {
              if (item.id == item1.id) {
                item1.isSelect = '已勾选'
              }
            })
          } else {
            //不包含已勾选直接剔除
            let bcjzList = UseSettingStore.bcjzList.filter((item1) => {
              return item.id != item1.id
            })
            UseSettingStore.setBcjzList(bcjzList)
          }
        } else {
          console.log('包含')
        }
      }
    })
    console.log(UseSettingStore.xcrwUser)
    emit('selectAlls')
  }

  const edit = (row) => {
    title.value = '编辑'
    rowObj.value = row
    dialogVisible.value = true
    ruleForm.name = row.name
    //ruleForm.sex = row.sex
    //ruleForm.price = row.price
  }

  const del = (row) => {
    console.log('row==', row)
    ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        //list.value = list.value.filter((item) => item.id !== row.id)
        ElMessage.success('删除成功')
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 500)
      })
      .catch(() => {})
  }

  const reset = () => {
    //重置是 查看未勾选列表
    loading.value = true
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
      // if (xcOwnerHasList.includes(item.id)) {
      //   item.isSelect = '已勾选'
      // } else {
      item.isSelect = '未勾选'
      //}
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
    ElMessage.success('刷新成功')
  }
  //删除该记录
  const deleteAction = (va1, va2) => {
    //调用接口修改数据

    //在接口修改数据成功后，删除该条数据
    //调用接口修改数据
    const ids = SettingStore.xcrwUser.jzList
    console.log('ids', ids)
    if (va2.isSelect == '已勾选') {
      console.log('1111', va2)
      if (ids.includes(va2.id)) {
        console.log('包含')
        UseSettingStore.xcrwUser.jzList.filter((item) => item.id !== va2.id)
        console.log(UseSettingStore.xcrwUser)
        //.push(va2.id)
        //如果搜索条件包含了未勾选
        if (
          (UseSettingStore.search.isSelect.length != 0 && UseSettingStore.search.isSelect.includes('未勾选')) ||
          UseSettingStore.search.isSelect.length == 0
        ) {
          console.log('搜索条件', UseSettingStore.search.isSelect)
          UseSettingStore.bcjzList.forEach((item1) => {
            if (va2.id == item1.id) {
              item1.isSelect = '未勾选'
            }
          })
        } else {
          //不包含 未勾选直接剔除
          let bcjzList = UseSettingStore.bcjzList.filter((item1) => {
            return va2.id != item1.id
          })
          UseSettingStore.setBcjzList(bcjzList)
        }
      } else {
        console.log('不包含')
      }
    }
    console.log(UseSettingStore.xcrwUser)
    //在接口修改数据成功后，删除该条数据
    // let selList = list.value.filter((item) => item.id !== va2.id)
    // SettingStore.setXcjzList(selList)
  }

  const selectAction = (va1, va2) => {
    //调用接口修改数据
    const ids = SettingStore.xcrwUser.jzList
    console.log('ids', ids)
    if (va2.isSelect == '未勾选') {
      console.log('1111', va2)
      if (!ids.includes(va2.id)) {
        console.log('不包含')
        UseSettingStore.xcrwUser.jzList.push(va2.id)
        //如果搜索条件包含了已勾选
        if (
          (UseSettingStore.search.isSelect.length != 0 && UseSettingStore.search.isSelect.includes('已勾选')) ||
          UseSettingStore.search.isSelect.length == 0
        ) {
          console.log('搜索条件', UseSettingStore.search.isSelect)
          UseSettingStore.bcjzList.forEach((item1) => {
            if (va2.id == item1.id) {
              item1.isSelect = '已勾选'
            }
          })
        } else {
          //不包含已勾选直接剔除
          let bcjzList = UseSettingStore.bcjzList.filter((item1) => {
            return va2.id != item1.id
          })
          UseSettingStore.setBcjzList(bcjzList)
        }
      } else {
        console.log('包含')
      }
    }
    console.log(UseSettingStore.xcrwUser)
    //在接口修改数据成功后，删除该条数据
    let selList = list.value.filter((item) => item.id !== va2.id)
    SettingStore.setXcjzList(selList)
  }

  const onSubmit = (val) => {
    console.log('val===', val)
    ElMessage.success('触发查询方法')
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  //搜索条件赋值
  const selectSearch = (val) => {
    console.log('val====', val)
  }

  onMounted(() => {
    //加载数据
    // selList = UseSettingStore.selJZList
    // if (selList.length != 0) {
    //   console.log('进来了')
    //   console.log(selList)
    //   console.log(list.value)
    //   list.value.forEach((item) => {
    //     if (selList.indexOf(item.id) != -1) {
    //       //store里面存在已保存的id，则xiu
    //       item.isSelect = '已勾选'
    //     } else {
    //       item.isSelect = '未勾选'
    //     }
    //   })
    // }
  })
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .app-container {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
