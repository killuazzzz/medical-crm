import request from '@/utils/request'

export function fetchOperationList(data) {
  return request({
    url: '/public/hardware/queryTerminalWorkParams',
    method: 'post',
    data
  })
}

export function fetchOperationUpdate(data) {
  return request({
    url: '/hardware/terminal/updateTerminalParam',
    method: 'post',
    data
  })
}

export function fetchOperationBind(data) {
  return request({
    url: '/equipment/web/param/bindEquipment',
    method: 'post',
    data
  })
}

export function fetchOperationUnbind(data) {
  return request({
    url: '/equipment/web/param/unBindEquipment',
    method: 'post',
    data
  })
}
