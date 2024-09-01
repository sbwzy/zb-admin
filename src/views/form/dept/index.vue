<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <filterView
        :filterss="dynamicFilters"
        :filters="filters"
        :allSelect="dataList[0]?.cjZt == '采集中' ? true : false"
        :listtype="listType"
        :parent-type-method="filterMethod"
      >
      </filterView>
    </div>
    <div v-if="UserStore.sfRole.includes('管理员')">
      <el-button style="float: right" type="primary" @click="addHandler">
        <el-icon>
          <Plus />
        </el-icon>
        新增巡查
      </el-button>
    </div>
    <div>
      <spListView :bz-list="dataList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
    </div>
    <!--分页列表-->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        :page-size="10"
        small
        background
        layout="total,sizes,prev, pager,next"
        :total="dataList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, FormInstance } from 'element-plus'
  //import { Search } from '@element-plus/icons-vue'
  import { onMounted, reactive, ref, computed } from 'vue'
  //import { deptData } from '@/mock/system'
  //import DeptDialog from './components/deptDialog.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { useRouter, useRoute } from 'vue-router'

  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { buildListinfo, xcrwXQ } from '@/api/user'

  //import { useTagsViewStore } from '@/store/modules/tagsView'
  //const tableData = ref(deptData)
  //const loading = ref(true)
  const deptDialog = ref()
  //const ruleFormRef = ref<FormInstance>()
  const formInline = reactive({})
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  //const TagsViewStore = useTagsViewStore()
  const route = useRoute()
  //const visitedViews = computed(() => TagsViewStore.visitedViews)
  onMounted(() => {
    // console.log("赋值")
    // let xcList = SettingStore.xcList
    // SettingStore.setXcssList(xcList)
  })
  const router = useRouter()
  //当前页面类型
  const listType = 'xcrw'

  const filters = computed(() => {
    return SettingStore.search
  })

  const dynamicFilters = SettingStore.xcrwFilters

  const pagination = computed(() => {
    return SettingStore.xcpagination
  })

  const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val
  }
  const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val
  }

  //当前角色的 可查看的 巡查任务列表
  const dataList = computed(() => {
    return SettingStore.xcssList
  })

  const addHandler = () => {
    let xcrw = {
      id: '',
      name: '',
      //region: '',
      date1: '',
      date2: '',
      status: false,
      // delivery: false,
      resource: '',
      desc: '',
      clubType: '',
      rwList: [],
    }
    SettingStore.setXcrw(xcrw)
    //SettingStore.setXcrwId(null)
    setTimeout(async () => {
      //进入建筑列表页面
      router.push({
        path: '/form/validateForm',
      })
    }, 500)
  }

  //点击事件 巡查任务详情
  const filterMethod = (e1, e2) => {
    console.log('回传的列表', e1, e2)
    //如果是超级管理员 可以对巡查任务进行编辑
    if (e2 == '编辑') {
      //查看 巡查任务的详情
      //调用接口赋值巡查任务内容
      xcrwXQ(e1.id).then((res) => {
        if (res.data.result == -1) {
          let xcrw = {
            id: e1.id,
            name: '2024年9月巡查任务',
            //region: '',
            date1: '2024-09-01',
            date2: '2024-09-30',
            delivery: '未开始',
            resource: '',
            desc: '物业中心巡查常规任务',
            clubType: '',
            rwList: [
              {
                cjrname: '用户2',
                shrName: '用户3',
                status: true,
                jzsl: 3,
                photo: '15333333333',
                describe: '该采集员已负责xx1、xx2等街区',
                createTime: '2022-09-02 15:30:20',
                jzList: [1, 2, 3],
              },
              {
                cjrname: '用户1',
                shrName: '用户3',
                status: true,
                jzsl: 3,
                photo: '15311111111',
                describe: '该采集员已负责xx3、xx4等街区',
                createTime: '2022-09-02 15:30:20',
                jzList: [11, 21, 31],
              },
              {
                cjrname: '用户3',
                shrName: '用户4',
                jzsl: 3,
                status: true,
                photo: '13823456789',
                describe: '该采集员已负责xx5、xx6等街区',
                createTime: '2022-09-02 15:30:20',
                jzList: [12, 22, 32],
              },
              // {
              //   cjrname: '用户4',
              //   shrName: '用户4',
              //   status: false,
              //   photo: '13923456789',
              //   describe: '该采集员目前非启用状态',
              //   createTime: '2022-09-02 15:30:20',
              // }
            ],
          }
          SettingStore.setXcrw(xcrw)
          setTimeout(async () => {
            //进入建筑列表页面
            router.push({
              path: '/form/validateForm',
            })
          }, 500)
        }
      })
    } else if (e2 == '详情') {
      SettingStore.setXcrwId = e1.id
      //调用接口 获取该巡查任务下的建筑任务列表
      //未采集列表 、采集中列表、待审核列表、审核驳回列表、审核通过列表
      buildListinfo(e1.id, UserStore.userInfo.ssbm).then((res) => {
        console.log(res)
        if (res.data.result == -11) {
          //赋值五个列表的值
          let wcjJzList = []
          let cjzJzList = []
          let dshJzList = []
          let shbhJzList = []
          let shtgJzList = []
          SettingStore.jzList.forEach((item) => {
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
          SettingStore.setWcjJzList(wcjJzList)
          SettingStore.setCjzJzList(cjzJzList)
          SettingStore.setDshJzList(dshJzList)
          SettingStore.setShbhJzList(shbhJzList)
          SettingStore.setShtgJzList(shtgJzList)
          setTimeout(async () => {
            //进入建筑列表页面
            router.push({
              path: '/form/task',
            })
          }, 500)
        }
      })
    } else if (e2 == '模糊查询' || e2 == '查询') {
      e1.listType = listType
      e1.searchType = e2
      let searchList = []
      if (e1.rwName != '' && e2 == '模糊查询') {
        SettingStore.xcList.forEach((item) => {
          for (let key in item) {
            if (item.hasOwnProperty(key) && String(item[key]).includes(e1.rwName)) {
              searchList.push(item)
              break
            }
          }
          SettingStore.setXcssList(searchList)
          // if(item.renwuName.includes(e2.xcrwName) && e2.collectionStatus.includes(item.type)){
          // }
        })
      } else if (e1.rwName == '' && e2 == '模糊查询') {
        SettingStore.setXcssList(SettingStore.xcList)
      } else if (e2 == '查询') {
        SettingStore.xcList.forEach((item) => {
          console.log(item.renwuName.includes(e1.xcrwName))
          // 任务名称是否包含
          if (item.renwuName.includes(e1.xcrwName)) {
            console.log('1')
            //巡查类型是否为空
            if (e1.collectionStatus1.length == 0) {
              console.log('11')
              // 创建单位是否为空
              if (e1.dwType.length == 0) {
                console.log('111')
                searchList.push(item)
              } else {
                console.log('110')
                // 创建单位不为空
                if (e1.dwType.includes(item.cjdw)) {
                  console.log('1101')
                  searchList.push(item)
                }
              }
            } else {
              console.log('10')
              //巡查类型不为空
              if (e1.collectionStatus1.includes(item.type)) {
                console.log('101')
                // 创建单位是否为空
                if (e1.dwType.length == 0) {
                  console.log('1011')
                  searchList.push(item)
                } else {
                  console.log('1010')
                  // 创建单位不为空
                  if (e1.dwType.includes(item.cjdw)) {
                    console.log('10101')
                    searchList.push(item)
                  }
                }
              }
            }
          }
        })
        console.log(searchList)
        SettingStore.setXcssList(searchList)
      }
    } else if (e2 == '重置' || e2 == '模糊重置') {
      // 将响应式对象置空
      Object.keys(filters.value).forEach((key) => {
        ;(filters.value[key] = ''), (filters.value['collectionStatus'] = '采集中'), (filters.value['streetType'] = '未分配')
      })
      SettingStore.setSearch(filters.value)
      SettingStore.setXcssList(SettingStore.xcList)
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    height: auto;
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .pagination {
    background-color: aliceblue;
    //opacity: 1	;
    left: 0;
    /* 左对齐 */
    right: 0;
    /* 右对齐，保证水平居中 */
    width: 100%;
    position: fixed;
    bottom: 0px;
    /* 固定在底部 */
    display: flex;
    justify-content: center;
    padding-top: 0px;
    box-sizing: border-box;
  }
  // @import './index';
</style>
