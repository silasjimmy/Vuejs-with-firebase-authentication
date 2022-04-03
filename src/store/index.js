import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    online: true,
  },
  mutations: {
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
