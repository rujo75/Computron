const state = {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    sideNavSelectedItemId: "Home",
    currentPath: "",
    breadcrumbData: [],
    //formData: null
};

const getters = {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getSideNavSelectedItemId: state => state.sideNavSelectedItemId,
    getCurrentPath: state => state.currentPath,
    getBreadcrumbData: state => state.breadcrumbData,
    //getFormData: state => state.formData
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
    },
    setCurrentPath: function (state, data) {
        state.currentPath = data;
    },
    setBreadcrumbData: function (state, data) {
        state.breadcrumbData = data;
    },
    /*setFormData: function (state, data) {
        state.formData = data;
    }*/
}

const actions = {
    setSideNavSelectedItemId({ commit }, id) {
        commit("setSideNavSelectedItemId", id);
    },
    setCurrentPath({ commit }, data) {
        commit("setCurrentPath", data);
    },
    setBreadcrumbData({ commit }, data) {
        commit("setBreadcrumbData", data);
    },
    /*setFormData({ commit }, data) {
        commit("setFormData", data);
    }*/
}

export default {
    state,
    getters,
    mutations,
    actions
};