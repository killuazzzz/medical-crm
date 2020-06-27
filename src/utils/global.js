import checkPermission from './permission'

export default function install(Vue, options) {
  Vue.prototype.checkPermission = checkPermission
}
