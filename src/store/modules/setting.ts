import { defineStore } from 'pinia'
import { PRIMARY_COLOR } from '../../config'
import { ref } from 'vue'

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',
  // state: 返回对象的函数
  state: () => ({
    // menu 是否收缩
    isCollapse: true,
    //
    withoutAnimation: false,
    device: 'desktop',
    // 刷新当前页
    isReload: true,
    // 主题设置
    themeConfig: {
      // 显示设置
      showSetting: false,
      // 菜单展示模式 默认 vertical   horizontal / vertical /columns
      mode: 'vertical',
      // tagsView 是否展示 默认展示
      showTag: true,
      // 页脚
      footer: true,
      // 深色模式 切换暗黑模式
      isDark: false,
      // 显示侧边栏Logo
      showLogo: true,
      // 主题颜色
      primary: PRIMARY_COLOR,
      // element组件大小
      globalComSize: 'small',
      // 是否只保持一个子菜单的展开
      uniqueOpened: true,
      // 固定header
      fixedHeader: true,
      // 灰色模式
      gray: false,
      // 色弱模式
      weak: false,
    },
    //新建巡查任务 字段信息
    xcrw: {
      name: '',
      //region: '',
      date1: '',
      date2: '',
      delivery: false,
      resource: '',
      desc: '',
      clubType: '',
    },
    //已选择的建筑列表
    selJZList: [1, 2, 3],
    //搜索条件
    search: ref({
      listtype: '', //类型
      collectionStatus: '',
      regionmap: '',
      type: '',
      jzName: '', //建筑名称
      rwName: '', //任务名称
      district: null, //区域
      checked1: false,
      checked2: false,
      streetType: '',
      standardType: '',
      isSelect: ['未勾选'],
    }),
    //建筑列表每次保存的建筑列表
    jzList: ref([
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄7号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00001',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00002',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄6号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00003',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄4号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00004',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00005',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄6号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00006',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄4号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00007',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00008',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄6号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00009',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄4号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00010',
      },
      {
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        cjZt: '采集中',
        shouQuanDZ: '安化路200弄4号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        id: '00011',
      },
    ]),

    //建筑列表分页
    pagination:ref({
      currentPage: 1,
      pageSize: 10,
    })
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 设置主题
    setThemeConfig({ key, val }) {
      this.themeConfig[key] = val
    },
    // 切换 Collapse
    setCollapse(value) {
      this.isCollapse = value
      this.withoutAnimation = false
    },
    // 关闭侧边栏
    closeSideBar({ withoutAnimation }) {
      this.isCollapse = false
      this.withoutAnimation = withoutAnimation
    },
    toggleDevice(device) {
      this.device = device
    },
    // 刷新
    setReload() {
      this.isReload = false
      setTimeout(() => {
        this.isReload = true
      }, 50)
    },
    //新建巡查任务时候 在未保存时候 缓存到本地
    setXcrw(value) {
      this.xcrw = value
    },
    //建筑列表每次搜索时保存到本地
    setJzList(value) {
      this.jzList = value
    },
    //建筑列表分页
    setPagination(value) {
      this.pagination = value
    },
    //搜索条件
    setSearch(value) {
      this.search = value
    },
  },
  // 这部分数据不需要存储
  // persist: {
  //     // 本地存储的名称
  //     key: "settingState",
  //     //保存的位置
  //     storage: window.localStorage,//localstorage
  // },
})
