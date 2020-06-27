const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  permissionCodes: state => state.user.permissionCodes,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // 权限相关的
  pDashboard: state => state.permission.pDashboard,
  pSystem: state => state.permission.pSystem,
  pUser: state => state.permission.pUser,
  pMedical: state => state.permission.pMedical,
  pMonitoring: state => state.permission.pMonitoring,
  pBenefit: state => state.permission.pBenefit,
  pTerminal: state => state.permission.pTerminal
}
export default getters
