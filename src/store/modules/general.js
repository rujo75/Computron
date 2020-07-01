const state = {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    sideNavSelectedItemId: "Home",
    currentPath: "",
    breadcrumbData: [],
};

const getters = {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getSideNavSelectedItemId: state => state.sideNavSelectedItemId,
    getCurrentPath: state => state.currentPath,
    getBreadcrumbData: state => state.breadcrumbData,
};

const mutations = {
    toggleSideNavMenuOpenState: function (state) {
        state.sideNavMenuOpenState = !state.sideNavMenuOpenState;
    },
    toggleFavouritesNavMenuOpenState: function (state) {
        state.favouritesNavMenuOpenState = !state.favouritesNavMenuOpenState;
    },
    setSideNavSelectedItemId: function (state, id) {
        state.sideNavSelectedItemId = id;
        //console.log("vuex -> setSideNavSelectedItemId: " + state.sideNavSelectedItemId)
    },
    setCurrentPath: function (state, data) {
        state.currentPath = data;
    },
    setBreadcrumbData: function (state, data) {
        state.breadcrumbData = data;
    }
}

const actions = {
    setSideNavSelectedItemId({ commit }, id) {
        // Save side nav item
        commit("setSideNavSelectedItemId", id);
    },
    setCurrentPath({ commit }, data) {
        //console.log("vuex -> setCurrentPath: " + data)
        //data: Administration/BankAccounts
        commit("setCurrentPath", data);
        if (data) {
            const menuIdPath = data.split("/");
            let newBreadcrumbPath = [];
            for (let i = 0; i < menuIdPath.length; i++) {
                newBreadcrumbPath.push({ id: menuIdPath[i] });
            }
            // Save side nav item
            commit("setSideNavSelectedItemId", menuIdPath[0]);
            // Save new breadcrumb data path
            commit("setBreadcrumbData", newBreadcrumbPath);
        }
    },
    setBreadcrumbData({ commit }, data) {
        commit("setBreadcrumbData", data);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
};