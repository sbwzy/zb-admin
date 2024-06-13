<template>
  <div ref="appContainer" class="app-container">
    <PropTable
      :id="sId"
      :loading="loading"
      :data="list"
      :filters="dynamicFilters"
      :list-type="entryType"
      @selection-change="selectionChange"
      @reset="reset"
      @on-submit="onSubmit"
      @selectsearch="selectSearch"
    >
    </PropTable>
  </div>
</template>
<script lang="ts" setup name="comprehensive">
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import * as dayjs from 'dayjs'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import PropTable from '@/components/Table/PropTable/index.vue'
  import { useRoute } from 'vue-router'
  const loading = ref(true)
  const appContainer = ref(null)
  const data = []
  const route = useRoute()

  const sId = route.params.id as string
  const entryType = route.params.type as string
  for (let i = 0; i < 30; i++) {
    data.push({
      id: i + 1,
      qu: '长宁区',
      xiaoQu: '福世花园',
      jieZhen: '江苏路街道',
      shouQuanDZ: '安化路200弄' + i + '号',
      standardType: '花园住宅',
      fangWuYTOld: '非居住办公用房11',
      notemsg: '00004',
      workPerson: '张' + i,
      isSelect: '未勾选',
    })
  }
  const dynamicFilters1 = ref([
    // {
    //   label: '采集状态',
    //   key: 'collectionStatus',
    //   type: 'select',
    //   placeholder: '请选择采集状态',
    //   options: [
    //     { label: '未采集', value: '未采集' },
    //     { label: '采集中', value: '采集中' },
    //     { label: '待审核', value: '待审核' },
    //     { label: '已审核', value: '已审核' },
    //   ],
    // },
    {
      label: '分配情况',
      key: 'streetType',
      type: 'radio',
      options: [
        { label: '未分配', value: '未分配' },
        { label: '已分配', value: '已分配' },
      ],
    },
    {
      label: '区域/小区',
      key: 'district',
      type: 'duoxuan',
      placeholder: '请选择',
      options: [
        {
          value: '徐汇',
          label: '徐汇',
          children: [
            {
              value: '天平路',
              label: '天平路',
              children: [
                {
                  value: '上海新村直管公房',
                  label: '上海新村直管公房',
                },
                {
                  value: '京剧院小区',
                  label: '京剧院小区',
                },
                {
                  value: '伊丽莎白公寓',
                  label: '伊丽莎白公寓',
                },
                {
                  value: '余庆直管公房',
                  label: '余庆直管公房',
                },
                {
                  value: '吴兴直管公房',
                  label: '吴兴直管公房',
                },
              ],
            },
            {
              value: '徐家汇',
              label: '徐家汇',
              children: [
                {
                  value: '徐家汇街道淮海西路345弄小区',
                  label: '徐家汇街道淮海西路345弄小区',
                },
                {
                  value: '漕北高层',
                  label: '漕北高层',
                },
              ],
            },
            {
              value: '枫林路',
              label: '枫林路',
              children: [
                {
                  value: '天钥新村',
                  label: '天钥新村',
                },
                {
                  value: '谨斜小区',
                  label: '谨斜小区',
                },
              ],
            },
            {
              value: '湖南路',
              label: '湖南路',
              children: [
                {
                  value: '东湖直管公房',
                  label: '东湖直管公房',
                },
                {
                  value: '中兴小区',
                  label: '中兴小区',
                },
                {
                  value: '中南小区',
                  label: '中南小区',
                },
              ],
            },
          ],
        },
        {
          value: '普陀',
          label: '普陀',
          children: [
            {
              value: '曹杨新村',
              label: '曹杨新村',
              children: [
                {
                  value: '曹杨一村（源园）',
                  label: '曹杨一村（源园）',
                },
              ],
            },
            {
              value: '长寿路',
              label: '长寿路',
              children: [
                {
                  value: '长寿路街道康宁小区',
                  label: '长寿路街道康宁小区',
                },
                {
                  value: '长寿路街道澳门路660弄小区',
                  label: '长寿路街道澳门路660弄小区',
                },
              ],
            },
          ],
        },
        {
          value: '杨浦',
          label: '杨浦',
          children: [
            {
              value: '五角场',
              label: '五角场',
              children: [
                {
                  value: '长海路街道国京41号小区',
                  label: '长海路街道国京41号小区',
                },
                {
                  value: '长海路街道市光路三十六宅 (东块）小区',
                  label: '长海路街道市光路三十六宅 (东块）小区',
                },
              ],
            },
            {
              value: '大桥',
              label: '大桥',
              children: [
                {
                  value: '平青小区',
                  label: '平青小区',
                },
              ],
            },
            {
              value: '定海路',
              label: '定海路',
              children: [
                {
                  value: '130街坊 贵阳路、海州路、凉州路',
                  label: '130街坊 贵阳路、海州路、凉州路',
                },
                {
                  value: '定海街道137街坊048小区',
                  label: '定海街道137街坊048小区',
                },
              ],
            },
            {
              value: '平凉路',
              label: '平凉路',
              children: [
                {
                  value: '隆昌路331号、355弄',
                  label: '隆昌路331号、355弄',
                },
                {
                  value: '41街坊龙江路',
                  label: '41街坊龙江路',
                },
              ],
            },
          ],
        },
      ],
    },
  ])
  const dynamicFilters2 = ref([
    {
      label: '区域/小区',
      key: 'district',
      type: 'duoxuan',
      placeholder: '请选择',
      options: [
        {
          value: '徐汇',
          label: '徐汇',
          children: [
            {
              value: '天平路',
              label: '天平路',
              children: [
                {
                  value: '上海新村直管公房',
                  label: '上海新村直管公房',
                },
                {
                  value: '京剧院小区',
                  label: '京剧院小区',
                },
                {
                  value: '伊丽莎白公寓',
                  label: '伊丽莎白公寓',
                },
                {
                  value: '余庆直管公房',
                  label: '余庆直管公房',
                },
                {
                  value: '吴兴直管公房',
                  label: '吴兴直管公房',
                },
              ],
            },
            {
              value: '徐家汇',
              label: '徐家汇',
              children: [
                {
                  value: '徐家汇街道淮海西路345弄小区',
                  label: '徐家汇街道淮海西路345弄小区',
                },
                {
                  value: '漕北高层',
                  label: '漕北高层',
                },
              ],
            },
            {
              value: '枫林路',
              label: '枫林路',
              children: [
                {
                  value: '天钥新村',
                  label: '天钥新村',
                },
                {
                  value: '谨斜小区',
                  label: '谨斜小区',
                },
              ],
            },
            {
              value: '湖南路',
              label: '湖南路',
              children: [
                {
                  value: '东湖直管公房',
                  label: '东湖直管公房',
                },
                {
                  value: '中兴小区',
                  label: '中兴小区',
                },
                {
                  value: '中南小区',
                  label: '中南小区',
                },
              ],
            },
          ],
        },
        {
          value: '普陀',
          label: '普陀',
          children: [
            {
              value: '曹杨新村',
              label: '曹杨新村',
              children: [
                {
                  value: '曹杨一村（源园）',
                  label: '曹杨一村（源园）',
                },
              ],
            },
            {
              value: '长寿路',
              label: '长寿路',
              children: [
                {
                  value: '长寿路街道康宁小区',
                  label: '长寿路街道康宁小区',
                },
                {
                  value: '长寿路街道澳门路660弄小区',
                  label: '长寿路街道澳门路660弄小区',
                },
              ],
            },
          ],
        },
        {
          value: '杨浦',
          label: '杨浦',
          children: [
            {
              value: '五角场',
              label: '五角场',
              children: [
                {
                  value: '长海路街道国京41号小区',
                  label: '长海路街道国京41号小区',
                },
                {
                  value: '长海路街道市光路三十六宅 (东块）小区',
                  label: '长海路街道市光路三十六宅 (东块）小区',
                },
              ],
            },
            {
              value: '大桥',
              label: '大桥',
              children: [
                {
                  value: '平青小区',
                  label: '平青小区',
                },
              ],
            },
            {
              value: '定海路',
              label: '定海路',
              children: [
                {
                  value: '130街坊 贵阳路、海州路、凉州路',
                  label: '130街坊 贵阳路、海州路、凉州路',
                },
                {
                  value: '定海街道137街坊048小区',
                  label: '定海街道137街坊048小区',
                },
              ],
            },
            {
              value: '平凉路',
              label: '平凉路',
              children: [
                {
                  value: '隆昌路331号、355弄',
                  label: '隆昌路331号、355弄',
                },
                {
                  value: '41街坊龙江路',
                  label: '41街坊龙江路',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: '房屋类型',
      key: 'buildType',
      type: 'checkbox',
      placeholder: '房屋类型可选',
      options: [
        { label: '花园住宅', value: '花园住宅' },
        { label: '优秀历史建筑', value: '优秀历史建筑' },
        //...
      ],
    },
    {
      label: '是否勾选',
      key: 'isSelect',
      type: 'checkbox',
      placeholder: '房屋类型可选',
      options: [
        { label: '已勾选', value: '已勾选' },
        { label: '未勾选', value: '未勾选' },
        //...
      ],
    },
  ])
  const dynamicFilters = entryType == 'newxcrw' ? dynamicFilters2.value : dynamicFilters1.value
  const list = ref(data)

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    sex: null,
    price: null,
  })

  const rules = reactive({
    name: [
      { required: true, message: '请输入活动名称活动区域', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ],
  })

  const dialogVisible = ref(false)
  const title = ref('新增')
  const rowObj = ref({})
  const selectObj = ref([])

  const handleClose = async () => {
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        let obj = {
          id: Date.now(),
          ...ruleForm,
          age: 0,
          city: '普陀区',
          address: '上海市普上海',
          zip: 200333,
          province: '上海',
          admin: 'admin',
          date: dayjs().format('YYYY-MM-DD'),
        }
        if (title.value === '新增') {
          list.value = [obj, ...list.value]
          ElMessage.success('添加成功')
        } else {
          list.value.forEach((item) => {
            if (item.id === rowObj.value.id) {
              item.name = obj.name
              item.sex = obj.sex
              item.price = obj.price
            }
          })
        }
        dialogVisible.value = false
        console.log('submit!', obj)
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const add = () => {
    title.value = '新增'
    dialogVisible.value = true
  }

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
        list.value = list.value.concat([])
      })
      .catch(() => {})
  }
  const selectionChange = (val) => {
    selectObj.value = val
  }

  const edit = (row) => {
    title.value = '编辑'
    rowObj.value = row
    dialogVisible.value = true
    ruleForm.name = row.name
    ruleForm.sex = row.sex
    ruleForm.price = row.price
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
        list.value = list.value.filter((item) => item.id !== row.id)
        ElMessage.success('删除成功')
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 500)
      })
      .catch(() => {})
  }

  const reset = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
    ElMessage.success('触发重置方法')
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
    nextTick(() => {
      // let data = appContainer.value.
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
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
