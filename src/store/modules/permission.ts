import { defineStore } from 'pinia'

import { asyncRoutes, constantRoutes, routerArray, notFoundRouter } from '@/routers/index'
import { hasPermission, filterAsyncRoutes } from '@/utils/routers'
import { filterKeepAlive, filterRoutes } from '@/utils/routers'
export const usePermissionStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'permissionState',
  // state: 返回对象的函数
  state: () => ({
    // 路由
    routes: [],
    // 动态路由
    addRoutes: [],
    // 缓存路由
    cacheRoutes: {},

    //动态权限配置
    Profile: {
      permissionName: 'administrator',
      modules: [
        {
          name: 'InforCollectionModule',
          description: '信息采集模块',
        },
        {
          name: 'ApproveModule',
          description: '审批模块',
        },
        {
          name: 'EarlyWarningModule',
          description: '预警模块',
        },
        {
          name: 'HomeModule',
          description: '主页',
        },
      ],
      PermissionActions: [
        {
          actionName: 'HomeModule_ShowSetting',
          action: 'true',
        },
        {
          actionName: 'InforCollectionModule_BuildingNameAccess',
          action: 'Read',
        },
        {
          actionName: 'InforCollectionModule_WLMPictureAccess',
          action: 'Edit',
        },
      ],
    },
  }),
  getters: {
    permission_routes: (state) => {
      return state.routes
    },
    keepAliveRoutes: (state) => {
      return filterKeepAlive(asyncRoutes)
    },
  },
  //
  /****
    路由权限（模块可见性权限），模块读写权限，字段的细分编辑权限
  ****/
  actions: {
    // 生成路由
    generateRoutes(roles) {
      return new Promise((resolve) => {
        // 在这判断是否有权限，哪些角色拥有哪些权限
        let accessedRoutes
        console.log('生成路由时打印', roles)
        if (roles && roles.length && !roles.includes('admin')) {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          accessedRoutes = asyncRoutes || []
        }
        accessedRoutes = accessedRoutes.concat(notFoundRouter)
        this.routes = constantRoutes.concat(accessedRoutes)
        this.addRoutes = accessedRoutes
        console.log('生成路由时打印', accessedRoutes)
        console.log('生成路由时打印', this.routes)
        console.log('生成路由时打印', this.addRoutes)
        resolve(accessedRoutes)
      })
    },
    // 清除路由
    clearRoutes() {
      this.routes = []
      this.addRoutes = []
      this.cacheRoutes = []
    },
    getCacheRoutes() {
      this.cacheRoutes = filterKeepAlive(asyncRoutes)
      return this.cacheRoutes
    },
  },
})
