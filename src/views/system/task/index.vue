<template>
  <div class="app-container">
    <el-segmented v-model="initvalue" :options="cjZt" block @change="changeValue">
      <!-- <template #default="{ item }">
        <div class="flex flex-col items-center gap-2 p-2">
          {{item}}·{{datacurrList.length}}
        </div>
      </template> -->
    </el-segmented>
    <filterView
      :filterss="dynamicFilters"
      :filters="filters"
      :allSelect="initvalue == '采集中' ? true : false"
      :listtype="listType"
      :parent-type-method="filterMethod"
    ></filterView>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="datacurrList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
    </div>
    <!--分页列表-->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        :page-size="10"
        small
        background
        layout="total,sizes,prev, pager,next"
        :total="datacurrList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { buildListinfo } from '@/api/user'
  import { onMounted, reactive, computed, ref, onBeforeMount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  //
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { da } from 'element-plus/es/locale'

  import { buildOperation } from '@/api/user'
  import { getYouliList, youliCJXQGet } from '@/api/user'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  //import { useTagsViewStore } from '@/store/modules/tagsView'

  //const TagsViewStore = useTagsViewStore()
  // const visitedViews = computed(() => TagsViewStore.visitedViews)

  const router = useRouter()
  // const route = useRoute()
  // const xcId = route.query.xcId as string
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  const listType = 'build'
  const xcId = computed(() => {
    return SettingStore.xcrwId
  })
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项）
  const dynamicFilters = SettingStore.dynamicFilters

  //根据当前用户身份设置初始分段  初始这样设计
  const initvalue = ref(UserStore.sfRole.includes('审核员') ? '待审核' : '未采集')
  const cjZt = computed(() => {
    return SettingStore.cjZt
  })

  const filters = computed(() => {
    return SettingStore.search
  })

  const dataList = computed(() => {
    if (initvalue.value == '未采集') {
      return SettingStore.wcjJzList
    } else if (initvalue.value == '采集中') {
      return SettingStore.cjzJzList
    } else if (initvalue.value == '待审核') {
      return SettingStore.dshJzList
    } else if (initvalue.value == '审核驳回') {
      return SettingStore.shbhJzList
    } else {
      return SettingStore.shtgJzList
    }
  })

  const pagination = computed(() => {
    return SettingStore.pagination
  })

  const datacurrList = computed(() => {
    const startIndex = (pagination.value.currentPage - 1) * pagination.value.pageSize
    const endIndex = Math.min(pagination.value.currentPage * pagination.value.pageSize, dataList.value.length)
    console.log(startIndex, endIndex)
    //result = data;
    //slice 是 新建数组   splice 是修改原数组
    return dataList.value.slice(startIndex, endIndex)
  })
  onMounted(() => {})
  // onBeforeMount(() => {
  //   //splitData(dataList.value, pagination.value.pageSize, pagination.value.currentPage)
  // })

  const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val
  }
  const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val
  }
  const changeValue = (val) => {
    console.log('打印', val)
    initvalue.value = val
    pagination.value.pageSize = 10
    pagination.value.currentPage = 1
    //修改属性
  }
  //子组件方法 根据条件触发事件
  const filterMethod = (e1, e2) => {
    console.log('操作方法', e1, e2)

    if (e2 == '模糊查询' || e2 == '查询') {
      e1.listType = listType
      //将搜索类型赋值到条件里面 searchType
      e1.searchType = e2
      //查询 后搜索列表的接口
      getYouliList(e1).then((res) => {
        console.log(res)
        //接口目前没有做好
        if (res.data.result != 1) {
          // 默认修改数据
          dataList.value.push({
            xiaoQu: '福世花园',
            jieZhen: '江苏路街道',
            cjZt: '采集中',
            shouQuanDZ: '安化路201弄4号',
            standardType: '花园住宅',
            fangWuYTOld: '非居住办公用房',
            id: '00012',
          })
          SettingStore.setJzList(dataList.value)
          //目前有问题是因为接口没弄完
        } else {
          ElMessage({
            message: '搜索条件有误',
            type: 'error',
          })
          return
        }
      })
    } else if (e2 == '详情') {
      //进入详情页面
      youliCJXQGet(e1.id).then((res) => {
        if (res.data.result != 1) {
          //赋值一个数据
          let gfCJXQ = {
            caiJiXQ: {
              id: 1, //建筑编号
              buildingID: '1000847380', //公房编号
              qianDaoSJ: '', //签到时间
              qianDaoY: '', //签到位置经度
              qianDaoX: '', //签到位置纬度
              locYOld: '31.140229456677', //房屋原位置经度
              locXOld: '121.496543339861', //房屋原位置纬度
              locY: '31.1402311336331', //房屋新位置经度
              locX: '121.49651706216', //房屋新位置纬度
              descZuoBiao: '', //坐标备注
              standartName: '(4599)上钢物业零星小区（三林老街居委）', //建筑名称
              shouQuanDZ: '中林街131弄5号', //授权地址
              wyName: '周华', //物业联系人
              wyPhone: '13501739801', //物业联系电话
              standardType: '旧式里弄2', //房屋类型
              IndustrStatusOld: '测试状态', //原产业状态
              IndustrStatus: '测试状态', //当前产业状态
              fangWuYTOld: '居住用房', //原房屋用途
              fangWuYT: '居住用房', //当前房屋用途
              desc2: '测试现状', //建筑现状
              sfmpqs: '是', //现场是否有铭牌
              bhmpCont:
                '江南传统民居。砖木结构，中西合璧式。建筑平面对称布局，呈U字型，南侧院墙有仪门；青瓦硬山顶，东西两侧有观音兜式山墙，并外挑阳台，木梁上有斗拱木雕装饰。Traditional houses in the South of Yangtze River. Masonry-timber structure. Integration of Chinese and western style.', //保护铭牌内容
              shiYongROld: '测试使用人', //使用人
              shiYongR: '测试使用人', //使用人新
              dkdesc: '测试带看情况', //现场带看情况
              desc: '测试巡查情况', //外业巡查情况备注
              descShenHe: '测试审核意见', //审核意见
              standardState: '', //建筑状态
              xiaoquName: '', //小区名称
            },
            chanYeZT: [], //产业状态照片
            gongAnLP: [
              {
                desc: null,
                diZhi: '中林街131弄5号',
                fileName: 'image',
                imgID: 31418,
                picURL: '/wuyegl/webapi/youligf.picDown?imgID=53544255580C',
                thumbURL: '/wuyegl/webapi/youligf.picThumb?imgID=53544255580C',
                zhaopIdx: 0,
              },
            ], //公安绿牌照片
            jianZhumcbs: [
              {
                desc: null,
                diZhi: '',
                fileName: 'image',
                imgID: 31402,
                picURL: '/wuyegl/webapi/youligf.picDown?imgID=696E786E6836',
                thumbURL: '/wuyegl/webapi/youligf.picThumb?imgID=696E786E6836',
                zhaopIdx: 0,
              },
            ], //建筑名称标识照片
            mingPai: [
              {
                desc: null,
                diZhi: '',
                fileName: 'image',
                mplx: '优秀历史建筑铭牌',
                imgID: 31417,
                picURL: '/wuyegl/webapi/youligf.picDown?imgID=8E899F888AD1',
                thumbURL: '/wuyegl/webapi/youligf.picThumb?imgID=8E899F888AD1',
                zhaopIdx: 0,
              },
            ], //铭牌照片
            waiLiM: [
              {
                desc: '东',
                fileName: 'image',
                imgID: 31411,
                picURL: '/wuyegl/webapi/youligf.picDown?imgID=9394829591CC',
                thumbURL: '/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                wlmlx: '主立面',
                zhaopIdx: 0,
              },
              {
                desc: '',
                fileName: 'image',
                imgID: 31412,
                picURL: '/wuyegl/webapi/youligf.picDown?imgID=9295839493CD',
                thumbURL: '/wuyegl/webapi/youligf.picThumb?imgID=9295839493CD',
                wlmlx: '主立面',
                zhaopIdx: 0,
              },
            ], //外立面照片
          }
          SettingStore.setOptionSetting(gfCJXQ)
          setTimeout(async () => {
            router.push('/function-page/collection')
          }, 500)
        }
      })
    } else if (e2 == '重置' || e2 == '模糊重置') {
      // 将响应式对象置空
      Object.keys(filters.value).forEach((key) => {
        ;(filters.value[key] = ''), (filters.value['collectionStatus'] = '采集中'), (filters.value['streetType'] = '未分配')
      })
      SettingStore.setSearch(filters.value)
    } else {
      //e2 == '提交' || e2 == '全部提交' || e2 =='撤回'
      //触发接口 e0 id集合 e2 操作类型 e3 审批拒绝操作内容   e0 是接口数据不存在 测试使用
      let ids = []
      let stringids = ''

      if (e2 != '全部提交') {
        ids = [e1.id]
      } else {
        if (dataList.value.length != 0) {
          dataList.value.forEach((item) => {
            ids.push(item.id)
          })
        } else {
          ElMessage({
            message: '当前没有数据可以提交审批',
            type: 'warning',
          })
          return
        }
      }
      stringids = ids.join(',')
      buildOperation(stringids, e2, '审批驳回的意见').then((res) => {
        console.log(res)
        //接口目前没有做好
        if (res.data.result != 1) {
          ElMessage.success(res.data.msg)
          // if (e2 == '提交待审批') {
          //   ElMessage.success(res.data.msg)
          // } else if (e2 == '撤回') {
          //   ElMessage.success(res.data.msg)
          // }
          //目前接口没有做好 先做修改
          let list = ids
          //let list = res.data.succids.splice(',')
          let filteredArray = dataList.value.filter((item) => !list.includes(item.id))
          SettingStore.setJzList(filteredArray)
          //...
        } else {
          ElMessage({
            message: '数据出错,xxxxx',
            type: 'error',
          })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    height: 100%;
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
</style>
