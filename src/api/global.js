import request from '@/utils/request'

// 城市列表
export function fetchRegion(data) {
  return request({
    url: '/user/dictionary/region',
    method: 'post',
    data
  })
}

// 城市列表
export function fetchAllCity(data) {
  return request({
    url: '/user/dictionary/allCity',
    method: 'post',
    data
  })
}

// 科室列表
export function fetchDepartment(data) {
  return request({
    url: '/user/department/queryDepartmentList',
    method: 'post',
    data
  })
}

// 大型医用 设备类别 列表
export function fetchLargeEqCategory(data) {
  return request({
    url: '/equipment/dictionary/largeEqCategory',
    method: 'post',
    data
  })
}

// 大型医用设备品牌名列表
export function fetchClassification(data) {
  return request({
    url: '/equipment/dictionary/classification',
    method: 'post',
    data
  })
}

// 获取系统中所有的医疗机构
export function fetchAllMechanism(data) {
  return request({
    url: '/user/mechanism/queryAllMechanism',
    method: 'post',
    data
  })
}

// 获取单位列表
export function fetchUnitList() {
  return request({
    url: '/equipment/dictionary/unit',
    method: 'post'
  })
}

// 查询设备列表
export function fetchEqiumentList(data) {
  return request({
    url: '/equipment/equipment/queryEqAndTerminalIdIsNotNull',
    method: 'post',
    data
  })
}
