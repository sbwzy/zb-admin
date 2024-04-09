<template>
  <div id="map" style="height: 600px"></div>
</template>

<script lang="ts" setup name="ecnuGisMap">
  import { onMounted } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'

  const initMap = () => {
    const map = L.map('map').setView([31.44534249284388, 121.47915601730348], 11)

    const bounds = map.getBounds()
    const ne = bounds.getNorthEast()
    const sw = bounds.getSouthWest()
    const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`

    const wmsLayer = L.tileLayer
      .wms('http://webgis.ecnu.edu.cn/qgis/qgis_mapserv.fcgi.exe', {
        service: 'WMS',
        map: '../projects/youli/youli.qgs',
        layers: 'BingImage,sh_buildings,yuli_points',
        format: 'image/png',
        transparent: true,
        BBOX: bbox,
        maxZoom: 22,
        version: '1.3.0',
        crs: L.CRS.EPSG4326,
        SRS: 'EPSG:4326',
        REQUEST: 'GetMap',
        WIDTH: '600',
        HEIGHT: '400',
        updateInterval: 1000, //在平移时，瓦片将会在 updateInterval 毫秒内最多只更新一次。
        keepBuffer: 10, //平移地图时，在卸载之前保留这么多行和列的图块。
        cache: true,
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
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map)
  }

  onMounted(() => {
    initMap()
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
</style>
