import request from '@/utils/request'

export function fetchYieldCheckYield(data) {
  return request({
    url: '/hardware/statistics/queryBenefitIncome',
    method: 'post',
    data
  })
}
