/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const systemRouter = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        path: '/system/task',
        component: () => import('@/views/system/task/index.vue'),
        name: 'task',
        meta: { title: '建筑信息管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/user',
        component: () => import('@/views/system/user/index.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/appro',
        component: () => import('@/views/system/appro/index.vue'),
        name: 'appro',
        meta: { title: '审批管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/dept',
        component: () => import('@/views/system/dept/index.vue'),
        name: 'dept',
        meta: { title: '巡查任务管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'role',
        meta: { title: '角色管理', icon: 'MenuIcon' },
      },
    ],
  },
]

export default systemRouter
