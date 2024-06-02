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
//注册接口

// 获取详情
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
