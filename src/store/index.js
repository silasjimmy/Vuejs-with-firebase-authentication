import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultSate = {
  user: {
    email: ""
  },
  loggedIn: false,
  online: false,
}

export default new Vuex.Store({
  state: { ...defaultSate },
  mutations: {
    reset_state(state) {
      Object.assign(state, defaultSate)
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
