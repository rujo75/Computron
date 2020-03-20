import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    breadcrumbData: [{ id: "1" }],
    favouritesListData: []
  },
  getters: {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getBreadcrumbData: state => state.breadcrumbData,
    getFavouritesListData: state => state.favouritesListData
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
    setFavouriteData: function (state, data) {
      state.favouritesListData = data;
    },
    addFavouriteGroupData: function (state, data) {
      state.favouritesListData.push(data);
    },
  },
  actions: {
    setBreadcrumbData({ commit }, data) {
      commit("setBreadcrumbData", data);
    },
    setFavouriteData({ commit }, data) {
      commit("setFavouriteData", data);
    },
    addFavouriteGroupData({ commit }, data) {
      commit("addFavouriteGroupData", data);
    },
  }
});
