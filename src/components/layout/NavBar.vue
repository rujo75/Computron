<template>
  <dx-toolbar class="nav-toolbar">
    <DxItem :options="getSideNavButtonOptions" location="before" widget="dxButton" />
    <DxItem #default location="before" locate-in-menu="never">
      <div class="toolbar-label">
        <b>Computron</b> Financial
      </div>
    </DxItem>
    <DxItem
      :options="searchNavButtonOptions"
      location="after"
      widget="dxButton"
      class="nav-button"
    />
    <DxItem :options="getFavouritesNavButtonOptions" location="after" widget="dxButton" />
    <DxItem :options="userProfileNavButtonOptions" location="after" widget="dxDropDownButton" />
  </dx-toolbar>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import { mapGetters } from "vuex";
import { store } from "../../store/store";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxItem
  },
  data() {
    return {
      searchNavButtonOptions: {
        icon: "fas fa-search",
        focusStateEnabled: false,
        stylingMode: "text",
        hint: "Search",
        onClick: () => {
          alert("Search navigation button has been clicked!");
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
        ],
        onItemClick: e => {
          //console.log(e.itemData);
          //alert("User navigation button has been clicked!");
          if (e.itemData.name === "Sign Out") {
            // store.dispatch("setSingInVisible", true);
            store.dispatch("signOut");
          }
        }
      }
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
        }
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
        }
      };
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

