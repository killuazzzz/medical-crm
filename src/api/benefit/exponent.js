import request from '@/utils/request'

export function fetchExponentCheckExponent(data) {
  return request({
    url: '/public/benefit/queryEffectiveness',
    method: 'post',
    data
  })
}

export function fetchKpiEffectiveness(data) {
  return request({
    url: '/equipment/equipment/queryKpiEffectiveness',
    method: 'post',
    data
  })
}
