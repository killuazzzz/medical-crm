import request from '@/utils/request'

export function fetchMonthList(data) {
  return request({
    url: '/public/benefit/month',
    method: 'post',
    data
  })
}

export function fetchMonthCheckMonth(data) {
  return request({
    url: '/hardware/statistics/queryBenefitMonth',
    method: 'post',
    data
  })
}

export function fetchMonthCheckYear(data) {
  return request({
    url: '/hardware/statistics/queryBenefitYear',
    method: 'post',
    data
  })
}
