<template>
  <dx-toolbar class="nav-toolbar">
    <DxItem :options="sideNavButtonOptions" location="before" widget="dxButton" />
    <DxItem #default location="before" locate-in-menu="never">
      <div class="toolbar-label">
        <b>Avolin</b> Computron
      </div>
    </DxItem>
    <DxItem :options="searchNavButtonOptions" location="after" widget="dxButton" />
    <DxItem :options="favouritesNavButtonOptions" location="after" widget="dxButton" />
    <DxItem :options="userProfileNavButtonOptions" location="after" widget="dxDropDownButton" />
  </dx-toolbar>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxItem
  },
  data() {
    return {
      sideNavButtonOptions: {
        icon: "fas fa-bars",
        focusStateEnabled: false,
        stylingMode: "text",
        onClick: () => {
          //alert("Side navigation menu button has been clicked!");
          this.$store.commit("toggleSideNavMenuOpenState");
        }
      },
      searchNavButtonOptions: {
        icon: "fas fa-search",
        focusStateEnabled: false,
        stylingMode: "text",
        hint: "Search",
        onClick: () => {
          alert("Search navigation button has been clicked!");
        }
      },
      favouritesNavButtonOptions: {
        icon: "fas fa-star",
        focusStateEnabled: false,
        stylingMode: "text",
        hint: "Favourites",
        onClick: () => {
          //alert("Favourites navigation menu button has been clicked!");
          this.$store.commit("toggleFavouritesNavMenuOpenState");
        }
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
          { id: "2", name: "Sign Out", icon: "fas fa-sign-out-alt" }
        ]
        /*onItemClick: () => {
          alert("User Profile navigation button has been clicked!");
        }*/
      }
    };
  },
  computed: {
    navMenuStylingMode: {
      get: function() {
        if (this.$store.getters.getSideNavMenuOpenState) {
          console.log("contained");
          return "contained";
        } else {
          console.log("text");
          return "text";
        }
      }
    }
  }
};
</script>

<style scoped>
.toolbar-label,
.toolbar-label > b {
  font-size: 18px;
  margin-left: 5px;
}

.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-bottom: 1px solid rgba(77, 77, 77);
}
</style>

