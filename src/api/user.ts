import request from './request'

//获取验证码
export function getYZM(data) {
  return request({
    url: '/webapi/getYZM',
    method: 'post',
    data,
  })
}

//注册模块获取区街镇集团物业公司等信息
export function getLocationInfo(data) {
  return request({
    url: '/webapi/youligf.quzhenWY',
    method: 'post',
    data,
  })
}

//登录接口
export const loginInfoUser = (p1, p2) => {
  return request.post('webapi/login', {
    // 到时候更新接口
    username: p1,
    password: p2,
  })
}
//修改密码
export function xgMM(data) {
  return request({
    url: '/webapi/xgMM',
    method: 'post',
    data,
  })
}

//登录 /wuyegl/webapi/login
export const loginInfo = (p1, p2) => {
  return request.post('webapi/login', {
    userPhone: p1,
    userPass: p2,
  })
}
//注册接口

// 获取详情
export const getUserInfo = () => {
  return request.post('webapi/getUserInfo')
}

//详情查看
export const youliCJXQGet = (id) => {
  return request.post('webapi/youlizc.QueryZCXQ', {
    youliId: id,
  })
}

//上传照片
export const editFujian = (params: any) => {
  return request.post('webapi/youlizc.editFujian', params)
}
//删除照片
export const editFujianDel = (id) => {
  return request.post('webapi/youlizc.editFujianDel', {
    fuJianId: id,
  })
}

//提交异常
export const editZCYC = (id) => {
  return request.post('webapi/youlizc.editZCYC', {
    MPZid: id,
  })
}

export function collectionInfo(data) {
  return request({
    url: '/webapi/youligf.youliCJXQ1',
    method: 'post',
    data,
  })
}
//获取小区列表
export function buildListinfo() {
  return request({
    url: '/webapi/youlizc.TongJiXiaoQu',
    method: 'post',
  })
}
//获取建筑列表
export function buildListinfo1(data, statues, jzName) {
  return request.post('/webapi/youlizc.QueryZCList', {
    XiaoQuId: data,
    ZCZT: statues,
    SSTJ: jzName,
  })
}

/**
 * 查询-建筑列表
 * 触发条件   1. 登录的返回结果。 0页 10条
 * 2. 搜索结果列表，根据条件搜索建筑列表，并返回搜索结果。搜索条件 0  看设置多少条
 * 3. 切换页 和 切换 每页数据   看那一页 多少条
 * 4. 详情里面触发 上报或者报错等  也会触发 (注意有些特殊情况  比如最后一页 只有一条数据怎么操作)
 * 5 等等
 *
 * @param params - 一个对象，包含了提交给后台的所有参数。
 * @param
 *
 */
// interface QueryZCListCS {

//   dlStatus?: boolean; // 是否登录触发
//   cxStatue?: boolean; // 是否搜索触发
//   fyStatue?: boolean; //是否分页触发
//   searchType?: string; //搜索类型  模糊还是精确
//   qhStatues?: boolean; //是否切换类型触发
//   qhType?: string; // 待检查还是 无异常等
//   jzName?: string; // 模糊查询的建筑信息
//   district?: Array<Object>; //勾选的区域小区
//   buildingName?:string; //建筑名称
//   page?: number; //哪页
//   pageSize?: number; //每页多少条

// }
// //查询建筑列表
// export function buildListinfo(params: QueryZCListCS) {
//   return request.post('webapi/youlizc.QueryZCList', params)
// }

/**
 * 构建操作请求
 *
 * 本函数用于向特定接口发送POST请求，以提交某种操作。操作的具体细节由传入的参数决定。
 * 提交待审批\撤回审批 (领取作业\丢弃作业) 审批同意  审批拒绝
 * @param gfids 关联的GFD IDs，用于指定操作的对象。
 * @param option 操作类型，决定请求的处理方式。1 领取作业 2 丢弃作业 3 审批同意 4 审批拒绝 5 撤回审批 6  提交待审批
 * @param descShenHe 描述审核，对操作的额外说明或备注。
 * @returns 返回一个Promise，解析后的结果是请求的响应数据。
 */
export function buildOperation(gfids, option, descShenHe) {
  // 发送POST请求到指定接口，携带必要的参数
  return request.post('webapi/youligf.tijiaoSp', {
    gfids: gfids,
    opeType: option,
    descShenHe: descShenHe,
  })
}
/**
 * 模糊搜索 和详细搜索
 *
 * 本函数用于向特定接口发送POST请求，以提交某种操作。操作的具体细节由传入的参数决定。
 * 根据查询条件进行搜索
 * @param type 哪种条件搜索  建筑列表 还是巡查任务列表等
 * @param search 搜索条件对象
 * @returns 返回一个Promise，解析后的结果是请求的响应数据。
 */

// 定义一个接口来描述参数对象的结构
interface YouliSearchParams {
  listtype: string
  collectionStatus: string
  regionmap: string
  type: string
  jzName: string
  rwName: string
  district: string
  checked1: boolean
  checked2: boolean
  streetType: string
  standardType: string
  isSelect: Array<string>
}
export function getYouliList(params: YouliSearchParams) {
  return request.post('webapi/youligf.youliQuery', params)
}

/**
 * 提交信息给后台接口。
 *
 * 该函数通过发送POST请求到指定的API endpoint，来提交包含各种参数的信息。
 * 主要用于房地产相关的信息记录，参数涵盖了建筑的基本信息、使用情况等。
 *
 * @param params - 一个对象，包含了提交给后台的所有参数。
 * @param params.gfID - 建筑ID，用于唯一标识一个建筑。
 * @param params.chanYeZT - 产业类型，描述建筑的用途性质。
 * @param params.fangWuYT - 房屋用途，描述建筑的具体使用功能。
 * @param params.shiYongR - 使用人，记录建筑的当前使用者。
 * @param params.desc - 外业巡查情况备注，用于记录对外业巡查的额外说明。
 * @param params.desc2 - 建筑现状，描述建筑目前的状态。
 * @param params.dkdesc - 现场带看情况，记录现场查看时的详细情况。
 * @param params.sfmpqs - 铭牌是否缺失，用于标记建筑铭牌的完整性。
 * @returns 返回一个Promise，解析后的结果是请求的响应数据。
 */
interface xinXiGXParams {
  gfID: string // 建筑ID
  chanYeZT: string // 产业类型
  fangWuYT: string // 房屋用途
  shiYongR: string // 使用人
  desc: string // 外业巡查情况备注
  desc2: string // 建筑现状
  dkdesc: string // 现场带看情况
  sfmpqs: string // 铭牌是否缺失
}

/**
 * 调用xinXiGX接口 提交信息(提交待审批)
 *
 * 本函数用于发送一个POST请求到'webapi/youligf.xinXiGX'接口，以获取信息。
 * @param params 请求参数，具体结构由xinXiGXParams定义
 * @returns 返回请求的结果，通常是一个包含响应数据的对象
 */
export function xinXiGX(params: xinXiGXParams) {
  return request.post('webapi/youligf.xinXiGX', params)
}

//查看巡查任务详情   替换接口
export const xcrwXQ = (id) => {
  return request.post('webapi/youligf.youliCJXQ', {
    xcrwId: id,
  })
}

//轨迹信息提交
interface trackInfo {
  MPZid: string //建筑编号
  xcrwId: string //巡查任务编号
  tdty: number //房屋新位置经度 31.2426820469793
  tdtx: number //房屋新位置经度 121.460209310194
  isDK: boolean //是否打卡
  errorStatus: number //打卡状态
  errorReson: string //打卡失败原因
  GuiJiSJ: string //打卡时间
  WFDK: string //无法打卡原因
  DDXCTime: string //到点时间
  BeiZhu: string //备注
}
export function saveTrackInfo(params: any) {
  return request.post('webapi/youlizc.editdaka', params)
}

//巡查任务详情
interface xcrwParams {
  id: string
  name: string
  date1: string
  date2: string
  status: boolean
  resource: string
  desc: string
  clubType: string
  rwList: Array<{
    cjrname: string
    shrName: string
    status: boolean
    jzsl: number
    photo: string
    describe: string
    createTime: string
  }>
}
export function saveXcrw(params: xcrwParams) {
  return request.post('webapi/youligf.youlixcQuery', params)
}

export function getQueryMPZInfo() {
  return request.post('webapi/youlizc.editFetchGongFang')
}

export function editZC(params: any) {
  return request.post('webapi/youlizc.editZC', params)
}

export function logout() {
  return request.post('webapi/logout')
}
