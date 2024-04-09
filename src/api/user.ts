import request from './request'

export function login(data) {
  return request({
    url: '/webapi/getYZM',
    method: 'post',
    data,
  })
}
