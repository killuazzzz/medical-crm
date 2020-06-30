import request from '@/utils/request'

export function fetchMaintenanceList(data) {
  return request({
    url: '/equipment/web/param/queryTerminalDetailList',
    method: 'post',
    data
  })
}
