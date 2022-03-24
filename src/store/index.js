import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,
  },
  mutations: {
    setLoggedIn(state, status) {
      state.loggedIn = status
    },
  },
  actions: {
  },
})
