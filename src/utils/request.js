import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from './../store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

let loadingInstance
let count = 0

service.interceptors.request.use(
  config => {
    config.data = {
      data: config.data,
      header: {
        token: getToken() || ''
      }
    }
    loadingInstance = Loading.service()
    count++
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    count--
    if (count === 0) {
      loadingInstance.close()
    }
    const res = response.data
    if (res.code !== 'AA000000') {
      if (res.code === 'AU000002') {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/logout').then(() => {
          location.reload()
        })
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    count--
    if (count === 0) {
      loadingInstance.close()
    }
    Message({
      message: '服务器错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
