/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const formRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/validateForm',
    name: 'form',
    alwaysShow: true,
    meta: {
      title: '采集功能',
      icon: 'Grape',
    },
    children: [
      {
        path: '/form/validateForm',
        component: () => import('@/views/form/validateForm/index.vue'),
        name: 'validateForm',
        meta: { title: '新建巡查任务', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/form/advancedForm',
        component: () => import('@/views/form/advancedForm/index.vue'),
        name: 'advancedForm',
        meta: { title: '巡查任务列表', icon: 'MenuIcon' },
      },
      {
        path: '/form/appendForm',
        component: () => import('@/views/form/appendForm/index.vue'),
        name: 'appendForm',
        meta: { title: '勾选记录', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/form/moreForm',
        component: () => import('@/views/form/moreForm/index.vue'),
        name: 'moreForm',
        meta: { title: '多表单验证', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/form/searchForm',
        component: () => import('@/views/form/searchForm/index.vue'),
        name: 'searchForm',
        meta: { title: '查询 Form', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
]

export default formRouter
