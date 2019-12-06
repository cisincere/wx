import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Map(),
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    setUserData({ commit, state }, data) {
      commit('setUser', data);
    },
  },
});
