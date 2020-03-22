import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    breadcrumbData: [],
    favouritesData: []
  },
  getters: {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getBreadcrumbData: state => state.breadcrumbData,
    getFavouritesData: state => state.favouritesData
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
    setFavouritesData: function (state, data) {
      state.favouritesData = data;
    },
    addFolderToFavouritesData: function (state, data) {
      state.favouritesData.push(data);
    },
    addFavouriteToFavouritesData: function (state, data) {
      // Find the folder
      let index = state.favouritesData.findIndex(
        obj => obj.id === data.folderId
      );
      //console.log("index: " + index)
      //console.log(data.favourite)
      // Add the favourite to the folder
      let newFavourite = data.favourite
      state.favouritesData[index].items.push(newFavourite)
      //Vue.set(state.favouritesData[index].items, 0, data.favourite);
      //console.log(state.favouritesData)
    },
  },
  actions: {
    setBreadcrumbData({ commit }, data) {
      commit("setBreadcrumbData", data);
    },
    setFavouritesData({ commit }, data) {
      commit("setFavouritesData", data);
    },
    addFolderToFavouritesData({ commit }, data) {
      commit("addFolderToFavouritesData", data);
    },
    addFoldeaddFavouriteToFavouritesDatarToFavouritesData({ commit }, data) {
      commit("addFavouriteToFavouritesData", data);
    },
  }
});
