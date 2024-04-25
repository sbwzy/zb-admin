import request from './request'

export function login(data) {
  return request({
    url: '/webapi/getYZM',
    method: 'post',
    data,
  })
}

export function getLocationInfo(data) {
  return request({
    url: '/webapi/caijiOK1',
    method: 'post',
    data,
  })
}
