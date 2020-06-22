<template>
  <dx-toolbar :data-source="getBreadcrumbDataSource" class="dx-theme-border-color"></dx-toolbar>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";
import { MenuData } from "./../../data/menus.js";

export default {
  name: "breadcrumb",
  components: {
    DxToolbar
  },
  data() {
    return {};
  },
  computed: {
    getBreadcrumbDataSource: {
      get: function() {
        let result = [];
        let breadcrumbIds = this.$store.getters.getBreadcrumbData;
        //console.log(breadcrumbIds);

        if (breadcrumbIds.length > 0) {
          for (let i = 0; i < breadcrumbIds.length; i++) {
            let disabled = false;
            if (i === breadcrumbIds.length - 1) {
              disabled = true;
            }
            let menuDetails = this.findMenuById(MenuData, breadcrumbIds[i].id);
            let widget = "dxDropDownButton";
            //console.log(menuDetails);
            if (menuDetails.items.length === 0) {
              widget = "dxButton";
            }
            //console.log(menuDetails.items.length);
            //console.log("widget: " + widget);
            let newButton = {
              location: "before",
              widget: widget,
              options: {
                icon: menuDetails.icon,
                splitButton: true,
                useSelectMode: false,
                focusStateEnabled: false,
                text: menuDetails.text,
                link: menuDetails.link,
                stylingMode: "text",
                displayExpr: "text",
                keyExpr: "id",
                disabled: disabled,
                dropDownOptions: { width: 280 },
                items: menuDetails.items,
                onButtonClick: this.onButtonClick.bind(this),
                onItemClick: this.onItemClick.bind(this),
                onClick: function() {
                  alert("Breadcrumb Clicked!");
                }
              }
            };
            result.push(newButton);
          }
        }
        return result;
      }
      //set: function() {}
    }
  },
  methods: {
    findMenuById(object, id) {
      // Early return
      if (object.id === id) {
        return object;
      }
      var result, p;
      for (p in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(p) && typeof object[p] === "object") {
          result = this.findMenuById(object[p], id);
          if (result) {
            return result;
          }
        }
      }
      return result;
    },
    onButtonClick(e) {
      if (e.component.option("link")) {
        if (this.$route.path !== e.component.option("link")) {
          console.log("Breadcrumb button click");
          console.log(e.component.option("link"));
          // navigate to new page
          this.$router.push(e.component.option("link"));
        }
      }
    },
    onItemClick(e) {
      if (e.itemData.link) {
        if (this.$route.path !== e.itemData.link) {
          console.log("Breadcrumb item click");
          console.log(e.itemData.link);
          // store current path
          this.$store.dispatch("setCurrentPath", e.itemData.path);
          // navigate to new page
          this.$router.push(e.itemData.link);
        }
      }
    }
  }
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  border-bottom: 1px solid;
}
</style>

