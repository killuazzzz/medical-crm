import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import components from './components' // global component
import globalMethods from './utils/global' // global method

Vue.use(Element, {
  size: Cookies.get('size') || 'small'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

Vue.use(globalMethods)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
