import request from '@/utils/request'

export function fetchEquipmentList(data) {
  return request({
    url: '/equipment/equipment/list',
    method: 'post',
    data
  })
}

export function fetchEquipmentDetail(data) {
  return request({
    url: '/public/equipment/detail',
    method: 'post',
    data
  })
}

export function fetchEquipmentAdd(data) {
  return request({
    url: '/public/equipment/add',
    method: 'post',
    data
  })
}

export function fetchEquipmentUpdate(data) {
  return request({
    url: '/equipment/equipment/edit',
    method: 'post',
    data
  })
}
export function fetchEquipmentAccessoryList(data) {
  return request({
    url: '/equipment/equipment/accessory',
    method: 'post',
    data
  })
}

export function fetchEquipmentAccessoryAdd(data) {
  return request({
    url: '/equipment/equipment/accessory/add',
    method: 'post',
    data
  })
}

export function fetchEquipmentConsumablesList(data) {
  return request({
    url: '/equipment/equipment/consumables',
    method: 'post',
    data
  })
}

export function fetchEquipmentConsumablesAdd(data) {
  return request({
    url: '/equipment/equipment/consumables/add',
    method: 'post',
    data
  })
}
