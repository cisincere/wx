import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Map(),
    index_main_menu: [],
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIndexMainMenu(state) {
      return state.index_main_menu;
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setIndexMainMenu(state, data) {
      state.index_main_menu = data;
    },
  },
  actions: {
    setUserData({ commit, state }, data) {
      commit('setUser', data);
    },
    setIndexMainMenuData({ commit, state }, data) {
      commit('setIndexMainMenu', data);
    },
  },
});
