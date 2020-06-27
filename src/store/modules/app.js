import Cookies from 'js-cookie'
import { Loading } from 'element-ui'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  openLoadingCount: 0,
  loadingInstance: null
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  OPEN_LOADING: (state) => {
    state.loadingInstance = Loading.service({ fullscreen: true, body: true })
  },
  CLOSE_LOADING: (state) => {
    if (state.loadingInstance) {
      state.loadingInstance.close()
    }
  },
  ADD_LOADINGCOUNT: (state) => {
    state.openLoadingCount++
  },
  SUB_LOADINGCOUNT: (state) => {
    state.openLoadingCount--
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setLoading({ commit, state }, bool) {
    if (bool) {
      commit('OPEN_LOADING')
      commit('ADD_LOADINGCOUNT')
    } else {
      commit('SUB_LOADINGCOUNT')
      if (state.openLoadingCount === 0) {
        commit('CLOSE_LOADING')
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
