<template>
  <async-bingmap
    ref="bingmapRef"
    :points="pointslist"
    :entry-build-id="buildId"
    :entry-type="entryType"
    :parent-type-method1="bingmapMethod"
  />
  <div class="overlay">
    <filterView
      :filterss="dynamicFilters"
      :listtype="entryType"
      :parent-type-method="filterMethod"
      @parent-method1="bingmapMethod1"
    ></filterView>
  </div>
</template>

<script lang="ts" setup name="bingMap">
  import { onMounted, defineAsyncComponent, reactive, computed, ref, watch, toRefs } from 'vue'
  import bingmap from './components/bingmap.vue'
  import FixedCrosshair from './components/FixedCrosshair.vue'
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import { Search } from '@element-plus/icons-vue'
  import { useRoute } from 'vue-router'
  import { buildListinfo } from '@/api/user'
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
  const pointslist = ref(pointslist1)

  const pointslist2 = [
    [31.27119881827799, 121.4253616333008],
    [31.27455080309365, 121.4517974853515],
    [31.27305928272795, 121.4593505859375],
    [31.27439272614506, 121.4473342895508],
    [31.27219881827323, 121.4253616333008],
  ]
  const dynamicFilters = ref([
    {
      label: '巡查类型',
      key: 'collectionStatus',
      type: 'select',
      placeholder: '请选择巡查类型',
      options: [
        { label: '年度中心巡查', value: '年度中心巡查' },
        { label: '季度中心巡查', value: '季度中心巡查' },
        { label: '季度集团巡查', value: '季度集团巡查' },
        { label: '特殊情况巡查', value: '特殊情况任务' },
      ],
    },
    {
      label: '区域选择',
      key: 'regionmap',
      type: 'duoxuan',
      placeholder: '请选择区域',
      options: [
        {
          value: 1,
          label: '静安区',
          children: [
            { value: 2, label: '南京西路街道' },
            { value: 3, label: '曹家渡街道' },
            { value: 4, label: '江宁路街道' },
          ],
        },
        {
          value: 5,
          label: '徐汇区',
          children: [
            { value: 6, label: '天平路街道' },
            { value: 7, label: '湖南路街道' },
            { value: 8, label: '徐家汇街道' },
          ],
        },
        {
          value: 9,
          label: '普陀区',
          children: [
            { value: 10, label: '曹杨新村街道' },
            { value: 11, label: '长寿路街道' },
          ],
        },
      ],
    },
  ])
  //const xcrwList = params.value.list
  //console.log("地图",xcrwList)
  const onSubmit = () => {
    menuDIV = !menuDIV
    console.log(menuDIV)
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
    top: 90px;
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
