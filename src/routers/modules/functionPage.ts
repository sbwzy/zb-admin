/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const functionPageRouter = [
  {
    path: '/function-page',
    component: Layout,
    redirect: '/function-page/404',
    name: 'function-page',
    meta: {
      title: '功能页面',
      icon: 'ElementPlus',
    },
    children: [
      {
        path: '/function-page/collection/:id',
        component: () => import('@/views/functionPage/collection/index.vue'),
        name: 'collection',
        meta: { title: '信息采集', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/tools',
        component: () => import('@/views/functionPage/tools/index.vue'),
        name: 'tools',
        meta: { title: '工具链集合', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/404',
        component: () => import('@/views/errorPages/404.vue'),
        name: 'function-404',
        meta: { title: '404 页面', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/Map',
        // component: () => import('@/views/functionPage/Map/ESRIMap/index.vue'),
        name: 'Map',
        meta: { title: '地图', icon: 'MenuIcon' },
        children: [
          {
            path: '/function-page/Map/ecnuGisMap',
            component: () => import('@/views/functionPage/Map/ecnuGisMap/index.vue'),
            name: 'ecnuGisMap',
            meta: { title: 'Gis地图', keepAlive: true, icon: 'MenuIcon' },
          },
          {
            path: '/function-page/Map/ESRIMap',
            component: () => import('@/views/functionPage/Map/ESRIMap/index.vue'),
            name: 'ESRIMap',
            meta: { title: 'ESRI地图', keepAlive: true, icon: 'MenuIcon' },
          },
          {
            path: '/function-page/Map/BingMap/:id/:type',
            component: () => import('@/views/functionPage/Map/BingMap/index.vue'),
            name: 'BingMap',
            meta: { title: 'Bing地图', keepAlive: true, icon: 'MenuIcon' },
          },
          {
            path: '/function-page/Map/AMap',
            component: () => import('@/views/functionPage/Map/AMap/index.vue'),
            name: 'AMap',
            meta: { title: '高德地图', keepAlive: true, icon: 'MenuIcon' },
          },
        ],
      },
      {
        path: '/function-page/403',
        component: () => import('@/views/errorPages/403.vue'),
        name: 'function-403',
        meta: { title: '403 页面', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/fullscreen',
        component: () => import('@/views/functionPage/fullscreen/index.vue'),
        name: 'fullscreen',
        meta: { title: '元素 全屏', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/information-list',
        component: () => import('@/views/functionPage/informationList/index.vue'),
        name: 'informationList',
        meta: { title: '信息列表', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
]

export default functionPageRouter
