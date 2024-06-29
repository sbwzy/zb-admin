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
      searchType:'', //搜索类型
      collectionStatus: '采集中',
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
    //巡查任务每次保存的建筑列表
    xcList: ref([
      {
        id: 1,
        renwuName: '24年度第一季度巡查任务',
        xcsjS: '2024-2月',
        xcsjE: '2024-5月',
        type: '年度中心巡查',
        cjdw: '物业管理中心',
        cjr: 'xxxx',
        progress: '进行中',
        //jieZhen: 'jieZhen',
        shouQuanDZ: '安化路200弄7号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        notemsg: '00001',
      },
      {
        id: 2,
        renwuName: '24年度第二季度巡查任务',
        xcsjS: '2024-6月',
        xcsjE: '2024-9月',
        type: '季度中心巡查',
        cjdw: '物业管理中心',
        cjr: 'xxxx',
        progress: '进行中', //任务进展情况
        //jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        notemsg: '00002',
      },
      {
        id: 3,
        renwuName: '24年度第二季度重点巡查任务',
        xcsjS: '2024-6月',
        xcsjE: '2024-6月',
        type: '特殊情况巡查',
        cjdw: '物业管理中心',
        cjr: 'xxxx',
        progress: '未开始',
        //jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房',
        notemsg: '00003',
      }
    ]),
    //建筑列表搜索条件
    dynamicFilters: ref([
      {
        label: '采集状态',
        key: 'collectionStatus',
        type: 'select',
        placeholder: '请选择采集状态',
        options: [
          { label: '采集中', value: '采集中' },
          { label: '待审核', value: '待审核' },
          { label: '已审核', value: '已审核' },
        ],
      },
      {
        label: '区域/小区',
        key: 'district',
        type: 'duoxuan',
        placeholder: '请选择',
        options: [
          {
            value: '徐汇',
            label: '徐汇',
            children: [
              {
                value: '天平路',
                label: '天平路',
                children: [
                  {
                    value: '上海新村直管公房',
                    label: '上海新村直管公房',
                  },
                  {
                    value: '京剧院小区',
                    label: '京剧院小区',
                  },
                  {
                    value: '伊丽莎白公寓',
                    label: '伊丽莎白公寓',
                  },
                  {
                    value: '余庆直管公房',
                    label: '余庆直管公房',
                  },
                  {
                    value: '吴兴直管公房',
                    label: '吴兴直管公房',
                  },
                ],
              },
              {
                value: '徐家汇',
                label: '徐家汇',
                children: [
                  {
                    value: '徐家汇街道淮海西路345弄小区',
                    label: '徐家汇街道淮海西路345弄小区',
                  },
                  {
                    value: '漕北高层',
                    label: '漕北高层',
                  },
                ],
              },
              {
                value: '枫林路',
                label: '枫林路',
                children: [
                  {
                    value: '天钥新村',
                    label: '天钥新村',
                  },
                  {
                    value: '谨斜小区',
                    label: '谨斜小区',
                  },
                ],
              },
              {
                value: '湖南路',
                label: '湖南路',
                children: [
                  {
                    value: '东湖直管公房',
                    label: '东湖直管公房',
                  },
                  {
                    value: '中兴小区',
                    label: '中兴小区',
                  },
                  {
                    value: '中南小区',
                    label: '中南小区',
                  },
                ],
              },
            ],
          },
          {
            value: '普陀',
            label: '普陀',
            children: [
              {
                value: '曹杨新村',
                label: '曹杨新村',
                children: [
                  {
                    value: '曹杨一村（源园）',
                    label: '曹杨一村（源园）',
                  },
                ],
              },
              {
                value: '长寿路',
                label: '长寿路',
                children: [
                  {
                    value: '长寿路街道康宁小区',
                    label: '长寿路街道康宁小区',
                  },
                  {
                    value: '长寿路街道澳门路660弄小区',
                    label: '长寿路街道澳门路660弄小区',
                  },
                ],
              },
            ],
          },
          {
            value: '杨浦',
            label: '杨浦',
            children: [
              {
                value: '五角场',
                label: '五角场',
                children: [
                  {
                    value: '长海路街道国京41号小区',
                    label: '长海路街道国京41号小区',
                  },
                  {
                    value: '长海路街道市光路三十六宅 (东块）小区',
                    label: '长海路街道市光路三十六宅 (东块）小区',
                  },
                ],
              },
              {
                value: '大桥',
                label: '大桥',
                children: [
                  {
                    value: '平青小区',
                    label: '平青小区',
                  },
                ],
              },
              {
                value: '定海路',
                label: '定海路',
                children: [
                  {
                    value: '130街坊 贵阳路、海州路、凉州路',
                    label: '130街坊 贵阳路、海州路、凉州路',
                  },
                  {
                    value: '定海街道137街坊048小区',
                    label: '定海街道137街坊048小区',
                  },
                ],
              },
              {
                value: '平凉路',
                label: '平凉路',
                children: [
                  {
                    value: '隆昌路331号、355弄',
                    label: '隆昌路331号、355弄',
                  },
                  {
                    value: '41街坊龙江路',
                    label: '41街坊龙江路',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: '建筑名称',
        key: 'buildingName',
        type: 'text',
        placeholder: '请输入建筑名称',
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
    //查询条件
    setFilters(value) {
      this.dynamicFilters = value
    }
  },
  // 这部分数据不需要存储
  // persist: {
  //     // 本地存储的名称
  //     key: "settingState",
  //     //保存的位置
  //     storage: window.localStorage,//localstorage
  // },
})
