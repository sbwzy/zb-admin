<template>
  <div id="map" style="height: 600px"></div>
</template>

<script lang="ts" setup name="bingMap">
  import { onMounted } from 'vue'
  import * as L from 'leaflet'
  import 'leaflet-bing-layer'
  import 'leaflet/dist/leaflet.css'

  const initMap = () => {
    const map = L.map('map').setView([31.31334249284388, 121.47915601730348], 11)
    // 添加Bing Aerial图层

    const bingLayer = L.tileLayer
      .bing({
        bingMapsKey: 'AqzBjYlesV15mVBeg32goM6Ey2RBXVP6YPMs-MxfuPayEtgizvyyqi_P1y1YzOzh', // 替换为你的Bing Maps密钥
        imagerySet: 'Aerial', // 使用航空影像
      })
      .addTo(map)

    // 绑定地图视图变化事件，当视图发生变化时更新动态瓦片图层
    // map.on('moveend', () => {
    //   const bounds = map.getBounds()
    //   const ne = bounds.getNorthEast()
    //   const sw = bounds.getSouthWest()
    //   const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`
    //   wmsLayer.setParams({ bbox })
    // })

    // map.on('moveend', L.Util.THROTTLE(function() {
    // 	const bounds = map.getBounds();
    // 	const ne = bounds.getNorthEast();
    // 	const sw = bounds.getSouthWest();
    // 	const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`;
    // 	wmsLayer.setParams({ bbox });
    // }, 100));

    // 添加缩放控件
    // L.control
    //   .zoom({
    //     position: 'topright',
    //   })
    //   .addTo(map)
  }

  onMounted(() => {
    initMap()
    console.log('打印bing')
  })
</script>

<style>
  /* 必要的Leaflet CSS重置 */
  .leaflet-container {
    height: 400px;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  /* 隐藏 Leaflet 的 Logo */
  #map .leaflet-control-attribution {
    display: none;
  }
</style>
