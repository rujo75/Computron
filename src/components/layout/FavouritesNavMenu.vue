<template>
  <div class="favourites-panel">
    <dx-toolbar class="favourites-toolbar">
      <DxItem :options="addNavButtonOptions" location="before" widget="dxButton"/>
      <DxItem :options="deleteNavButtonOptions" location="before" widget="dxButton"/>
    </dx-toolbar>
    <div class="favourite-tree">
      <dx-tree-view
        :items="favouritesListData"
        key-expr="id"
        display-expr="name"
        width="100%"
        height="100%"
        :focus-state-enabled="true"
        class="panel-tree"
      ></dx-tree-view>
    </div>
  </div>
</template>

<script>
import { DxToolbar, DxMenu, DxItem } from "devextreme-vue/toolbar";
import { DxTreeView } from "devextreme-vue";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxMenu,
    DxItem,
    DxTreeView
  },
  data() {
    return {
      addNavButtonOptions: {
        icon: "fas fa-plus",
        focusStateEnabled: false,
        text: "Add",
        stylingMode: "text",
        onClick: () => {
          alert("Add favourite group navigation button has been clicked!");
        }
      },
      deleteNavButtonOptions: {
        icon: "fas fa-trash-alt",
        focusStateEnabled: false,
        text: "Delete",
        stylingMode: "text",
        onClick: () => {
          alert("Delete favourite group navigation button has been clicked!");
        }
      },
      favouritesListData: [
        {
          id: "1",
          name: "Month End Adjustments",
          expanded: true,
          icon: "fas fa-folder-open",
          items: [
            {
              id: "1.1",
              name: "On Line Transaction Entry",
              icon: "fas fa-hand-point-up"
            },
            {
              id: "1.2",
              name: "Accrual/Reversal Entry",
              icon: "fas fa-hand-point-up"
            },
            {
              id: "1.3",
              name: "Transaction Edit & Delete",
              icon: "fas fa-file-alt"
            },
            {
              id: "1.4",
              name: "Trial Balance Report",
              icon: "fas fa-file-invoice-dollar"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.favourites-panel {
  height: calc(100vh - 48px);
  width: 300px;
  /* border-left: 1px solid rgba(221, 221, 221); */
  border-left: 1px solid rgba(77, 77, 77);
}

.favourite-tree {
  padding: 10px;
  /* background: red;*/
  height: calc(100vh - 96px);
}

.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-bottom: 1px solid rgba(77, 77, 77);
}

.panel-tree >>> .dx-icon {
  margin-right: 10px;
}
</style>
