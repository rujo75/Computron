<template>
  <div class="favourites-panel">
    <dx-toolbar class="favourites-toolbar">
      <DxItem #default location="before" locate-in-menu="never">
        <div class="toolbar-label">Favourites</div>
      </DxItem>
      <DxItem :options="createFolderNavButtonOptions" location="after" widget="dxButton" />
    </dx-toolbar>
    <div class="favourite-tree">
      <dx-tree-view
        id="favouritesTree"
        :items="favouritesData"
        key-expr="id"
        display-expr="text"
        width="100%"
        height="100%"
        no-data-text="No favourites to display"
        :active-state-enabled="false"
        :hover-state-enabled="true"
        :focus-state-enabled="false"
        class="panel-tree"
        @item-click="favouritesItemClick"
        @item-context-menu="favouritesItemContextMenu"
      />
      <dx-context-menu
        :data-source="favouritesContextMenuItems"
        :width="200"
        target="#favouritesTree"
        @item-click="favouritesContextItemClick"
        @hiding="favouritesContextHiding"
      />
    </div>
    <dx-popup
      ref="popupFavouritesFolder"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="200"
      class="popup"
      title="Favourites Folder"
      @shown="popupFormShown"
      @hiding="popupFormHiding"
    >
      <p>
        <!--:on-content-ready="validateForm"-->
        <dx-form ref="formFavouritesFolder" :form-data="formData">
          <dx-form-item data-field="folderName" :validation-rules="validationRules.folderName" />
        </dx-form>
      </p>
      <div align="right">
        <dx-button
          text="OK"
          type="success"
          :use-submit-behavior="true"
          :width="80"
          @click="saveFavouritesFolder"
        />
        <dx-button text="Cancel" :width="80" class="margin-left-10" @click="hidePoupForm" />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import { DxTreeView, DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
import { DxContextMenu } from "devextreme-vue/context-menu";
import { mapGetters } from "vuex";
import { getNewId } from "./../../store/common.js";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxItem,
    DxTreeView,
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem,
    DxContextMenu
  },
  data() {
    return {
      favouritesPopupMode: "new",
      favouritesData: [],
      formData: { id: "", folderName: "" },
      validationRules: {
        folderName: [{ type: "required", message: "Folder name is required." }]
      },
      createFolderNavButtonOptions: {
        icon: "fas fa-folder-plus",
        focusStateEnabled: false,
        text: "",
        hint: "Create new folder",
        stylingMode: "text",
        onClick: () => {
          //alert("Create new favourites folder button has been clicked!");
          this.favouritesPopupMode = "new";
          this.$refs["popupFavouritesFolder"].instance.show();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getFavouritesData", "getFavouritesSelectedItemData"]),

    favouritesContextMenuItems() {
      //console.log(this.favouritesSelectedItemData);
      return [
        {
          text: "Create new folder",
          icon: "fas fa-folder-plus",
          disabled: this.isCreateNewFavouriteFolderDisabled
        },
        {
          text: "Rename",
          icon: "fas fa-edit",
          disabled: this.isRenameFavouriteDisabled
        },
        {
          text: "Delete",
          icon: "fas fa-trash-alt",
          disabled: this.isDeleteFavouriteDisabled
        }
      ];
    },
    isCreateNewFavouriteFolderDisabled() {
      if (this.getFavouritesSelectedItemData) {
        return false;
      } else {
        return false;
      }
    },
    isRenameFavouriteDisabled() {
      //console.log(this.getFavouritesSelectedItemData);
      if (this.getFavouritesSelectedItemData) {
        if (this.getFavouritesSelectedItemData.isFolder) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    isDeleteFavouriteDisabled() {
      if (this.getFavouritesSelectedItemData) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    createNewFavouritesFolder(name) {
      const newId = getNewId();
      //const newItemId = getNewId();
      this.$store.dispatch("addFolderToFavouritesData", {
        id: newId,
        text: name,
        expanded: true,
        icon: "fas fa-folder",
        isFolder: true,
        items: []
      });
    },
    saveFavouritesFolder() {
      var result = this.$refs["formFavouritesFolder"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        if (this.favouritesPopupMode === "new") {
          // Create new folder
          this.createNewFavouritesFolder(this.formData.folderName);
        } else {
          // Update folder
          console.log(this.formData);
          this.$store.dispatch("updateFolderInFavouritesData", {
            id: this.formData.id,
            text: this.formData.folderName
          });
        }
        this.hidePoupForm();
      }
    },
    hidePoupForm() {
      this.$refs["popupFavouritesFolder"].instance.hide();
    },
    validateForm(e) {
      e.component.validate();
    },
    popupFormShown() {
      this.$refs["formFavouritesFolder"].instance
        .getEditor("folderName")
        .focus();
    },
    popupFormHiding() {
      this.$refs["formFavouritesFolder"].instance.resetValues();
    },
    favouritesItemClick(e) {
      this.$store.dispatch("setFavouritesSelectedItemData", e.itemData);
      //console.log(this.getFavouritesSelectedItemData);
    },
    favouritesItemContextMenu(e) {
      this.$store.dispatch("setFavouritesSelectedItemData", e.itemData);
      //console.log(e.itemData);
    },
    favouritesContextItemClick(e) {
      //console.log(e.itemData);
      if (e.itemData) {
        if (e.itemData.text === "Create new folder") {
          // Create new folder
          this.favouritesPopupMode = "new";
          this.$refs["popupFavouritesFolder"].instance.show();
        } else if (e.itemData.text === "Rename") {
          // Rename folder
          this.favouritesPopupMode = "edit";
          //console.log(this.getFavouritesSelectedItemData);
          this.formData.id = this.getFavouritesSelectedItemData.id;
          this.formData.folderName = this.getFavouritesSelectedItemData.text;
          //console.log(this.formData);
          this.$refs["popupFavouritesFolder"].instance.show();
        } else if (e.itemData.text === "Delete") {
          // Delete favourite item
          console.log(this.getFavouritesSelectedItemData);
          this.$store.dispatch(
            "deleteFavouriteFromFavouritesData",
            this.getFavouritesSelectedItemData
          );
        }
      }
    },
    favouritesContextHiding() {
      this.$store.dispatch("setFavouritesSelectedItemData", null);
    }
  },
  watch: {
    getFavouritesData: {
      handler() {
        //console.log("getFavouritesData changed!");
        this.favouritesData = this._.map(this.getFavouritesData);
      },
      deep: true
    }
  },
  created() {
    this.favouritesData = this.getFavouritesData;
  }
};
</script>

<style scoped>
.favourites-panel {
  height: calc(100vh - 49px);
  width: 350px;
  /* border-left: 1px solid rgba(221, 221, 221); */
  border-left: 1px solid rgba(77, 77, 77);
}

.favourite-tree {
  padding: 10px;
  /* background: red;*/
  height: calc(100vh - 96px);
}

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

.panel-tree >>> .dx-icon {
  margin-right: 10px;
}
</style>
