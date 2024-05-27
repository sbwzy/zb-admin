<template>
  <div ref="mapContainer" style="height: 100%; z-index: 20"></div>
</template>

<script lang="ts" setup name="bingMap">
  import { onMounted, watch, onUnmounted, ref, reactive, defineEmits, defineProps, toRef, toRefs, defineExpose } from 'vue'
  import * as L from 'leaflet'
  //bing地图
  import 'leaflet-bing-layer'
  import 'leaflet/dist/leaflet.css'
  import dadianSvg from '@/src/icons/svg/dadian.svg'

  import { youlizrz } from '../../../../../api/youlizrz'

  // 切换方法，提供给父组件调用
  const customeMethod1 = () => {
    console.log('3')
    // 切换已选和未选中的点
    console.log('paths.value.length')
    console.log(pointsList)
    isChoosed = !isChoosed

    drawItems.value.clearLayers()
    paths.value = []
    pointsList = points.value
    pointsList.forEach((item) => {
      if (isChoosed && item[2] == true) {
        var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
        paths.value.push(marker1)
      }
      if (!isChoosed && item[2] != true) {
        var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
        paths.value.push(marker1)
      }
    })
    drawItems.value = L.featureGroup(paths.value)

    map.value.addLayer(drawItems.value)
  }

  // 暴露方法给父组件
  defineExpose({
    customeMethod1,
  })

  let props = defineProps({
    points: {
      type: Array,
      default() {
        return []
      },
    },
    parentTypeMethod1: {
      type: Function,
      default: () => {},
    },
  })

  let isChoosed = false
  const { points, parentTypeMethod1 } = toRefs(props)
  const map = ref(null)
  const mapContainer = ref(null)
  let pointsList = reactive([])
  let polygonList = reactive([])
  const drawItems = ref(null)
  let path = ref([])
  let paths = ref([])
  let pointslist2 = reactive([
    [31.27119881827799, 121.4253616333008],
    [31.27745508030936, 121.4517974853515],
    [31.27530592827279, 121.4593505859375],
    [31.2714392726145, 121.4473342895508],
    [31.27219881827799, 121.4253616333008],
  ])
  //const markerLayer = new L.FeatureGroup();
  //待选择图标
  const dxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [15, 15],
    html: `<div style="width: 6px; height: 6px; background-color: #00DD2C; border-radius: 100%"></div>`,
  })
  //00FF00  已选择图标
  //已选择图标
  const yxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [5, 5],
    html: `<div style="width: 6px; height: 6px; background-color: #00DD2C; border-radius: 100%"></div>`,
  })
  const initMap = () => {
    map.value = L.map(mapContainer.value).setView([31.26334249284388, 121.47915601730348], 11)
    // 添加Bing Aerial图层

    const bingLayer = L.tileLayer
      .bing({
        bingMapsKey: 'AqzBjYlesV15mVBeg32goM6Ey2RBXVP6YPMs-MxfuPayEtgizvyyqi_P1y1YzOzh', // 替换为你的Bing Maps密钥
        imagerySet: 'Aerial', // 使用航空影像
        maxNativeZoom: 20,
        maxZoom: 22,
      })
      .addTo(map.value)
    map.value.zoomControl.remove()
    map.value.setMaxZoom(19)
    //添加缩放控件
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map.value)
    //添加绘制图层

    //添加一个控制按钮 设置一下 在不同地图组件放置自然幢的勾边
    //let jsonData = youlizrz;
    // const path = ref([]);
    // const paths = ref([]);
    // const pathss = ref([]);

    console.log(points)
    pointsList = points.value
    pointsList.forEach((item) => {
      item[2] = false
      var marker1 = L.marker(item, { icon: dxzicon, opacity: 1 })

      paths.value.push(marker1)
    })

    console.log(paths.value.length)
    drawItems.value = L.featureGroup(paths.value)

    map.value.addLayer(drawItems.value)

    // 自定义按钮的点击事件
    function customIconClickHandler(e) {
      // 执行你的自定义逻辑
      console.log('paths.value.length')
      console.log(pointsList)
      isChoosed = !isChoosed

      drawItems.value.clearLayers()
      paths.value = []
      pointsList = points.value
      pointsList.forEach((item) => {
        if (isChoosed && item[2] == true) {
          var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
          paths.value.push(marker1)
        }
        if (!isChoosed && item[2] != true) {
          var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
          paths.value.push(marker1)
        }
      })
      drawItems.value = L.featureGroup(paths.value)

      map.value.addLayer(drawItems.value)
    }

    // 获取leaflet-draw的按钮容器
    const toolbarContainer = document.querySelector('.leaflet-draw-toolbar')
    if (toolbarContainer) {
      // 创建自定义图标链接
      const customIconLink = document.createElement('a')
      customIconLink.className = 'leaflet-draw-draw-custom'
      customIconLink.style = 'background-image: none;'
      customIconLink.title = '自定义图标链接'

      // 或者使用图片图标
      customIconLink.innerHTML =
        '<img src="../../../../../src/icons/svg/dadian.svg" style="height: 20px;width: 20px;padding: 5px;" alt="自定义图标" />'

      // 绑定点击事件到自定义图标链接
      customIconLink.addEventListener('click', customIconClickHandler)

      // 将自定义图标链接添加到leaflet-draw的按钮容器中
      toolbarContainer.appendChild(customIconLink)
    }

    //图标点击事件
    drawItems.value.on('click', (e) => {
      console.log(e.latlng)
    })
    // var currentZoom = map.value.getZoom();
    // console.log("当前缩放层数",currentZoom)
    map.value.on('zoomend', (e) => {
      console.log(e.target.getZoom())
    })
    console.log('打印数量', points.value)
  }

  //挂载地图
  onMounted(() => {
    initMap()
  })
  //销毁地图
  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  })
  //监测到值已经变动了 但是数据没有被刷新
  watch(points, (newValue, oldValue) => {
    console.log(newValue)
    console.log(oldValue)
  })
</script>

<style>
  /* 必要的Leaflet CSS重置 */
  .leaflet-container {
    /* 将高度绑定到计算属性 */
    height: 600px;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    z-index: 20 !important;
  }

  /* 隐藏 Leaflet 的 Logo */
  .leaflet-control-attribution {
    display: none;
  }

  .app-main .app-main-inner[data-v-abb6a809] {
    flex-direction: column-reverse !important;
  }

  .overlay {
    position: absolute;
    top: 690px;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    z-index: 1000;
  }

  .leaflet-marker-icon {
    width: 10px important !;
    height: 10px important !;
  }
</style>
