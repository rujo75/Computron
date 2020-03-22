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
      />
      <dx-context-menu
        :data-source="favouritesContextMenuItems"
        :width="200"
        target="#favouritesTree"
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
          this.$refs["popupFavouritesFolder"].instance.show();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getFavouritesData"]),

    favouritesContextMenuItems() {
      return [
        {
          text: "Create new folder",
          disabled: this.isCreateNewFavouriteFolderDisabled
        },
        { text: "Rename", disabled: this.isRenameFavouriteDisabled },
        { text: "Delete", disabled: this.isDeleteFavouriteDisabled }
      ];
    },
    isCreateNewFavouriteFolderDisabled() {
      return false;
    },
    isRenameFavouriteDisabled() {
      return true;
    },
    isDeleteFavouriteDisabled() {
      return true;
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
        items: [
          // {
          //   id: newItemId,
          //   text: "Company File Maintenance",
          //   icon: "fas fa-cog"
          // }
        ]
      });
    },
    saveFavouritesFolder() {
      var result = this.$refs["formFavouritesFolder"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        this.createNewFavouritesFolder(this.formData.folderName);
        // Reset current values
        //this.formData.id = "";
        //this.formData.folderName = "";
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
