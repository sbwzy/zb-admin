<template>
  <div class="cover-view1">
    <!-- <el-icon><ArrowLeftBold/></el-icon>    -->
    <el-button type="primary" @click="save()">打卡定位</el-button>
  </div>

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
    pointsList = props.points
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
    buildInfo: {
      type: Object,
      default() {
        return {}
      },
    },
    entryType: {
      type: String,
      default() {
        return ''
      },
    },
    entryBuildId: {
      type: String,
      default() {
        return ''
      },
    },
    parentTypeMethod1: {
      type: Function,
      default: () => {},
    },
  })
  let crosshairLines = null
  let isChoosed = false
  //const { points, parentTypeMethod1 } = toRefs(props)
  const map = ref(null)
  const mapContainer = ref(null)
  let pointsList = reactive([])
  let polygonList = reactive([])
  polygonList = youlizrz
  const drawItems = ref(null)
  let path = ref([])
  let paths = ref([])
  let jsonData = ref([])
  //待选择图标
  const dxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [12, 12],
    html: `<div style="width: 10px; height: 10px; background-color: #00DD2C; border-radius: 100%"></div>`,
  })
  //00FF00  已选择图标
  //已选择图标
  const yxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [12, 12],
    html: `<div style="width: 12px; height: 12px; background-color: #FFAD33; border-radius: 100%"></div>`,
  })

  var greenIcon = new L.Icon({
    iconUrl: '../../../../../src/assets/image/loc.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 36],
    iconAnchor: [18, 20],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  var greenIcon1 = new L.Icon({
    iconUrl: '../../../../../src/assets/image/job_icon2.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 36],
    iconAnchor: [18, 20],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  const initMap = () => {
    //建筑原规划点位信息 //原规划点位与签到位置的判断
    //if(props.buildInfo.locX == props.buildInfo.tdtX){
    //设置原建筑规划点位marker
    var marker1 = L.marker([props.buildInfo.locX, props.buildInfo.locY], { icon: dxzicon }).bindPopup('原建筑点位')
    //}
    //上次打点位置信息
    var marker2 = L.marker([props.buildInfo.tdtX, props.buildInfo.tdtY], { icon: yxzicon }).bindPopup('上次巡查位置')
    //上次签到位置
    var marker3 = L.marker([props.buildInfo.qianDaoX, props.buildInfo.qianDaoY], { icon: greenIcon1 }).bindPopup('上次签到位置')

    polygonList.forEach((item) => {
      var item1 = item.geometry.coordinates
      //console.log(item1);
      var item2 = item1[0][0]
      item2.forEach((item) => {
        var x = item[0]
        item[0] = item[1]
        item[1] = x
      })
    })
    polygonList.forEach((item) => {
      path.value = item.geometry.coordinates
      var polygon = L.polygon(path.value, {
        color: 'red',
        opacity: 0.5,
      }) //.addTo(this.map);
      paths.value.push(polygon)
    })
    var polygonGroup = L.featureGroup(paths.value)

    // 添加Bing Aerial图层

    const bingLayer = L.tileLayer.bing({
      bingMapsKey: 'AqzBjYlesV15mVBeg32goM6Ey2RBXVP6YPMs-MxfuPayEtgizvyyqi_P1y1YzOzh', // 替换为你的Bing Maps密钥
      imagerySet: 'Aerial', // 使用航空影像
      maxNativeZoom: 20,
      maxZoom: 22,
    })
    let tiandiMap = {}
    tiandiMap = L.featureGroup([bingLayer, polygonGroup, marker1, marker2, marker3])

    //.addTo(map.value)
    map.value = L.map(mapContainer.value, {
      center: [props.buildInfo.locX, props.buildInfo.locY],
      zoom: 19,
      layers: tiandiMap,
    })

    // .setView(, 19)

    map.value.zoomControl.remove()
    map.value.setMaxZoom(19)
    //添加缩放控件
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map.value)

    //console.log(points)
    // pointsList = points.value
    // pointsList.forEach((item) => {
    //   item[2] = false
    //   var marker1 = L.marker(item, { icon: dxzicon, opacity: 1 })

    //   paths.value.push(marker1)
    // })

    // console.log(paths.value.length)
    // drawItems.value = L.featureGroup(paths.value)

    // map.value.addLayer(drawItems.value)

    // 自定义按钮的点击事件
    // function customIconClickHandler(e) {
    //   // 执行你的自定义逻辑
    //   console.log('paths.value.length')
    //   console.log(pointsList)
    //   isChoosed = !isChoosed

    //   drawItems.value.clearLayers()
    //   paths.value = []
    //   pointsList = points.value
    //   pointsList.forEach((item) => {
    //     if (isChoosed && item[2] == true) {
    //       var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
    //       paths.value.push(marker1)
    //     }
    //     if (!isChoosed && item[2] != true) {
    //       var marker1 = L.marker(item, { icon: yxzicon, opacity: 1 })
    //       paths.value.push(marker1)
    //     }
    //   })
    //   drawItems.value = L.featureGroup(paths.value)

    //   map.value.addLayer(drawItems.value)
    // }
    // 创建十字线
    const center = map.value.getCenter()
    const crosshairLines = [
      L.polyline([center, L.latLng(center.lat, center.lng + 100)], { color: 'red' }).addTo(map.value),
      L.polyline([center, L.latLng(center.lat + 100, center.lng)], { color: 'red' }).addTo(map.value),
      L.polyline([center, L.latLng(center.lat, center.lng - 100)], { color: 'red' }).addTo(map.value),
      L.polyline([center, L.latLng(center.lat - 100, center.lng)], { color: 'red' }).addTo(map.value),
    ]

    // 监听地图的移动事件
    map.value.on('move', () => {
      const newCenter = map.value.getCenter()
      crosshairLines[0].setLatLngs([newCenter, L.latLng(newCenter.lat, newCenter.lng + 100)])
      crosshairLines[1].setLatLngs([newCenter, L.latLng(newCenter.lat + 100, newCenter.lng)])
      crosshairLines[2].setLatLngs([newCenter, L.latLng(newCenter.lat, newCenter.lng - 100)])
      crosshairLines[3].setLatLngs([newCenter, L.latLng(newCenter.lat - 100, newCenter.lng)])
    })
    // // 获取leaflet-draw的按钮容器
    // const toolbarContainer = document.querySelector('.leaflet-draw-toolbar')
    // if (toolbarContainer) {
    //   // 创建自定义图标链接
    //   const customIconLink = document.createElement('a')
    //   customIconLink.className = 'leaflet-draw-draw-custom'
    //   customIconLink.style = 'background-image: none;'
    //   customIconLink.title = '自定义图标链接'

    //   // 或者使用图片图标
    //   customIconLink.innerHTML =
    //     '<img src="../../../../../src/icons/svg/dadian.svg" style="height: 20px;width: 20px;padding: 5px;" alt="自定义图标" />'

    //   // 绑定点击事件到自定义图标链接
    //   customIconLink.addEventListener('click', customIconClickHandler)

    //   // 将自定义图标链接添加到leaflet-draw的按钮容器中
    //   toolbarContainer.appendChild(customIconLink)
    // }

    //图标点击事件
    // drawItems.value.on('click', (e) => {
    //   console.log(e.latlng)
    // })
    // var currentZoom = map.value.getZoom();
    // console.log("当前缩放层数",currentZoom)
    map.value.on('zoomend', (e) => {
      console.log(e.target.getZoom())
    })
    //console.log('打印数量', points.value)
  }
  const save = () => {
    console.log('保存')
  }
  //挂载地图
  onMounted(() => {
    initMap()
    // 创建十字线
    const center = map.value.getCenter()
    crosshairLines = [
      L.polyline([center, L.latLng(center.lat, center.lng + 0.01)], { color: 'red' }).addTo(map.value),
      L.polyline([center, L.latLng(center.lat + 0.01, center.lng)], { color: 'red' }).addTo(map.value),
    ]

    // 监听地图的移动事件
    map.value.on('move', () => {
      const newCenter = map.value.getCenter()
      crosshairLines[0].setLatLngs([newCenter, L.latLng(newCenter.lat, newCenter.lng + 0.01)])
      crosshairLines[1].setLatLngs([newCenter, L.latLng(newCenter.lat + 0.01, newCenter.lng)])
    })
  })
  //销毁地图
  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
      map.value.off('move')
    }
  })
  //监测到值已经变动了 但是数据没有被刷新
  watch(props.points, (newValue, oldValue) => {
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

  .cover-view1 {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 40px;
    top: 0px;
  }
</style>
