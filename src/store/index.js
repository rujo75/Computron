import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    singInVisible: true,
    breadcrumbData: [],
    favouritesData: [{ id: "334127A259764614B8B9A5E8551D6B13", text: "My Favourites", expanded: true, icon: "fas fa-folder", isFolder: true, items: [] }],
    favouritesSelectedItemData: null,
    lastSelectedFavouriteFolder: null
  },
  getters: {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getSignInVisible: state => state.singInVisible,
    getBreadcrumbData: state => state.breadcrumbData,
    getFavouritesData: state => state.favouritesData,
    getFavouritesSelectedItemData: state => state.favouritesSelectedItemData,
    getLastSelectedFavouriteFolder: state => state.lastSelectedFavouriteFolder
  },
  mutations: {
    toggleSideNavMenuOpenState: function (state) {
      state.sideNavMenuOpenState = !state.sideNavMenuOpenState;
    },
    toggleFavouritesNavMenuOpenState: function (state) {
      state.favouritesNavMenuOpenState = !state.favouritesNavMenuOpenState;
    },
    setSingInVisible: function (state, data) {
      state.singInVisible = data;
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
    updateFolderInFavouritesData: function (state, data) {
      let index = state.favouritesData.findIndex(
        obj => obj.id === data.id
      );
      Vue.set(state.favouritesData[index], "text", data.text);
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
      //console.log(state.favouritesData)
    },
    deleteFavouriteFromFavouritesData: function (state, data) {
      if (data.isFolder) {
        // Folder passed in to delete. Find folder index in array
        let index = state.favouritesData.findIndex(
          obj => obj.id === data.id
        );
        // Delete folder if found in array
        if (index >= 0) {
          state.favouritesData.splice(index, 1)
        }
      } else {
        //console.log(data)
        //console.log(state.favouritesData)
        // Iterate over all folders in favouritesData array
        for (let folderIndex = 0; folderIndex < state.favouritesData.length; folderIndex++) {
          // Iterate over all favourites in the current folder
          for (let favouriteIndex = 0; favouriteIndex < state.favouritesData[folderIndex].items.length; favouriteIndex++) {
            if (state.favouritesData[folderIndex].items[favouriteIndex].id === data.id) {
              // Favourite found. Delete it from the array
              //console.log("found")
              state.favouritesData[folderIndex].items.splice(favouriteIndex, 1)
            }
          }
        }
      }
    },
    setFavouritesSelectedItemData: function (state, data) {
      state.favouritesSelectedItemData = data;
    },
    setLastSelectedFavouriteFolder: function (state, data) {
      state.lastSelectedFavouriteFolder = data;
    },
  },
  actions: {
    setBreadcrumbData({ commit }, data) {
      commit("setBreadcrumbData", data);
    },
    setFavouritesData({ commit }, data) {
      commit("setFavouritesData", data);
    },
    setSingInVisible({ commit }, data) {
      commit("setSingInVisible", data);
    },
    addFolderToFavouritesData({ commit }, data) {
      commit("addFolderToFavouritesData", data);
    },
    updateFolderInFavouritesData({ commit }, data) {
      commit("updateFolderInFavouritesData", data);
    },
    addFavouriteToFavouritesData({ commit }, data) {
      commit("addFavouriteToFavouritesData", data);
    },
    deleteFavouriteFromFavouritesData({ commit }, data) {
      commit("deleteFavouriteFromFavouritesData", data);
    },
    setFavouritesSelectedItemData({ commit }, data) {
      commit("setFavouritesSelectedItemData", data);
    },
    setLastSelectedFavouriteFolder({ commit }, data) {
      commit("setLastSelectedFavouriteFolder", data);
    },
  }
});
