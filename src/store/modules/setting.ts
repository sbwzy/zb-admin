import { defineStore } from 'pinia'
import { PRIMARY_COLOR } from '../../config'
import { ref } from 'vue'
import { UploadUserFile } from 'element-plus'
import { xcrwXQ } from '@/api/user'

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
    // 当前App域名
    BASE: 'https://dev.ccgis.cn',

    xiaoQumsg: '', //10 1
    //当前建筑任务id 初始化时默认是最新创建的巡查记录
    xcrwId: 0, //10 1
    notemsg: ref(''), //10 1
    //建筑列表当前分页 //10 1
    pagination: ref({
      currentPage: 1,
      pageSize: 10,
    }),
    cjZt: ref(['待检查', '自查无异常', '自查有异常']), //10 1
    //小区列表数据 10 1
    XiaoQuList: ref([]),
    //建筑幢详情数据 10 1
    MPZInfo: ref([]),
    //建筑户详情信息 10 1
    HuInfo: ref([]),
    //建筑的异常等照片 10 1
    ImgInfo: ref([]),
    //建筑的原照片 10 1
    BImgInfo: ref([]),
    ycmsg: ref(false), //10 1
    // 轨迹信息
    trackInfo: ref({
      //建筑信息
      id: '0', //建筑编号
      xcrwId: '0', //巡查任务id
      MPZId: '100091082', //门牌幢编号
      Y: '31.2426820469793', //房屋新位置经度
      X: '121.460209310194', //房屋新位置纬度
      GuiJiSJ: '', //打卡时间
      WFDK: '', //无法打卡原因
      DDXCTime: '', //到点时间
      BeiZhu: '', //备注
    }),
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

    dqZCZT: ref('待检查'),
    FWYT: ref([
      {
        value: '居住用房',
        text: '居住用房',
      },
      {
        value: '非居生产用房',
        text: '非居生产用房',
      },
      {
        value: '非居办公用房',
        text: '非居办公用房',
      },
      {
        value: '非居营业用房',
        text: '非居营业用房',
      },
    ]),
    fWLXList: ref([
      {
        value: '居住用房',
        text: '居住用房',
      },
      {
        value: '超市（便利店)',
        text: '超市（便利店)',
      },
      {
        value: '商店',
        text: '商店',
      },
      {
        value: '专业市场',
        text: '专业市场',
      },
      {
        value: '餐饮',
        text: '餐饮',
      },
      {
        value: '旅馆',
        text: '旅馆',
      },
      {
        value: '办公楼',
        text: '办公楼',
      },
      {
        value: '工厂',
        text: '工厂',
      },
      {
        value: '站场码头',
        text: '站场码头',
      },
      {
        value: '仓库堆栈',
        text: '仓库堆栈',
      },
      {
        value: '学校',
        text: '学校',
      },
      {
        value: '文化馆',
        text: '文化馆',
      },
      {
        value: '体育场',
        text: '体育场',
      },
      {
        value: '影剧院',
        text: '影剧院',
      },
      {
        value: '福利院',
        text: '福利院',
      },
      {
        value: '医院',
        text: '医院',
      },
      {
        value: '农业建筑',
        text: '农业建筑',
      },
      {
        value: '公共设施用房',
        text: '公共设施用房',
      },
      {
        value: '寺庙教堂',
        text: '寺庙教堂',
      },
      {
        value: '宗祠山庄',
        text: '宗祠山庄',
      },
      {
        value: '其他',
        text: '其他',
      },
    ]),
    pHSYList: ref([
      {
        value: '超负荷使用',
        text: '超负荷使用',
      },
      {
        value: '堆栈',
        text: '堆栈',
      },
      {
        value: '拆改承重结构',
        text: '拆改承重结构',
      },
      {
        value: '大量增加隔墙',
        text: '大量增加隔墙',
      },
      {
        value: '开挖地下空间',
        text: '开挖地下空间',
      },
      {
        value: '其他',
        text: '其他',
      },
    ]),

    //当前小区id
    xcrwXQId: 0,
    //下属公司
    //compList: ref([]),
    //新增用户的列表
    xcrwUserList: ref([]),
    //新建巡查任务的用户信息
    xcrwUser: ref({
      cjrname: '',
      shrName: '',
      status: true,
      jzsl: 0,
      photo: '',
      describe: '',
      createTime: '',
      jzList: [],
    }),
    //新建巡查任务 字段信息
    xcrw: ref({
      id: '',
      name: '',
      date1: '',
      date2: '',
      delivery: true,
      resource: '',
      comps: '',
      clubType: '',
      rwList: [
        // {
        //   cjrname: '用户1',
        //   shrName: '用户1',
        //   status: true,
        //   jzsl: 110,
        //   photo: '15333333333',
        //   describe: '该采集员已负责xx1、xx2等街区',
        //   createTime: '2022-09-02 15:30:20',
        //   jzList: [1,2,3]
        // },
        // {
        //   cjrname: '用户2',
        //   shrName: '用户2',
        //   status: true,
        //   jzsl: 100,
        //   photo: '15311111111',
        //   describe: '该采集员已负责xx3、xx4等街区',
        //   createTime: '2022-09-02 15:30:20',
        //   jzList: [11,21,31]
        // },
        // {
        //   cjrname: '用户3',
        //   shrName: '用户3',
        //   jzsl: 10,
        //   status: true,
        //   photo: '13823456789',
        //   describe: '该采集员已负责xx5、xx6等街区',
        //   createTime: '2022-09-02 15:30:20',
        //   jzList: [12,22,32]
        // },
        // {
        //   cjrname: '用户4',
        //   shrName: '用户4',
        //   jzsl: 0,
        //   status: false,
        //   photo: '13923456789',
        //   describe: '该采集员目前非启用状态',
        //   createTime: '2022-09-02 15:30:20',
        //   jzList: [13,23,33]
        // },
      ], //任务分配列表
    }),
    //(非超级管理员)所有巡查员的列表 管理员也可以采集(所以这个表是管理员和采集员都有)
    xcoptions: ref([
      {
        value: '用户1',
        label: '用户1(仅采集)',
        disabled: false,
      },
      {
        value: '用户2',
        label: '用户2(仅采集)',
        disabled: false,
      },
      {
        value: '用户3',
        label: '用户3(可审核)',
        disabled: false,
      },
      {
        value: '用户4',
        label: '用户4(可审核)',
        disabled: false,
      },
      {
        value: '用户5',
        label: '用户5(仅采集)',
        disabled: false,
      },
    ]),
    //审核员的列表
    shoptions: ref([
      {
        value: '用户3',
        label: '用户3',
        disabled: false,
      },
      {
        value: '用户4',
        label: '用户4',
        disabled: false,
      },
    ]),
    //已选择的建筑列表
    selJZList: [1, 2, 3],
    //搜索条件
    search: ref({
      listtype: '', //类型
      searchType: '', //搜索类型
      //: '采集中',
      regionmap: '',
      type: '',
      jzName: '', //建筑名称
      rwName: '', //任务名称
      xcrwName: '',
      district: null, //区域
      checked1: false,
      checked2: false,
      streetType: '',
      standardType: '',
      buildType: ['优秀历史建筑', '花园住宅'], //房屋类型
      isSelect: ['未勾选'], //巡查任务条件
    }),
    //建筑列表每次保存的建筑列表 10 1
    jzList: ref(),

    gfid: null as string | null, // 初始化为null，类型为string或null
    gfIdList: [] as string[], // 初始化为空数组，元素类型为string
    //巡查列表当前分页
    xcpagination: ref({
      currentPage: 1,
      pageSize: 10,
    }),
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // logout1() {
    //   return new Promise((resolve, reject) => {
    //     this.token = null
    //     this.userInfo = {}
    //     this.roles = []
    //     this.sfRole = []
    //     resolve(null)
    //   })
    // },
    // 设置gfid的action，模拟setter
    setGfid(newValue: string | null) {
      this.gfid = newValue
    },
    // 获取gfid的action，虽然直接访问state.gfid更常见，但这里为了演示模拟getter
    getGfid() {
      return this.gfid
    },
    // 设置gfIdList的action，模拟setter
    setGfIdList(newList: string[]) {
      this.gfIdList = newList
    },
    // 获取gfIdList的action，模拟getter
    getGfIdList() {
      return this.gfIdList
    },
    // 设置主题
    setThemeConfig({ key, val }) {
      this.themeConfig[key] = val
    },
    setXiaoQumsg(value) {
      this.xiaoQumsg = value
    },
    setycmsg(value) {
      this.ycmsg = value
    },
    setnotemsg(value) {
      this.notemsg = value
    },
    // 赋值建筑幢信息
    setXiaoQuInfo(value) {
      this.XiaoQuList = value
    },
    // 赋值建筑幢信息
    setMPZInfo(value) {
      this.MPZInfo = value
    },
    // 赋值建筑幢信息
    setHuInfo(value) {
      this.HuInfo = value
    },
    // 赋值建筑照片异常信息
    setImgInfo(value) {
      this.ImgInfo = value
    },
    // 赋值建筑原照片信息
    setBImgInfo(value) {
      this.BImgInfo = value
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
    setDqZCZT(value) {
      this.dqZCZT = value
    },
    //建筑列表分页
    setPagination(value) {
      this.pagination = value
    },
    //搜索条件
    setSearch(value) {
      this.search = value
    },
    //查询条件
    setFilters(value) {
      this.dynamicFilters = value
    },
    setXcjzList(value) {
      this.xcjzList = value
    },
    setBcjzList(value) {
      this.bcjzList = value
    },
    setXcrwId(value) {
      this.xcrwId = value
    },
    setXcrwXQId(value) {
      this.xcrwXQId = value
    },
    setCompList(value) {
      this.compList = value
    },
    //
    setWcjJzList(value) {
      this.wcjJzList = value
    },
    setCjzJzList(value) {
      this.cjzJzList = value
    },
    setDshJzList(value) {
      this.dshJzList = value
    },
    setShbhJzList(value) {
      this.shbhJzList = value
    },
    setShtgJzList(value) {
      this.shtgJzList = value
    },
    setXcssList(value) {
      this.xcssList = value
    },
    setXcrwUser(value) {
      this.xcrwUser = value
    },
  },
  //这部分数据不需要存储
  persist: {
    // 本地存储的名称
    key: 'settingState',
    //保存的位置
    storage: window.localStorage, //localstorage
  },
})
