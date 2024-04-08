<template>
  <div id="map" style="height: 600px"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import L from 'leaflet'
  import 'esri-leaflet'
  import 'leaflet/dist/leaflet.css'

  const map = ref(null)

  onMounted(() => {
    map.value = L.map('map').setView([31.24534249284388, 121.47915601730348], 12)

    L.esri.basemapLayer('Topographic').addTo(map.value)
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
