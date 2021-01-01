<template>
  <dx-toolbar class="nav-toolbar dx-theme-border-color">
    <DxItem #default location="before" locate-in-menu="never">
      <div class="toolbar-label"><b>Computron</b> Financial</div>
    </DxItem>
    <DxItem
      :options="homeNavButtonOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :options="generalLedgerNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="accountsPayableNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="accountsReceivableNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="inventoryNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="reportsNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="contactsNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="administrationNavButtonOptions"
      location="before"
      widget="dxDropDownButton"
    />
    <DxItem
      :options="searchNavButtonOptions"
      location="after"
      widget="dxButton"
      class="nav-button"
    />
    <DxItem
      :options="getSideNavButtonOptions"
      location="after"
      widget="dxButton"
    />
    <DxItem
      :options="getFavouritesNavButtonOptions"
      location="after"
      widget="dxButton"
    />
    <DxItem
      :options="userProfileNavButtonOptions"
      location="after"
      widget="dxDropDownButton"
    />
  </dx-toolbar>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import { mapGetters } from "vuex";
import { store } from "../../store/store";

export default {
  name: "navBar",
  components: {
    DxToolbar,
    DxItem,
  },
  data() {
    return {
      homeNavButtonOptions: {
        icon: "fas fa-home",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Home",
      },
      generalLedgerNavButtonOptions: {
        icon: "fas fa-layer-group",
        text: "General Ledger",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [],
      },
      accountsPayableNavButtonOptions: {
        icon: "fas fa-money-bill-alt",
        text: "Accounts Payable",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [],
      },
      accountsReceivableNavButtonOptions: {
        icon: "fas fa-cart-arrow-down",
        text: "Accounts Receivable",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [],
      },
      inventoryNavButtonOptions: {
        icon: "fas fa-archive",
        text: "Inventory",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [],
      },
      reportsNavButtonOptions: {
        icon: "fas fa-file-invoice-dollar",
        text: "Reports",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [],
      },
      contactsNavButtonOptions: {
        icon: "fas fa-users",
        text: "Contacts",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [
          { id: "1", name: "Customers", icon: "fas fa-store" },
          { id: "2", name: "Employees", icon: "fas fa-house-user" },
          { id: "3", name: "Vendors", icon: "fas fa-industry" },
        ],
      },
      administrationNavButtonOptions: {
        icon: "fas fa-cogs",
        text: "Administration",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [
          { id: "1", name: "Bank Accounts", icon: "fas fa-university" },
          { id: "2", name: "Companies", icon: "fas fa-building" },
          { id: "3", name: "Settings", icon: "fas fa-cog" },
          { id: "4", name: "Users", icon: "fas fa-users-cog" },
        ],
      },
      searchNavButtonOptions: {
        icon: "fas fa-search",
        focusStateEnabled: false,
        stylingMode: "text",
        hint: "Search",
        onClick: () => {
          alert("Search navigation button has been clicked!");
        },
      },
      userProfileNavButtonOptions: {
        icon: "fas fa-user",
        text: "John Smith",
        useSelectMode: false,
        focusStateEnabled: false,
        stylingMode: "text",
        displayExpr: "name",
        keyExpr: "id",
        items: [
          { id: "1", name: "My Profile", icon: "fas fa-user" },
          { id: "2", name: "Sign Out", icon: "fas fa-sign-out-alt" },
        ],
        onItemClick: (e) => {
          //console.log(e.itemData);
          //alert("User navigation button has been clicked!");
          if (e.itemData.name === "Sign Out") {
            // store.dispatch("setSingInVisible", true);
            store.dispatch("signOut");
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getSideNavMenuOpenState", "getFavouritesNavMenuOpenState"]),

    getSideNavMenuStylingMode() {
      if (this.getSideNavMenuOpenState) {
        console.log("contained");
        return "contained";
      } else {
        console.log("text");
        return "text";
      }
    },
    getFavouritesNavMenuStylingMode() {
      if (this.getFavouritesNavMenuOpenState) {
        console.log("contained");
        return "contained";
      } else {
        console.log("text");
        return "text";
      }
    },
    getSideNavButtonOptions() {
      return {
        icon: "fas fa-bars",
        focusStateEnabled: false,
        stylingMode: this.getSideNavMenuStylingMode,
        onClick: () => {
          //alert("Side navigation menu button has been clicked!");
          store.commit("toggleSideNavMenuOpenState");
        },
      };
    },
    getFavouritesNavButtonOptions() {
      return {
        icon: "fas fa-star",
        focusStateEnabled: false,
        stylingMode: this.getFavouritesNavMenuStylingMode,
        hint: "Favourites",
        onClick: () => {
          //alert("Favourites navigation menu button has been clicked!");
          store.commit("toggleFavouritesNavMenuOpenState");
        },
      };
    },
  },
};
</script>

<style scoped>
.toolbar-label,
.toolbar-label > b {
  font-size: 18px;
  margin-left: 0px;
  margin-right: 5px;
}

.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  border-bottom: 1px solid;
}
</style>

