import { defineStore } from 'pinia'
import { PRIMARY_COLOR } from '../../config'
import { ref } from 'vue'
import { UploadUserFile } from 'element-plus'

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

    //建筑详情参数
    optionSetting: ref({
      //建筑信息
      caiJiXQ: {
        id: 2252, //建筑编号
        MPZId: '100091082', //门牌幢编号
        locY: '31.2426820469793', //房屋新位置经度
        locX: '121.460209310194', //房屋新位置纬度
        XQMC: '南京东路街道新桥1小区', //建筑名称  小区名称
        XQDZ: '南苏州路1305-1307号', //授权地址  小区地址
        FWLX: '仓库堆栈', //授权房屋类型
        ZRZMS: '', //自然幢描述
        CZMP: '是', //是否存在铭牌
        ZSQK: '否', //是否在征收地块
        MPNR: '仓库建筑。1933年建，砖木结构。装饰艺术派风格。清水砖墙。立面檐口、窗台、窗楣及壁柱有灰色水泥几何形压花装饰，中部成“山”字形，突出主入口。1998年台湾设计师登昆艳用作工作室，开创上海近代工业建筑保护利用的实践。', //保护铭牌内容
        GALP: '南苏州路1305号', //公安绿牌地址
        DKQK: '', //现场带看情况
        XGALP: '', //当前公安绿牌地址
        XFWLX: '', //当前房屋类型
        PHSY: '', //破坏使用类型
        PHQK: '', //破坏情况说明
        PHQKPHOTOS: [], //破坏情况照片
        DJWJ: '', //是否搭建违建
        DJWJSL: '', //搭建违建数量
        DJWJSM: '', //搭建违建说明
        DJWJPHOTOS: [], //搭建违建照片
        WGCH: '', //是否违规拆除
        WGCHLX: '', //违规拆除类型
        WGCHSM: '', //违规拆除说明
        WGCHPHOTOS: [], //违规拆除照片
        SHQK: '', //损坏情况
        SHSM: '', //损坏情况说明
        SHPHOTOS: [], //损坏照片
        ZSFH: '否', //征收复核
        ZSFHSM: '', //征收复核说明
        XSQK: '', //修缮情况
        XSQKSM: '', //修缮情况说明
        XSQKPHOTOS: [], //修缮照片
        ResidentList: [],
      },
      lsxcjl: [], //历史巡查记录
      phoneTypeList: [], //照片信息
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
    // 采集状态
    cjZt: ref(['待检查', '自查无异常', '待审核', '待复核', '复核通过']),
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
    //当前巡查任务id 初始化时默认是最新创建的巡查记录
    xcrwId: 1,
    //下属公司
    compList: ref([]),
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
    // 仪表盘 任务总览
    echartsData: {
      yAxisData: ['孙尚香1', '典韦2', '曹操', '关羽', '公孙瓒', '赵子龙', '董卓'],
      seriesData: [
        { name: '采集中1', data: [320, 2, 301, 334, 390, 330, 320] },
        { name: '待审核2', data: [120, 132, 108, 134, 90, 230, 210] },
        { name: '已审核', data: [220, 182, 230, 120, 290, 330, 310] },
        { name: '今日已完成', data: [150, 212, 201, 154, 190, 330, 410] },
        { name: '全部任务', data: [820, 832, 901, 934, 1290, 1330, 1320] },
      ],
    },
    //建筑列表每次保存的建筑列表 超管能看全部   管理员、采集员看他那部分的列表
    jzList: ref(),
    //当前巡查任务下未采集的建筑列表
    wcjJzList: ref([
      {
        xiaoQu: '福世花园', //小区名称
        //jieZhen: '江苏路街道', // 街镇应该也不需要
        zjZt: '待检查', //自查状态
        shouQuanDZ: '安化路201弄4号', //授权地址
        fwyt: '超市', //房屋业态 (幢)
        fangWuYTOld: '非居住营业用房', //房屋用途 是户 不显示
        xsqk: '修缮中', //修缮情况
        id: '00012',
      },
      {
        xiaoQu: '福世花园', //小区名称
        //jieZhen: '江苏路街道', // 街镇应该也不需要
        zjZt: '待检查', //自查状态
        shouQuanDZ: '安化路201弄5号', //授权地址
        fwyt: '居住用房', //房屋业态 (幢)
        fangWuYTOld: '居住用房', //房屋用途 是户 不显示
        xsqk: '近三年未修缮', //修缮情况
        id: '00011',
      },
      {
        xiaoQu: '福世花园', //小区名称
        //jieZhen: '江苏路街道', // 街镇应该也不需要
        zjZt: '待检查', //自查状态
        shouQuanDZ: '安化路201弄6号', //授权地址
        fwyt: '餐饮', //房屋业态 (幢)
        fangWuYTOld: '非居住营业用房', //房屋用途 是户 不显示
        xsqk: '近三年完成过修缮', //修缮情况
        id: '00010',
      },
    ]),
    //当前巡查任务下采集中的建筑列表
    cjzJzList: ref([]),
    //当前巡查任务下待审核的建筑列表
    dshJzList: ref([]),
    //当前巡查任务下审核驳回的建筑列表
    shbhJzList: ref([]),
    //当前巡查任务下审核通过的建筑列表
    shtgJzList: ref([]),
    //巡查任务每次保存的任务列表 (待删除)
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
      },
    ]),
    //巡查任务列表搜索的列表
    xcssList: ref(),
    //新建巡查任务 未生成任务的原始建筑列表
    xcjzList: ref([
      {
        id: 1,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄1号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房11',
        notemsg: '00004',
        workPerson: '张1',
        isSelect: '未勾选',
      },
      {
        id: 2,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄2号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房12',
        notemsg: '00004',
        workPerson: '张2',
        isSelect: '未勾选',
      },
      {
        id: 3,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄3号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 4,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄4号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房14',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 5,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄5号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 6,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄6号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 7,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄7号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 8,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄8号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 9,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄9号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 10,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄10号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 11,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄11号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 12,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄12号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 13,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄13号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 14,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄14号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 15,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄15号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 16,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄16号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 17,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄17号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 18,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄18号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 19,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄19号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 20,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄21号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 21,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄21号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 22,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄22号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 23,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄23号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 24,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄24号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 25,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄25号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 26,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄26号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 27,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄27号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 28,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄28号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 29,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄29号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 30,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄30号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 31,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄31号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 32,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄32号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 33,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄33号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 34,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄34号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 35,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄35号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 36,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄36号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 37,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄37号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
      {
        id: 38,
        qu: '长宁区',
        xiaoQu: '福世花园',
        jieZhen: '江苏路街道',
        shouQuanDZ: '安化路200弄38号',
        standardType: '花园住宅',
        fangWuYTOld: '非居住办公用房13',
        notemsg: '00004',
        workPerson: '张',
        isSelect: '未勾选',
      },
    ]),
    //新建巡查任务 保存的建筑列表
    bcjzList: ref([]),
    //建筑列表搜索条件
    dynamicFilters: ref([
      // {
      //   label: '采集状态',
      //   key: 'collectionStatus',
      //   type: 'select',
      //   placeholder: '请选择采集状态',
      //   options: [
      //     { label: '采集中', value: '采集中' },
      //     { label: '待审核', value: '待审核' },
      //     { label: '已审核', value: '已审核' },
      //   ],
      // },
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
    //巡查任务搜索条件
    xcrwFilters: ref([
      {
        label: '任务名称',
        key: 'xcrwName',
        type: 'text',
        placeholder: '请输入任务名称',
      },
      {
        label: '巡查类型',
        key: 'collectionStatus1',
        type: 'select',
        placeholder: '请选择巡查类型',
        options: [
          { label: '年度中心巡查', value: '年度中心巡查' },
          { label: '季度中心巡查', value: '季度中心巡查' },
          { label: '季度集团巡查', value: '季度集团巡查' },
          { label: '特殊情况巡查', value: '特殊情况任务' },
        ],
      },
      {
        label: '区域',
        key: 'district',
        type: 'select',
        placeholder: '请选择区域',
        options: [
          { label: '黄浦区', value: '黄浦区' },
          { label: '徐汇区', value: '徐汇区' },
          { label: '长宁区', value: '长宁区' },
          { label: '静安区', value: '静安区' },
          { label: '普陀区', value: '普陀区' },
        ],
      },
      {
        label: '创建单位',
        key: 'dwType',
        type: 'select',
        options: [
          { label: '虹房集团', value: '虹房集团' },
          { label: '南房集团', value: '南房集团' },
          { label: '浦房集团', value: '浦房集团' },
          { label: '卫百辛集团', value: '卫百辛集团' },
          { label: '西部集团', value: '西部集团' },
          { label: '新长宁集团', value: '新长宁集团' },
          { label: '永业集团', value: '永业集团' },
          { label: '金外滩集团', value: '金外滩集团' },
        ],
      },
      {
        label: '创建人',
        key: 'createPerson',
        type: 'text',
        placeholder: '请输入创建人',
      },
    ]),
    //巡查任务建筑列表搜索条件
    dynamicFilters1: ref([
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
        label: '房屋类型',
        key: 'buildType',
        type: 'checkbox',
        placeholder: '房屋类型可选',
        options: [
          { label: '花园住宅', value: '花园住宅' },
          { label: '优秀历史建筑', value: '优秀历史建筑' },
          //...
        ],
      },
      {
        label: '是否勾选',
        key: 'isSelect',
        type: 'checkbox',
        placeholder: '房屋类型可选',
        options: [
          { label: '已勾选', value: '已勾选' },
          { label: '未勾选', value: '未勾选' },
          //...
        ],
      },
    ]),
    //建筑列表当前分页
    pagination: ref({
      currentPage: 1,
      pageSize: 10,
    }),
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
    // 设置主题
    setOptionSetting(value) {
      this.optionSetting = value
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
