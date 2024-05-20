<template>
  <div id="map" style="600px"></div>
  <!-- <div class="overlay">
		<filterView :filterss="dynamicFilters" :listtype="listType"></filterView>
	</div> -->
</template>

<script lang="ts" setup name="bingMap">
  import { onMounted, ref } from 'vue'
  import * as L from 'leaflet'
  //bing地图
  import 'leaflet-bing-layer'
  import 'leaflet/dist/leaflet.css'
  //控件插件
  import 'leaflet-draw'
  import 'leaflet-draw/dist/leaflet.draw.css'

  const screenHeight = ref(0)
  const mapContainer = ref(null)
  const initMap = () => {
    const map = L.map('map').setView([31.31334249284388, 121.47915601730348], 11)
    // 添加Bing Aerial图层

    const bingLayer = L.tileLayer
      .bing({
        bingMapsKey: 'AqzBjYlesV15mVBeg32goM6Ey2RBXVP6YPMs-MxfuPayEtgizvyyqi_P1y1YzOzh', // 替换为你的Bing Maps密钥
        imagerySet: 'Aerial', // 使用航空影像
      })
      .addTo(map)
    map.zoomControl.remove()
    //添加缩放控件
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map)
    //添加绘制图层
    let drawItems = new L.FeatureGroup()
    map.addLayer(drawItems)
    //添加绘制控件
    let drawControl = new L.Control.Draw({
      draw: {
        polyline: false, //绘制线
        polygon: true, //绘制多边形
        rectangle: false, //绘制矩形
        circle: false, //绘制圆
        marker: false, //绘制标注
        circlemarker: false, //绘制圆形标注
      },
      edit: {
        featureGroup: drawItems, //绘制图层
        //edit: true,   //图形编辑控件
        remove: true, //图形删除控件
      },
    })
    //添加绘制控件
    map.addControl(drawControl)
    //线段提示
    L.drawLocal.draw = {
      toolbar: {
        actions: {
          // title: '取消绘图',
          text: '取消绘图',
        },
        finish: {
          // title: '完成绘图',
          text: '完成绘图',
        },
        undo: {
          // title: '删除最后绘制的点',//'Delete last point drawn',
          text: '删除最后绘制的点', //'Delete last point'
        },
        buttons: {
          polyline: '绘制一个多段线', //'Draw a polyline',
          polygon: '绘制一个多边形', //'Draw a polygon',
          rectangle: '绘制一个矩形', //'Draw a rectangle',
          circle: '绘制一个圆', //'Draw a circle',
          marker: '绘制一个标记', //'Draw a marker',
          circlemarker: '绘制一个圆形标记', //'Draw a circlemarker'
        },
      },
      handlers: {
        circle: {
          tooltip: {
            start: '单击并拖动以绘制圆', //'Click and drag to draw circle.'
          },
        },
        simpleshape: {
          tooltip: {
            end: '释放鼠标完成绘图', //'Release mouse to finish drawing.'
          },
        },
        rectangle: {
          tooltip: {
            start: '单击并拖动以绘制矩形', //'Click and drag to draw rectangle.'
          },
        },
        polyline: {
          tooltip: {
            start: '单击开始绘制线', //'Click to start drawing line.',
            cont: '单击以继续绘制线', //'Click to continue drawing line.',
            end: '单击“最后一点”以结束线', //'Click last point to finish line.'
          },
        },
        polygon: {
          tooltip: {
            start: '单击开始绘制形状', //'Click to start drawing shape.',
            cont: '单击继续绘制形状', //'Click to continue drawing shape.',
            end: '单击第一个点关闭此形状', //'Click first point to close this shape.'
          },
        },
        marker: {
          tooltip: {
            start: '单击“地图”以放置标记', //'Click and drag to draw circle.'
          },
        },
        circlemarker: {
          tooltip: {
            start: '单击“地图”以放置圆标记', //'Click map to place circle marker.'
          },
        },
      },
    }
    L.drawLocal.edit = {
      toolbar: {
        actions: {
          save: {
            // title: '保存更改',//'Save changes',
            text: '保存', //'Save'
          },
          cancel: {
            // title: '取消编辑，放弃所有更改',//'Cancel editing, discards all changes',
            text: '取消', //'Cancel'
          },
          clearAll: {
            // title: '清除所有图层',//'Clear all layers',
            text: '清除所有', //'Clear All'
          },
        },
        buttons: {
          edit: '编辑图层', //'Edit layers',
          editDisabled: '无可编辑的图层', //'No layers to edit',
          remove: '删除图层', //'Delete layers',
          removeDisabled: '无可删除的图层', //'No layers to delete'
        },
      },
      handlers: {
        edit: {
          tooltip: {
            text: '拖动控制柄或标记以编辑要素', //'Drag handles or markers to edit features.',
            subtext: '单击“取消”撤消更改', //'Click cancel to undo changes.'
          },
        },
        remove: {
          tooltip: {
            text: '单击要删除的要素', //'Click on a feature to remove.'
          },
        },
      },
    }
    //绘制事件
    map.on(L.Draw.Event.CREATED, function (e) {
      console.log('ejs', e)
      let type = e.layerType
      //获取绘制图层
      let drawlayer = e.layer
      console.log('type', type, 'drawlayer', drawlayer)
      if (type === 'marker') {
        L.icon({
          iconUrl: require('@/assets/image/login/accountLogin-icon.png'),
          iconSize: [50, 50],
        })
        drawlayer.bindPopup('标记')
      }
      drawItems.addLayer(drawlayer)
    })
  }
  onMounted(() => {
    // // 获取屏幕高度
    // screenHeight.value = window.innerHeight;

    // // 监听窗口大小变化，更新屏幕高度
    // window.addEventListener('resize', () => {
    // 	screenHeight.value = window.innerHeight;
    // });
    // console.log("屏幕高度",screenHeight.value)
    initMap()
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
  }

  /* 隐藏 Leaflet 的 Logo */
  #map .leaflet-control-attribution {
    display: none;
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
