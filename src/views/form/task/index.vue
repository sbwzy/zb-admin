<template>
  <div class="app-container">
    <el-segmented v-model="initvalue" :options="cjZt" @change="changeValue"> </el-segmented>
    <filterView
      :filterss="dynamicFilters"
      :filters="filters"
      :allSelect="false"
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
  import { MoreFilled } from '@element-plus/icons-vue'
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
  const initvalue = ref('待检查')
  const cjZt = computed(() => {
    return SettingStore.cjZt
  })

  const filters = computed(() => {
    return SettingStore.search
  })

  const dataList = computed(() => {
    if (initvalue.value == '待检查') {
      return SettingStore.wcjJzList
    } else if (initvalue.value == '自查无异常') {
      return SettingStore.cjzJzList
    } else if (initvalue.value == '待审核') {
      return SettingStore.dshJzList
    } else if (initvalue.value == '待复核') {
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
            xiaoQu: '福世花园', //小区名称
            //jieZhen: '江苏路街道', // 街镇应该也不需要
            zjZt: '待检查', //自查状态
            shouQuanDZ: '安化路201弄4号', //授权地址
            fwyt: '超市', //房屋业态 (幢)
            fangWuYTOld: '非居住办公用房', //房屋用途 是户 不显示
            xsqk: '修缮中', //修缮情况
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
              id: 2252, //建筑编号
              MPZId: '100091082', //门牌幢编号
              locY: '31.2426820469793', //房屋新位置经度
              locX: '121.460209310194', //房屋新位置纬度
              XQMC: '南京东路街道新桥1小区', //建筑名称  小区名称
              XQDZ: '南苏州路1305-1307号', //授权地址  小区地址
              FWLX: '仓库堆栈', //授权房屋类型
              ZRZMS: '', //自然幢描述
              CZMP: '是', //是否存在铭牌
              ZSQK: '否', //是否在征收地块
              MPNR: '仓库建筑。1933年建，砖木结构。装饰艺术派风格。清水砖墙。立面檐口、窗台、窗楣及壁柱有灰色水泥几何形压花装饰，中部成“山”字形，突出主入口。1998年台湾设计师登昆艳用作工作室，开创上海近代工业建筑保护利用的实践。', //保护铭牌内容
              GALP: '南苏州路1305号', //公安绿牌地址
              DKQK: '', //现场带看情况
              XGALP: '南苏州路1305号', //当前公安绿牌地址
              XFWLX: '仓库堆栈', //当前房屋类型
              PHSY: '', //破坏使用类型
              PHQK: '', //破坏情况说明
              PHQKPHOTOS: [], //破坏情况照片
              DJWJ: '', //是否搭建违建
              DJWJSL: '', //搭建违建数量
              DJWJSM: '', //搭建违建说明
              DJWJPHOTOS: [], //搭建违建照片
              WGCH: '', //是否违规拆除
              WGCHLX: '', //违规拆除类型
              WGCHSM: '', //违规拆除说明
              WGCHPHOTOS: [], //违规拆除照片
              SHQK: '', //损坏情况
              SHSM: '', //损坏情况说明
              SHPHOTOS: [], //损坏照片
              ZSFH: '否', //征收复核
              ZSFHSM: '', //征收复核说明
              XSQK: '', //修缮情况
              XSQKSM: '', //修缮情况说明
              XSQKPHOTOS: [], //修缮照片
              ResidentList: [
                {
                  MPZId: '100091082', //门牌幢编号
                  DYHID: 'A01', //户编号
                  SH: '01', //室号
                  CB: '', //产编
                  KZZT: false, //是否空置
                  KZSM: '', //空置说明
                  FWYT: '非居生产', //房屋用途
                  XFWLX: '', //当前房屋用途
                  FWYTPHOTOS: [], //房屋用途现状照片
                },
              ],
            },
            lsxcjl: [
              { ZT: '24年度7月份该建筑开始采集', TIME: '2024-8-1 13:30', xcrwId: 'XCRW02', Id: '2252', icon: MoreFilled, type: 'success' },
              {
                ZT: '24年度7月份该建筑提交异常信息',
                TIME: '2024-8-1 13:46',
                xcrwId: 'XCRW02',
                Id: '2252',
                color: '#0bbd87',
                type: 'primay',
              },
              { ZT: '24年度7月份该建筑由xxx(物业经理)审核完成', TIME: '2024-8-2 11:46', xcrwId: 'XCRW02', Id: '2252', hollow: true },
            ], //历史采集记录
            phoneTypeList: [
              {
                title: '建筑名称标识',
                name: 'jianZhumcbs',
                icon: 'Picture',
                imglists: [
                  {
                    imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Deer',
                    imgID: 31418,
                  },
                  {
                    imgUrl: ' https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Horse',
                    imgID: 31418,
                  },
                ],
                tooltip: '指建筑物具体名称，如xx小区、xx学校等<br/>，若无标志，拍摄建筑物大门即可',
                //等等其他属性
              },
              {
                title: '公安绿牌',
                name: 'gongAnLP',
                icon: 'Picture',
                imglists: [
                  {
                    imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Mountain Lion',
                    imgID: 31418,
                    //等等属性
                  },
                  // 更多图片...
                ],
                tooltip: '',
                isShowToolTip: false,
                // 其他属性...
              },
              {
                title: '外立面',
                name: 'waiLiM',
                icon: 'Picture',
                imglists: [
                  {
                    imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Deer',
                  },
                  {
                    imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Horse',
                  },
                  {
                    imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
                    name: 'Mountain Lion',
                  },
                  // 更多图片...
                ],
                tooltip: '',
                isShowToolTip: false,
                // 其他属性...
              },
              {
                title: '铭牌',
                name: 'mingPai',
                icon: 'Picture',
                imglists: [
                  { imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC' },
                  // 更多图片...
                ],
                tooltip: '',
                isShowToolTip: false,
                // 其他属性...
              },
              {
                title: '产业状态',
                name: 'chanYeZT',
                icon: 'Picture',
                imglists: [
                  { imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC' },
                  // 更多图片...
                ],
                tooltip: '',
                isShowToolTip: false,
                // 其他属性...
              },
              // 更多标签页数据...
            ],
          }
          SettingStore.setOptionSetting(gfCJXQ)
          setTimeout(async () => {
            router.push('/form/collection')
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
