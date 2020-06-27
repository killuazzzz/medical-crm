import request from '@/utils/request'

export function fetchMaintenanceList(data) {
  return request({
    url: '/public/equipment/queryEquipmentDetailList',
    method: 'post',
    data
  })
}
