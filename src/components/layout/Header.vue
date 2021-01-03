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
    getHeaderDataSource: {
      get: function () {
        let result = [];
        //let breadcrumbIds = this.$store.getters.getBreadcrumbData;

        return result;
      },
    },
  },
};
</script>