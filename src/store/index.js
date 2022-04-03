import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultSate = {
  user: {
    email: ""
  },
  loadingOverlay: false,
  loggedIn: null,
  online: false,
}

export default new Vuex.Store({
  state: { ...defaultSate },
  mutations: {
    resetState(state) {
      Object.assign(state, defaultSate)
    },
    setLoadingOverlay(state, status) {
      state.loadingOverlay = status
    },
    setUser(state, user) {
      state.user = { ...user }
    },
    setLoggedIn(state, status) {
      state.loggedIn = status
    },
    setOnline(state, status) {
      state.online = status
    },
  },
  actions: {
  },
})
