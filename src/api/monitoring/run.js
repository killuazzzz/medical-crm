import request from '@/utils/request'

export function fetchRunList(data) {
  return request({
    url: '/equipment/web/efficiency/queryTerminalWorkHistory',
    method: 'post',
    data
  })
}
