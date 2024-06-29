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

//登录 /wuyegl/webapi/login
export const loginInfo = (p1, p2) => {
  return request.post('webapi/login', {
    phone: p1,
    yzm: p2,
  })
}
//注册接口

// 获取详情

//详情查看
export const youliCJXQGet = (id) => {
  return request.post('webapi/youligf.youliCJXQ', {
    gfid: id,
  })
}

export function collectionInfo(data) {
  return request({
    url: '/webapi/youligf.youliCJXQ1',
    method: 'post',
    data,
  })
}

//获取建筑列表
export function buildListinfo1(data) {
  return request({
    url: '/webapi/youligf.youliQuery1',
    method: 'post',
    data,
  })
}

//获取建筑列表
export function buildListinfo(data) {
  return request({
    url: '/webapi/youligf.youliQuery',
    method: 'post',
    data,
  })
}

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
  gfID: string  // 建筑ID
  chanYeZT: string  // 产业类型
  fangWuYT: string  // 房屋用途
  shiYongR: string  // 使用人
  desc: string  // 外业巡查情况备注
  desc2: string // 建筑现状
  dkdesc: string  // 现场带看情况
  sfmpqs: string  // 铭牌是否缺失
}

/**
 * 调用xinXiGX接口
 * 
 * 本函数用于发送一个POST请求到'webapi/youligf.xinXiGX'接口，以获取信息。
 * @param params 请求参数，具体结构由xinXiGXParams定义
 * @returns 返回请求的结果，通常是一个包含响应数据的对象
 */
export function xinXiGX(params: xinXiGXParams) {
  return request.post('webapi/youligf.xinXiGX', params)
}
