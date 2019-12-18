import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new Map(),
    index_main_menu: [],
    state_code: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIndexMainMenu(state) {
      return state.index_main_menu;
    },
    getStateCode(state) {
      return state.state_code;
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setIndexMainMenu(state, data) {
      state.index_main_menu = data;
    },
    setStateCode(state, data) {
      state.state_code = data;
    },
  },
  actions: {
    setUserData({ commit, state }, data) {
      commit('setUser', data);
    },
    setIndexMainMenuData({ commit, state }, data) {
      commit('setIndexMainMenu', data);
    },
    setStateCodeData({ commit, state }, data) {
      commit('setStateCode', data);
    },
  },
});
