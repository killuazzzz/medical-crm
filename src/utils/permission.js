import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value) {
    const permissionCodes = store.getters && store.getters.permissionCodes

    const hasPermission = permissionCodes.includes(value)

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`no code!!!`)
    return false
  }
}
