import request from '@/utils/request'

export function fetchMonitoringMonthList(data) {
  return request({
    url: '/public/runMonthlyReport/statistics',
    method: 'post',
    data
  })
}
