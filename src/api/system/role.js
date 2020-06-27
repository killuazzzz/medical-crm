import request from '@/utils/request'

export function fetchRoleList(data) {
  return request({
    url: '/public/permission/queryRoleList',
    method: 'post',
    data
  })
}

export function fetchRoleAllInfo(data) {
  return request({
    url: '/public/permission/queryCurrentProjectPermis',
    method: 'post',
    data
  })
}

export function fetchRoleInfo(data) {
  return request({
    url: '/permission/permission/queryRoleMenuPermi',
    method: 'post',
    data
  })
}

export function fetchRoleAdd(data) {
  return request({
    url: '/permission/role/addRole',
    method: 'post',
    data
  })
}

export function fetchRoleUpdate(data) {
  return request({
    url: '/permission/role/updateRolePermission',
    method: 'post',
    data
  })
}

export function fetchRoleUpdateScope(data) {
  return request({
    url: '/user/user/updateRoleDataScope',
    method: 'post',
    data
  })
}
