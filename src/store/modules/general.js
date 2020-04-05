const state = {
    sideNavMenuOpenState: true,
    favouritesNavMenuOpenState: true,
    breadcrumbData: [],
    formData: null
};

const getters = {
    getSideNavMenuOpenState: state => state.sideNavMenuOpenState,
    getFavouritesNavMenuOpenState: state => state.favouritesNavMenuOpenState,
    getBreadcrumbData: state => state.breadcrumbData,
    getFormData: state => state.formData
};

const mutations = {
    toggleSideNavMenuOpenState: function (state) {
        state.sideNavMenuOpenState = !state.sideNavMenuOpenState;
    },
    toggleFavouritesNavMenuOpenState: function (state) {
        state.favouritesNavMenuOpenState = !state.favouritesNavMenuOpenState;
    },
    setBreadcrumbData: function (state, data) {
        state.breadcrumbData = data;
    },
    setFormData: function (state, data) {
        state.formData = data;
    }
}

const actions = {
    setBreadcrumbData({ commit }, data) {
        commit("setBreadcrumbData", data);
    },
    setFormData({ commit }, data) {
        commit("setFormData", data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
};