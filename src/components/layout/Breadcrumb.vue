<template>
  <dx-toolbar :data-source="getBreadcrumbDataSource"></dx-toolbar>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";
import { MenuData } from "./../../data/menus.js";

export default {
  name: "app",
  components: {
    DxToolbar
  },
  data() {
    return {
      dataSource: [
        {
          location: "before",
          widget: "dxDropDownButton",
          options: {
            icon: "fas fa-layer-group",
            splitButton: true,
            useSelectMode: false,
            focusStateEnabled: false,
            text: "General Ledger",
            stylingMode: "text",
            displayExpr: "text",
            keyExpr: "id",
            dropDownOptions: { width: 280 },
            items: [
              {
                id: "2.1",
                text: "System Parameters",
                icon: "fas fa-folder-open",
                link: "/Menu/2.1",
                favourite: false
              },
              {
                id: "2.2",
                text: "Posting Account Structure",
                icon: "fas fa-folder-open",
                link: "/Menu/2.2",
                favourite: false
              },
              {
                id: "2.3",
                text: "Posting Account Maintenance",
                icon: "fas fa-folder-open",
                link: "/Menu/2.3",
                favourite: false
              },
              {
                id: "2.4",
                text: "Transaction Parameters",
                icon: "fas fa-folder-open",
                link: "/Menu/2.4",
                favourite: false
              }
            ]
          }
        }
      ]
    };
  },
  computed: {
    getBreadcrumbDataSource: {
      get: function() {
        let result = [];
        let breadcrumbIds = this.$store.getters.getBreadcrumbData;

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
                stylingMode: "text",
                displayExpr: "text",
                keyExpr: "id",
                disabled: disabled,
                dropDownOptions: { width: 280 },
                items: menuDetails.items
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
    }
  }
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-bottom: 1px solid rgba(77, 77, 77);
}
</style>

