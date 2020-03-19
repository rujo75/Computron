import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    breadcrumbData: []
  },
  getters: {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getBreadcrumbData: state => state.breadcrumbData
  },
  mutations: {
    toggleSideNavMenuOpenState: function(state) {
      state.sideNavMenuOpenState = !state.sideNavMenuOpenState;
    },
    toggleFavouritesNavMenuOpenState: function(state) {
      state.favouritesNavMenuOpenState = !state.favouritesNavMenuOpenState;
    }
  },
  actions: {}
});
