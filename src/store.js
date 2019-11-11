import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    userimg: null,
    findtag: null,
    pass: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setUserData(state, payload) {
      state.userData = payload;
    },
    setLogData(state, payload) {
      state.findtag = payload[0]
      state.pass = payload[1]
    }

  },
  actions: {
    setLogData({ commit }, data) {
      commit('setLogData', data)
    },
    setUser({ commit }, user) {
      commit("setUser", user);
      commit("setAuth", true);
    },
    setUserData({ commit }, data) {
      commit("setUserData", data);
    },
    logout({ commit }) {
      commit("setUserData", null);
      commit("setUser", null);
      commit('setLogData', [null, null])

    }
  }
});
