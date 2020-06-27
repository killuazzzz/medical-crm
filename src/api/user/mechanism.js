import request from '@/utils/request'

export function fetchMechanismList(data) {
  return request({
    url: '/user/mechanism/list',
    method: 'post',
    data
  })
}

export function fetchMechanismAdd(data) {
  return request({
    url: '/user/mechanism/add',
    method: 'post',
    data
  })
}

export function fetchMechanismUpdate(data) {
  return request({
    url: '/user/mechanism/edit',
    method: 'post',
    data
  })
}

export function fetchMechanismDel(data) {
  return request({
    url: '/user/mechanism/del',
    method: 'post',
    data
  })
}
