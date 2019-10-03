import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    userData: null,
    isAuth: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuth(state, payload) {
      state.isAuth = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
      commit("setAuth", true);
    },
    setUserData({ commit }, data) {
      commit("setUserData", data);
    },
    logut({ commit }) {
      commit("setAuth", false);
      commit("setUserData", null);
      commit("setUser", null);
      router.push("/");
    }
  }
});
