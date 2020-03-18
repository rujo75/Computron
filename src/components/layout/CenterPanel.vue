<template>
  <div class="dx-theme-background-color">
    <!--<dx-toolbar class="favourites-toolbar">
      <DxItem
        :options="level1NavButtonOptions"
        :drop-down-options="{ width: 230 }"
        location="before"
        widget="dxDropDownButton"
      />
      <DxItem
        :options="level2NavButtonOptions"
        :drop-down-options="{ width: 230 }"
        location="before"
        widget="dxDropDownButton"
      />
    </dx-toolbar>-->
    <Breadcrumb/>
    <!--<GeneralLedgerMenu/>-->
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import { DxToolbar, DxMenu, DxItem } from "devextreme-vue/toolbar";
import Breadcrumb from "./Breadcrumb.vue";
import GeneralLedgerMenu from "./../menus/GeneralLedgerMenu.vue";
import {
  GeneralLedgerMenuData,
  SystemAdministratorMenuData
} from "./../../data/menus.js";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxMenu,
    DxItem,
    Breadcrumb,
    GeneralLedgerMenu
  },
  data() {
    return {
      level1NavButtonOptions: {
        icon: "fas fa-layer-group",
        splitButton: true,
        useSelectMode: false,
        focusStateEnabled: false,
        text: "General Ledger",
        stylingMode: "text",
        displayExpr: "text",
        keyExpr: "id",
        dropDownOptions: { width: 250 },
        items: GeneralLedgerMenuData
      },
      level2NavButtonOptions: {
        icon: "fas fa-folder-open",
        disabled: true,
        splitButton: true,
        useSelectMode: false,
        focusStateEnabled: false,
        text: "System Administrator",
        stylingMode: "text",
        displayExpr: "text",
        keyExpr: "id",
        dropDownOptions: { width: 250 },
        items: SystemAdministratorMenuData
      }
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
