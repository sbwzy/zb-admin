<template>
  <async-bingmap
    ref="bingmapRef"
    v-model:build-info="info"
    :points="pointslist"
    :entry-build-id="buildId"
    :entry-type="entryType"
    :parent-type-method1="bingmapMethod"
    @update:build-infotdtx="updatebuildinfo"
    @update:build-infoqiandaox="updatebuildinfo1"
    @update:build-inforeason="updatebuildinfo2"
  />
  <!-- <div class="overlay">
    <filterView
      :filterss="dynamicFilters"
      :listtype="entryType"
      :parent-type-method="filterMethod"
      @parent-method1="bingmapMethod1"
    ></filterView>
  </div> -->
</template>

<script lang="ts" setup name="bingMap">
  import { onMounted, defineAsyncComponent, reactive, computed, ref, watch, toRefs } from 'vue'
  import bingmap from './components/bingmap.vue'
  import { storeToRefs } from 'pinia'
  import FixedCrosshair from './components/FixedCrosshair.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import { Search } from '@element-plus/icons-vue'
  import { useRoute } from 'vue-router'
  import { buildListinfo } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'

  const SettingStore = useSettingStore()
  const { MPZInfo, HuInfo, ImgInfo, BImgInfo, gfIdList, gfid, fWLXList, FWYT, pHSYList } = storeToRefs(SettingStore)
  const route = useRoute()

  const buildId = route.params.id
  const entryType = route.params.type
  //const { params } = toRefs(route) :entryBuildId="buildId" :entryType="entryType"

  const bingmapRef = ref<InstanceType<typeof bingmap>>()
  const asyncBingmap = defineAsyncComponent(() => import('./components/bingmap.vue'))
  //将bingmap中的方法提供给FilterView调用
  const bingmapMethod1 = () => {
    console.log('2')
    console.log(bingmapRef)
    // 调用bingmap组件的方法1
    bingmapRef.value?.customeMethod1()
  }
  const listType = 'xcmap'
  let menuDIV = false
  const pointslist1 = [
    [31.26119881827799, 121.4253616333008],
    [31.22745508030936, 121.4517974853515],
    [31.26530592827279, 121.4593505859375],
    [31.2814392726145, 121.4473342895508],
  ]
  const info = ref({
    id: '1',
    buildName: MPZInfo.value[0].ShouQuanDZ,
    locX: MPZInfo.value[0].tdtY, //建筑原本建筑位置x 31.193838901816
    locY: MPZInfo.value[0].tdtX, //建筑原本建筑位置y 121.420338909884
    tdtxNew: MPZInfo.value[0].tdtyNew,
    tdtyNew: MPZInfo.value[0].tdtxNew,
    isMorm: true,
    qiaoDaoReason: '当前gis信号差',
  })

  const pointslist = ref(pointslist1)

  const pointslist2 = [
    [31.27119881827799, 121.4253616333008],
    [31.27455080309365, 121.4517974853515],
    [31.27305928272795, 121.4593505859375],
    [31.27439272614506, 121.4473342895508],
    [31.27219881827323, 121.4253616333008],
  ]
  //const xcrwList = params.value.list
  //console.log("地图",xcrwList)
  const onSubmit = () => {
    menuDIV = !menuDIV
    console.log(menuDIV)
  }

  const updatebuildinfo = (val) => {
    console.log('打印', val)
    //info.value.qiaoDaoReason = val
  }
  const updatebuildinfo1 = (val) => {
    console.log('打印1', val)
    //info.value.qiaoDaoReason = val
  }
  const updatebuildinfo2 = (val) => {
    console.log('打印2', val)
    //info.value.qiaoDaoReason = val
  }
  const filterMethod = (el) => {
    console.log('打印', el)
  }

  const bingmapMethod = (el) => {
    console.log('打印点位', el)
    if (el == 1) {
      pointslist.value = pointslist2
    } else {
      pointslist.value = pointslist1
    }
    //let datalist = ref([])
    console.log(pointslist.value)
    // buildListinfo(el).then((res) => {
    // 	console.log('打印结果', res)
    // 	let data = res.data.caiJiList1.data;
    // 	console.log(data)
    // 	console.log(typeof data)
    // 	//data.foreach()
    // 	let dataa = ref([])
    // 	data.forEach((item) => {
    // 		dataa.value.push([item.tdtY,item.tdtx])
    // 	})
    // 	pointslist.value = dataa.value

    // })
    // console.log(pointslist.value)
  }
</script>
<style>
  .overlay {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: auto !important;
    z-index: 1000;
    display: contents;
    pointer-events: auto !important;
    z-index: 1000;
    display: contents;
  }
</style>
