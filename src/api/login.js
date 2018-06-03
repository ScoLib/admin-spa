import request from '@/utils/request'

export function login(userInfo) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: userInfo
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
