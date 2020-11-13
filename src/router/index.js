import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      icon: 's-tools',
      title: '系统配置'
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/system/role/role'),
        name: 'SystemRole',
        meta: { title: '角色配置' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      icon: 'user',
      title: '用户管理'
    },
    children: [
      {
        path: 'account',
        component: () => import('@/views/user/account/account'),
        name: 'UserAccount',
        meta: { title: '账号管理' }
      },
      {
        path: 'mechanism',
        component: () => import('@/views/user/mechanism/mechanism'),
        name: 'UserMechanism',
        meta: { title: '医疗机构管理' }
      }
    ]
  },
  {
    path: '/medical',
    component: Layout,
    name: 'Medical',
    meta: {
      icon: 'component',
      title: '医疗设备信息管理'
    },
    children: [
      {
        path: 'equipment',
        component: () => import('@/views/medical/equipment/equipment'),
        name: 'MedicalEquipment',
        meta: { title: '医疗设备管理' }
      }
    ]
  },
  {
    path: '/benefit',
    component: Layout,
    name: 'Benefit',
    meta: {
      icon: 'benefit',
      title: '医疗设备效益管理'
    },
    children: [
      {
        path: 'month',
        component: () => import('@/views/benefit/month/month'),
        name: 'BenefitMonth',
        meta: { title: '医疗设备月报表' }
      },
      {
        path: 'year',
        component: () => import('@/views/benefit/year/year'),
        name: 'BenefitYear',
        meta: { title: '医疗设备年报表' }
      },
      {
        path: 'yield',
        component: () => import('@/views/benefit/yield/yield'),
        name: 'BenefitYield',
        meta: { title: '医疗设备收益率查询' }
      },
      {
        path: 'exponent',
        component: () => import('@/views/benefit/exponent/exponent'),
        name: 'BenefitExponent',
        meta: { title: '医疗设备效率KPI指标分析' }
      }
    ]
  },
  {
    path: '/monitoring',
    component: Layout,
    name: 'Monitoring',
    meta: {
      icon: 'monitoring',
      title: '医疗设备效率管理'
    },
    children: [
      {
        path: 'run',
        component: () => import('@/views/monitoring/run/run'),
        name: 'MonitoringRun',
        meta: { title: '医疗设备运行日志' }
      },
      // {
      //   path: 'off',
      //   component: () => import('@/views/monitoring/off/off'),
      //   name: 'MonitoringOff',
      //   meta: { title: '医疗设备离线状态查询' }
      // },
      {
        path: 'month',
        component: () => import('@/views/monitoring/month/month'),
        name: 'RunMonthlyReport',
        meta: { title: '医疗设备运行月报' }
      }
    ]
  },
  {
    path: '/terminal',
    component: Layout,
    name: 'Terminal',
    meta: {
      icon: 'terminal',
      title: '终端运行参数'
    },
    children: [
      {
        path: 'operation',
        component: () => import('@/views/terminal/operation/operation'),
        name: 'TerminalOperation',
        meta: { title: '医疗设备运行基础数据' }
      },
      {
        path: 'maintenance',
        component: () => import('@/views/terminal/maintenance/maintenance'),
        name: 'TerminalMaintenance',
        meta: { title: '医疗设备运维基础数据' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
