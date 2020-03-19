<template>
  <dx-toolbar :data-source="dataSource"></dx-toolbar>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";

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
              }
            ]
          }
        }
      ]
    };
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

