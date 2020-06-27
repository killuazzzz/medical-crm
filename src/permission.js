import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

function getMenuByName(name, menulist) {
  let menu = {}
  const forFn = function(name, menulist) {
    for (var item of menulist) {
      if (item.name === name) {
        menu = item
      } else {
        if (item.children && item.children.length > 0) {
          forFn(name, item.children)
        }
      }
      if (menu.name) {
        break
      }
    }
  }
  forFn(name, menulist)
  return menu
}

function hasPermission(menus, name) {
  if (!name || !menus) return false
  const menu = getMenuByName(name, menus)
  if (menu.name) {
    return true
  }
  return false
}

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/401', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      if (hasMenus) {
        if (whiteList.indexOf(to.path) !== -1 || whiteList.indexOf(to.name) !== -1) {
          next()
        } else {
          if (hasPermission(store.getters.menus, to.name) || to.path.indexOf('/redirect') > -1) {
            next()
          } else {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
        }
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { menus } = await store.dispatch('user/getInfo')
          if (menus.length === 0) {
            await store.dispatch('user/resetToken')
            Message.error('当前账号没有菜单权限，请联系管理员')
            next(`/login`)
            NProgress.done()
          } else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
