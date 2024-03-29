import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: ''
  },
  mutations: {
    select (state, payload) {
      state.selected = payload
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
