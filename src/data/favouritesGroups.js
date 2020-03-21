var favouritesGrops = [{ id: "123456", text: "Folder 123456" }];

export default {
    getFavouritesGroups() {
        return favouritesGrops;
    },

    setFavouritesGroups(data) {
        favouritesGrops = data;
    },
};
