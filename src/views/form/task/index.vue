<template>
  <div class="app-container">
    <el-segmented v-model="dqZCZT" :options="cjZt" @change="changeValue"> </el-segmented>
    <!----:filterss="dynamicFilters"-->
    <filterView :filters="search" :allSelect="false" :listtype="listType" :parent-type-method="filterMethod"></filterView>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="jzList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
    </div>
    <!--分页列表-->
    <div class="pagination">
      <el-pagination :page-size="10" small background layout="total" :total="jzList.length" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { storeToRefs } from 'pinia'
  import { buildListinfo } from '@/api/user'
  import { onMounted, reactive, computed, watch, ref, onBeforeMount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { da } from 'element-plus/es/locale'

  import { buildOperation } from '@/api/user'
  import { getYouliList, youliCJXQGet, buildListinfo1, getQueryMPZInfo } from '@/api/user'
  import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
  import { MoreFilled } from '@element-plus/icons-vue'
  const SettingStore = useSettingStore()
  const { dqZCZT, search, jzList, xcrwId, cjZt } = storeToRefs(SettingStore)
  //import { useTagsViewStore } from '@/store/modules/tagsView'

  //const TagsViewStore = useTagsViewStore()
  // const visitedViews = computed(() => TagsViewStore.visitedViews)

  const router = useRouter()
  // const route = useRoute()
  // const xcId = route.query.xcId as string

  const UserStore = useUserStore()
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  const listType = 'build'
  let xcId = xcrwId
  // 动态筛选选项配置，type：（select下拉框，radio单选，cascader级联选项）
  //const dynamicFilters = SettingStore.dynamicFilters

  //根据当前用户身份设置初始分段  初始这样设计
  //let initvalue = dqZCZT.value

  onMounted(() => {
    // getQueryMPZInfo().then((res) => {
    //   if (res.data.result <= 0) {
    //     router.push('/login?msgType=error&msg='+res.data.msg)
    //   }
    // })
  })

  const changeValue = (val) => {
    console.log('打印', val)
    //去掉 赋值 看看
    //SettingStore.setDqZCZT(val)
    console.log(xcId.value)
    buildListinfo1(SettingStore.xcrwXQId, dqZCZT.value, '').then((res) => {
      if (res.data.result === 1) {
        let jzList = []
        res.data.MPZInfo.data.forEach((item) => {
          jzList.push(item)
        })
        SettingStore.setJzList(jzList)
        //dataList = jzList
        SettingStore.setXcrwId(0)
      }
      //router.go(0);
    })
  }
  //子组件方法 根据条件触发事件
  const filterMethod = async (e1, e2) => {
    console.log('操作方法', e1, e2)

    if (e2 == '模糊查询') {
      e1.listType = listType
      //将搜索类型赋值到条件里面 searchType
      e1.searchType = e2
      //查询 后搜索列表的接口
      await buildListinfo1(SettingStore.xcrwXQId, dqZCZT.value, e1.jzName).then((res) => {
        if (res.data.result === 1) {
          let jzList = []
          res.data.MPZInfo.data.forEach((item) => {
            jzList.push(item)
          })
          SettingStore.setJzList(jzList)
          SettingStore.setXcrwId(0)
        }
      })
    } else if (e2 == '详情') {
      SettingStore.setXcrwId(e1.youliId)
      //进入详情页面
      await youliCJXQGet(e1.youliId).then((res) => {
        if (res.data.result == 1) {
          //SettingStore.setMPZInfo(res.data.MPZInfo.data)
          let MPZInfo = res.data.MPZInfo.data
          let ycmsg = res.data.ycmsg == '' ? false : true
          SettingStore.setnotemsg(res.data.notemsg)
          SettingStore.setycmsg(ycmsg)
          if (MPZInfo.length > 0) {
            MPZInfo.forEach((item) => {
              // 24920
              // if (item && item.isDK === undefined) {
              //   item.isDK = false
              // }
              // 判断字符串是否为空或仅为空白
              if (!item.SHQK || item.SHQK.trim() === '') {
                item.SHQK = []
              } else {
                item.SHQK = item.SHQK.split(',')
              }
            })
          }
          console.log(MPZInfo)
          SettingStore.setMPZInfo(MPZInfo)
          let huInfo = res.data.HuInfo.data
          if (huInfo.length > 0) {
            huInfo.forEach((item) => {
              item.isShowForm = false // 默认设置为 false 或者根据需要设置其他值
              if (!item.PHSY || item.PHSY.trim() === '') {
                item.PHSY = []
              } else {
                item.PHSY = item.PHSY.split(',')
              }
            })
          }
          SettingStore.setHuInfo(huInfo)
          //赋值建筑异常照片数据
          let ImgInfo = [
            {
              name: 'PHSY',
              title: '破坏使用',
              imglists: [],
            },
            {
              name: 'DJWJ',
              title: '搭建违建',
              imglists: [],
            },
            {
              name: 'WGCH',
              title: '违规拆除',
              imglists: [],
            },
            {
              name: 'SHQK',
              title: '损坏情况',
              imglists: [],
            },
            {
              name: 'XSQK',
              title: '修缮情况',
              imglists: [],
            },
            {
              name: 'FWYT',
              title: '房屋用途',
              imglists: [],
            },
          ]
          console.log(res.data.ImgInfo)
          //let ImageInfo1 = res.data.ImgInfo.data
          if (
            res &&
            res.data &&
            res.data.ImgInfo &&
            res.data.ImgInfo.data &&
            Array.isArray(res.data.ImgInfo.data) &&
            res.data.ImgInfo.data.length > 0
          ) {
            let ImageInfo1 = res.data.ImgInfo.data
            //遍历结果 把图片数据放入对应的数组里
            ImageInfo1.forEach((item) => {
              let item1 = {
                imgId: item.imgId,
                ZCid: item.ZCid,
                ZCLeiX: item.ZCLeiX,
                huId: item.huId,
                YiChLeiX: item.YiChLeiX,
                XuHao: item.XuHao,
                url: item.thumbUrl,
              }
              console.log('存在item1吗?', item1)
              ImgInfo.forEach((item2) => {
                if (item.YiChLeiX == item2.title) {
                  item2.imglists.push(item1)
                }
              })
            })
          }
          console.log('imgInfo', ImgInfo)
          SettingStore.setImgInfo(ImgInfo)

          //赋值建筑巡查照片数据
          let BImgInfo = [
            {
              name: 'jianZhumcbs',
              title: '建筑名称标识',
              imglists: [],
            },
            {
              name: 'gongAnLP',
              title: '公安绿牌',
              imglists: [],
            },
            {
              name: 'waiLiM',
              title: '外立面',
              imglists: [],
            },
            {
              name: 'mingPai',
              title: '铭牌',
              imglists: [],
            },
            {
              name: 'chanYeZT',
              title: '产业状态',
              imglists: [],
            },
          ]
          //遍历结果 把图片数据放入对应的数组里
          res.data.ZhaoP?.data.forEach((item) => {
            let item1 = {
              imgUrl: item.thumbURL,
              zhaopIdx: item.zhaopIdx,
              imgID: item.imgID,
            }
            // 遍历BImgInfo
            BImgInfo.forEach((item2) => {
              if (item2.title == item.zhaopLX) {
                item2.imglists.push(item1)
              }
            })
          })
          SettingStore.setBImgInfo(BImgInfo)

          setTimeout(async () => {
            router.push('/form/collection')
          }, 500)
        }
      })
    } else if (e2 == '重置' || e2 == '模糊重置') {
      // 将响应式对象置空
      Object.keys(search).forEach((key) => {
        search[key] = ''
      })
    } else {
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    // height: 100vh;
    // width: 100vw;
    // overflow-y: auto;
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
