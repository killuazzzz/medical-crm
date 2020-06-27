import request from '@/utils/request'

export function fetchAccountList(data) {
  return request({
    url: '/public/user/queryHospitalAccountList',
    method: 'post',
    data
  })
}

export const uploadAccountUrl = '/user/file/uploadHospitalUserExcel'

export const downloadAccountUrl = '/user/file/downloadHospitalUserExcel'

export function fetchAccountAdd(data) {
  return request({
    url: '/user/user/addHospitalUser',
    method: 'post',
    data
  })
}

export function fetchAccountUpdateRole(data) {
  return request({
    url: '/user/user/updateUserRole',
    method: 'post',
    data
  })
}

// 更新用户所属的科室
export function fetchAccountUpdateUserDepartment(data) {
  return request({
    url: '/user/user/updateUserDepartment',
    method: 'post',
    data
  })
}

// 更新用户所属的医疗机构
export function fetchAccountUpdateUserMechanism(data) {
  return request({
    url: '/user/user/updateUserMechanism',
    method: 'post',
    data
  })
}

