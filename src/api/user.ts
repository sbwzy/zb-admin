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
  listtype: string,
  collectionStatus: string,
  regionmap: string,
  type: string,
  jzName: string,
  rwName: string,
  district: string,
  checked1: boolean,
  checked2: boolean,
  streetType: string,
  standardType: string,
  isSelect: Array<string>
}
export function getYouliList(params: YouliSearchParams) {
  return request.post('webapi/youligf.youliQuery',params)
}
