<template>
  <async-bingmap
    ref="bingmapRef"
    v-model:build-info="info"
    :parent-type-method1="bingmapMethod"
    @update:build-infotdtx="updatebuildinfo"
    @update:build-infoqiandaox="updatebuildinfo1"
    @update:build-inforeason="updatebuildinfo2"
    :key="dataKey"
  />
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
  const dataKey = ref(0)
  const isFirstLoad = ref(true)
  const buildId = route.params.id
  const entryType = route.params.type
  //const { params } = toRefs(route) :entryBuildId="buildId" :entryType="entryType"

  const bingmapRef = ref<InstanceType<typeof bingmap>>()
  const asyncBingmap = defineAsyncComponent(() => import('./components/bingmap.vue'))
  const listType = 'xcmap'
  let menuDIV = false
  let info = ref({
    id: '1',
    buildName: MPZInfo.value[0].ShouQuanDZ,
    locX: MPZInfo.value[0].tdty, //建筑原本建筑位置x 31.193838901816
    locY: MPZInfo.value[0].tdtx, //建筑原本建筑位置y 121.420338909884
    tdtxNew: MPZInfo.value[0].tdtyNew,
    tdtyNew: MPZInfo.value[0].tdtxNew,
    isMorm: true,
    qiaoDaoReason: '当前gis信号差',
  })

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

  const bingmapMethod = (el) => {}
  onMounted(() => {
    console.log('打印缓存')
    // if (isFirstLoad.value) {
    //   console.log('打印缓存')
    //   dataKey.value++
    //   SettingStore.setReload()

    //   // 加载完成后，设置为false，防止下一次加载时再次执行
    //   isFirstLoad.value = false
    // }
  })
  watch(
    info,
    () => {
      dataKey.value++
    },
    { deep: true },
  )
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
