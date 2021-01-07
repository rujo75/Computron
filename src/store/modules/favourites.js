import Vue from "vue";

const state = {
  favouritesData: [
    {
      id: "842b43c5-cd8f-46b8-adbb-9558ff9466a6",
      text: "My Favourites",
      expanded: true,
      icon: "fas fa-folder",
      isFolder: true,
      items: [
        {
          id: "32f3f40c-f730-4e94-bc8d-c30d221c2223",
          text: "Home",
          expanded: false,
          icon: "fas fa-home",
          link: "/",
          isFolder: false,
          items: []
        },
        {
          id: "c8980fa8-e3a9-412a-9b0c-a940217e1c2e",
          text: "Vendors",
          expanded: false,
          icon: "fas fa-industry",
          link: "/Vendors",
          isFolder: false,
          items: []
        }
      ]
    }
  ],
  favouritesSelectedItemData: null,
  lastSelectedFavouriteFolder: null
};

const getters = {
  getFavouritesData: (state) => state.favouritesData,
  getFavouritesSelectedItemData: (state) => state.favouritesSelectedItemData,
  getLastSelectedFavouriteFolder: (state) => state.lastSelectedFavouriteFolder
};

const mutations = {
  setFavouritesData: function (state, data) {
    state.favouritesData = data;
  },
  addFolderToFavouritesData: function (state, data) {
    state.favouritesData.push(data);
  },
  updateFolderInFavouritesData: function (state, data) {
    let index = state.favouritesData.findIndex((obj) => obj.id === data.id);
    Vue.set(state.favouritesData[index], "text", data.text);
  },
  addFavouriteToFavouritesData: function (state, data) {
    // Find the folder
    let index = state.favouritesData.findIndex(
      (obj) => obj.id === data.folderId
    );
    //console.log("index: " + index)
    //console.log(data.favourite)
    // Add the favourite to the folder
    let newFavourite = data.favourite;
    state.favouritesData[index].items.push(newFavourite);
    //console.log(state.favouritesData)
  },
  deleteFavouriteFromFavouritesData: function (state, data) {
    if (data.isFolder) {
      // Folder passed in to delete. Find folder index in array
      let index = state.favouritesData.findIndex((obj) => obj.id === data.id);
      // Delete folder if found in array
      if (index >= 0) {
        state.favouritesData.splice(index, 1);
      }
    } else {
      //console.log(data)
      //console.log(state.favouritesData)
      // Iterate over all folders in favouritesData array
      for (
        let folderIndex = 0;
        folderIndex < state.favouritesData.length;
        folderIndex++
      ) {
        // Iterate over all favourites in the current folder
        for (
          let favouriteIndex = 0;
          favouriteIndex < state.favouritesData[folderIndex].items.length;
          favouriteIndex++
        ) {
          if (
            state.favouritesData[folderIndex].items[favouriteIndex].id ===
            data.id
          ) {
            // Favourite found. Delete it from the array
            //console.log("found")
            state.favouritesData[folderIndex].items.splice(favouriteIndex, 1);
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
  }
};

const actions = {
  setFavouritesData({ commit }, data) {
    commit("setFavouritesData", data);
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
