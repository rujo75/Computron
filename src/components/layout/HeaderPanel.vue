<template>
  <dx-toolbar
    :data-source="getHeaderDataSource"
    class="dx-theme-border-color"
  ></dx-toolbar>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";
import { store } from "../../store/store";
import { mapGetters } from "vuex";
//import { MenuData } from "./../../data/menus.js";

export default {
  name: "headerPanel",
  components: {
    DxToolbar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getFavouritesSelectedItemData"]),

    getHeaderTitle: function () {
      if (this.getFavouritesSelectedItemData) {
        return (
          "<div class='toolbar-label'><b>" +
          this.getFavouritesSelectedItemData.text +
          "</b></div>"
        );
      } else {
        return "<div class='toolbar-label'><b></b></div>";
      }
    },

    getHeaderDataSource: {
      get: function () {
        return [
          {
            location: "before",
            widget: "dxButton",
            options: {
              icon: "fas fa-bars",
              stylingMode: "text",
              focusStateEnabled: false,
              hint: "Show/Hide favourites panel",
              onClick: function () {
                //alert("Clicked");
                store.commit("toggleSideNavMenuOpenState");
              },
            },
          },
          {
            location: "center",
            locateInMenu: "never",
            template: this.getHeaderTitle,
          },
        ];
      },
    },
  },
};
</script>
