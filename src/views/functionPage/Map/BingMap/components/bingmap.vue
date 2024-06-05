<template>
  <div class="cover-view1">
    <!-- <el-icon><ArrowLeftBold/></el-icon>    -->
    <el-button type="primary" @click="save()">打卡定位</el-button>
    <el-text v-if="buildInfo.isMorm">{{ buildInfo.qiaoDaoReason }}</el-text>
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
  import { ElMessage, ElMessageBox } from 'element-plus'

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

  const emit = defineEmits(['update:buildInfotdtx', 'update:buildInfoqiandaox', 'update:buildInforeason'])

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
  let center = ref([]) //原本屏幕位置
  let newCenter = ref([]) //屏幕中心位置
  let center1 = ref([]) //当前签到人所在位置
  let marker1 = ref([])
  let marker2 = ref([])
  let marker3 = ref([])
  let reason = ref('')
  //原本建筑位置 3AF960
  const dxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [13, 13],
    html: `<div style="width: 13px; height: 13px; background-color: #3AF960; border-radius: 100%"></div>`,
  })
  //FFD633  上次选择建筑位置
  const yxzicon = L.divIcon({
    className: 'my-div-icon',
    iconSize: [13, 13],
    html: `<div style="width: 13px; height: 13px; background-color: #FFD633; border-radius: 100%"></div>`,
  })

  //FF3333  人员签到位置
  const ryqdwz = L.divIcon({
    className: 'my-div-icon',
    iconSize: [13, 13],
    html: `<div style="width: 13px; height: 13px; background-color: #FF3333; border-radius: 100%"></div>`,
  })

  // var greenIcon = new L.Icon({
  //   iconUrl: '../../../../../src/assets/image/loc.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [30, 36],
  //   iconAnchor: [18, 20],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41],
  // })

  // var greenIcon1 = new L.Icon({
  //   iconUrl: '../../../../../src/assets/image/job_icon2.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [30, 36],
  //   iconAnchor: [18, 20],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41],
  // })

  const initMap = () => {
    //建筑原规划点位信息 //原规划点位与签到位置的判断
    //if(props.buildInfo.locX == props.buildInfo.tdtX){
    //设置原建筑规划点位marker
    marker1.value = L.marker([props.buildInfo.locX, props.buildInfo.locY], { icon: dxzicon }).bindPopup('原建筑点位')
    //}
    //上次打点位置信息
    marker2.value = L.marker([props.buildInfo.tdtX, props.buildInfo.tdtY], { icon: yxzicon }).bindPopup('上次巡查位置')
    //上次签到位置 (如果当前角色是管理员可以看到)
    marker3.value = L.marker([props.buildInfo.qianDaoX, props.buildInfo.qianDaoY], { icon: ryqdwz }).bindPopup('上次签到位置')

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
    tiandiMap = L.featureGroup([bingLayer, polygonGroup, marker1.value, marker2.value, marker3.value]) //.addTo(map.value)

    map.value = L.map(mapContainer.value, {
      center: [props.buildInfo.locX, props.buildInfo.locY],
      zoom: 19,
      layers: tiandiMap,
    })

    map.value.zoomControl.remove()
    map.value.setMaxZoom(19)
    //添加缩放控件
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map.value)

    // 创建十字线
    center.value = map.value.getCenter()
    const crosshairLines = [
      L.polyline([center.value, L.latLng(center.value.lat, center.value.lng + 100)], { color: 'red' }).addTo(map.value),
      L.polyline([center.value, L.latLng(center.value.lat + 100, center.value.lng)], { color: 'red' }).addTo(map.value),
      L.polyline([center.value, L.latLng(center.value.lat, center.value.lng - 100)], { color: 'red' }).addTo(map.value),
      L.polyline([center.value, L.latLng(center.value.lat - 100, center.value.lng)], { color: 'red' }).addTo(map.value),
    ]

    // 监听地图的移动事件
    map.value.on('move', () => {
      newCenter.value = map.value.getCenter()
      crosshairLines[0].setLatLngs([newCenter.value, L.latLng(newCenter.value.lat, newCenter.value.lng + 100)])
      crosshairLines[1].setLatLngs([newCenter.value, L.latLng(newCenter.value.lat + 100, newCenter.value.lng)])
      crosshairLines[2].setLatLngs([newCenter.value, L.latLng(newCenter.value.lat, newCenter.value.lng - 100)])
      crosshairLines[3].setLatLngs([newCenter.value, L.latLng(newCenter.value.lat - 100, newCenter.value.lng)])
    })

    //查看当前定位
    map.value
      .locate({
        setView: false,
        enableHighAccuracy: true,
      })
      .on('locationfound', function (e) {
        //console.log("定位成功")
        //console.log(e);

        var radius1 = e.accuracy / 8
        L.marker(e.latlng).addTo(map.value).bindPopup('当前您位置在这个圈内')
        L.circle(e.latlng, radius1).addTo(map.value)
        center1.value = e.latlng
        //center11.lng = center1.lng;
        //center11.lat = center1.lat;
        //console.log("当前我的位置", flag.center11)
        //flag.isDing = false;
      })
      .on('locationerror', function (e) {
        console.log('定位失败')
        //flag.isDing = true;
        //flag.descZuoBiao2 = "<b style=\"color:red\">当前定位gps信号异常,请检查</b>"
      })

    map.value.on('zoomend', (e) => {
      console.log(e.target.getZoom())
    })
  }
  const save = () => {
    console.log('保存')
    console.log(newCenter.value)
    console.log(newCenter.value.length == 0)
    let distance = 0
    let distance1 = 0
    //如果不移动的情况
    if (newCenter.value.length != 0) {
      //判断 建筑原本位置 和现在点位 的距离
      distance = map.value.distance(center.value, newCenter.value)
      //判断 现在点位与签到位置的距离
      distance1 = map.value.distance(newCenter.value, center1.value)
    }

    //距离大于100米 需要填写 必填信息
    if (distance >= 100 || distance1 >= 100) {
      ElMessageBox.prompt('当前点位(建筑、签到)与原点位距离超过100米,请填写理由', '原因', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputValidator: (val) => {
          if (val === null || val.length < 1 || val.length > 216) {
            return false
          }
        },
        inputErrorMessage: '此理由必填',
      })
        .then(({ value }) => {
          reason.value = value
          map.value.removeLayer(marker1.value)
          marker1.value = L.marker(newCenter.value, { icon: dxzicon }).bindPopup('现在建筑点位').addTo(map.value)
          ElMessage({
            type: 'success',
            message: '保存成功',
            // message: `保存成功:${value}`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消输入',
          })
        })
    } else if (newCenter.value.length != 0) {
      map.value.removeLayer(marker1.value)
      marker1.value = L.marker(newCenter.value, { icon: dxzicon }).bindPopup('现在建筑点位').addTo(map.value)
    } else {
      map.value.removeLayer(marker1.value)
      marker1.value = L.marker(center.value, { icon: dxzicon }).bindPopup('现在建筑点位').addTo(map.value)
    }

    emit('update:buildInfotdtx', newCenter.value.length != 0 ? newCenter.value : center.value)
    emit('update:buildInfoqiandaox', center1.value, reason.value)
    emit('update:buildInforeason', reason.value)
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
