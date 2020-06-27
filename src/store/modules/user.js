import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { joinMenusParams } from '@/utils/index'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  roleId: '',
  roleName: '',
  userName: '',
  loginAccount: '',
  permissionCodes: [],
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGINACCOUNT: (state, loginAccount) => {
    state.loginAccount = loginAccount
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_ROLENAME: (state, roleName) => {
    state.roleName = roleName
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PERMISSIONCODES: (state, permissionCodes) => {
    state.permissionCodes = permissionCodes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        const {
          currentUserInfo: { roleId, roleName, userName, loginAccount },
          menus,
          permissionCodes
        } = data

        commit('SET_ROLEID', roleId)
        commit('SET_ROLENAME', roleName)
        commit('SET_USERNAME', userName)
        commit('SET_LOGINACCOUNT', loginAccount)
        commit('SET_MENUS', joinMenusParams(menus))
        commit('SET_PERMISSIONCODES', permissionCodes)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        commit('SET_ROLENAME', '')
        commit('SET_USERNAME', '')
        commit('SET_LOGINACCOUNT', '')
        commit('SET_MENUS', [])
        commit('SET_PERMISSIONCODES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLEID', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
