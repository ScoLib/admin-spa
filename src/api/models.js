import request from '@/utils/request'

export function getModels() {
  return request({
    url: '/admin/models',
    method: 'get'
  })
}

