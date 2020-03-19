import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    breadcrumbData: [{ id: "1" }]
  },
  getters: {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getBreadcrumbData: state => state.breadcrumbData
  },
  mutations: {
    toggleSideNavMenuOpenState: function (state) {
      state.sideNavMenuOpenState = !state.sideNavMenuOpenState;
    },
    toggleFavouritesNavMenuOpenState: function (state) {
      state.favouritesNavMenuOpenState = !state.favouritesNavMenuOpenState;
    },
    setBreadcrumbData: function (state, data) {
      state.breadcrumbData = data;
    },
  },
  actions: {
    setBreadcrumbData({ commit }, data) {
      commit("setBreadcrumbData", data);
    },
  }
});
