/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const formRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/dept',
    name: 'form',
    hidden: true,
    alwaysShow: true,
    meta: {
      title: '采集功能',
      icon: 'Grape',
    },
    children: [
      {
        path: '/form/dept',
        component: () => import('@/views/form/dept/index.vue'),
        hidden: true,
        name: 'dept',
        meta: { title: '巡查任务管理', icon: 'MenuIcon' },
      },
      {
        path: '/form/task',
        component: () => import('@/views/form/task/index.vue'),
        hidden: true,
        name: 'task',
        meta: { title: '建筑列表管理', icon: 'MenuIcon' },
      },
      {
        path: '/form/collection',
        component: () => import('@/views/form/collection/index.vue'),
        name: 'collection',
        hidden: true,
        meta: { title: '建筑详情页面', icon: 'MenuIcon' },
      },
      {
        path: '/form/validateForm',
        component: () => import('@/views/form/validateForm/index.vue'),
        name: '新增巡查任务',
        hidden: true,
        meta: { keepAlive: false },
      },
    ],
  },
]

export default formRouter
