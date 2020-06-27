import request from '@/utils/request'

export function fetchHomeShow(data) {
  return request({
    url: '/public/home/show',
    method: 'post',
    data
  })
}
