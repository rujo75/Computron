<template>
  <dx-toolbar
    :data-source="getHeaderDataSource"
    class="dx-theme-border-color"
  ></dx-toolbar>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";
//import { MenuData } from "./../../data/menus.js";

export default {
  name: "header",
  components: {
    DxToolbar,
  },
  data() {
    return {};
  },
  computed: {
    getHeaderTitle: function () {
      return "<div class='toolbar-label'><b>Home</b>" + "</div>";
    },

    getHeaderDataSource: {
      get: function () {
        return [
          {
            location: "before",
            widget: "dxButton",
            options: {
              icon: "menu",
              stylingMode: "text",
              focusStateEnabled: false,
              onClick: function () {
                //alert("Clicked");
                //store.commit("setWorkQueueOpenState");
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