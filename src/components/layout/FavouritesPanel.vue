<template>
  <!-- dx-theme-border-color -->
  <div class="favourites-panel dx-theme-border-color">
    <dx-toolbar
      class="favourites-toolbar dx-theme-border-color"
      :items="toolbarItems"
    >
      <!--<DxItem #default location="before" locate-in-menu="never">
        <div class="toolbar-label">Favourites</div>
      </DxItem>-->
      <!--<DxItem
        :options="createFolderNavButtonOptions"
        location="before"
        widget="dxButton"
      />-->
    </dx-toolbar>
    <div class="favourite-tree">
      <!-- @item-context-menu="favouritesItemContextMenu" -->
      <dx-tree-view
        id="favouritesTree"
        :items="favouritesData"
        key-expr="id"
        display-expr="text"
        width="100%"
        height="calc(100vh - 139px)"
        no-data-text="No favourites to display"
        :select-by-click="false"
        selection-mode="single"
        selected-expr="isSelected"
        items-expr="items"
        expanded-expr="expanded"
        :focus-state-enabled="false"
        :active-state-enabled="false"
        :hover-state-enabled="true"
        :item-template="itemTemplate"
        @item-click="favouritesItemClick"
      />
      <!--<dx-context-menu
        :data-source="favouritesContextMenuItems"
        :width="200"
        target="#favouritesTree"
        @item-click="favouritesContextItemClick"
        @hiding="favouritesContextHiding"
      />-->
    </div>
    <dx-popup
      ref="popupCreateFolderItem"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="200"
      class="popup"
      title="Favourites Folder"
      @shown="popupCreateFolderItemShown"
      @hiding="popupCreateFolderItemHiding"
    >
      <p>
        <dx-form ref="formFolderData" :form-data="formFolderData">
          <dx-form-item
            data-field="folderName"
            :validation-rules="validationRules.folderName"
          />
        </dx-form>
      </p>
      <div align="right">
        <dx-button
          text="OK"
          type="success"
          :use-submit-behavior="true"
          :width="80"
          @click="newFolderItemOKClick"
        />
        <dx-button
          text="Cancel"
          :width="80"
          class="margin-left-10"
          @click="newFolderItemCancelClick"
        />
      </div>
    </dx-popup>
    <dx-popup
      ref="popupAddFavouriteItem"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="600"
      class="popup"
      title="Add New Favourite"
    >
      <p>
        <!--:on-content-ready="validateForm"-->
        <dx-tree-view
          id="addFavouriteTree"
          :items="getAvailableFavouritesData"
          key-expr="id"
          display-expr="text"
          width="100%"
          :height="445"
          no-data-text="No favourites to display"
          :select-by-click="true"
          selection-mode="multiple"
          items-expr="items"
          expanded-expr="expanded"
          :focus-state-enabled="false"
          :active-state-enabled="false"
          :hover-state-enabled="true"
          show-check-boxes-mode="normal"
          :search-enabled="true"
          search-mode="contains"
        >
        </dx-tree-view>
      </p>
      <div align="right">
        <dx-button
          text="OK"
          type="success"
          :use-submit-behavior="true"
          :width="80"
          @click="addFavouriteItemOKClick"
        />
        <dx-button
          text="Cancel"
          :width="80"
          class="margin-left-10"
          @click="addFavouriteItemCancelClick"
        />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { DxToolbar } from "devextreme-vue/toolbar";
import { DxTreeView, DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
//import { DxContextMenu } from "devextreme-vue/context-menu";
import { mapGetters } from "vuex";
//import { MenuData } from "./../../data/menus.js";
import { getNewId } from "./../../store/common.js";
import { confirm } from "devextreme/ui/dialog";

export default {
  name: "favouritesPanel",
  components: {
    DxToolbar,
    //DxItem,
    DxTreeView,
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem,
    //DxContextMenu,
  },
  data() {
    return {
      folderPopupMode: "new",
      favouritesData: [],
      newFavouritesData: [],
      formFolderData: { id: "", folderName: "" },
      validationRules: {
        folderName: [{ type: "required", message: "Folder name is required." }],
      },
      /*createFolderNavButtonOptions: {
        icon: "fas fa-folder-plus",
        focusStateEnabled: false,
        text: "",
        hint: "Create new folder",
        stylingMode: "text",
        //width: 24,
        //height: 24,
        onClick: () => {
          //alert("Create new favourites folder button has been clicked!");
          this.folderPopupMode = "new";
          this.$refs["popupAddFavouriteItem"].instance.show();
        },
      },*/
    };
  },
  computed: {
    ...mapGetters([
      "getFavouritesData",
      "getAvailableFavouritesData",
      "getFavouritesSelectedItemData",
      "getBreadcrumbData",
    ]),

    toolbarItems: function () {
      return [
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "fas fa-folder-plus",
            stylingMode: "text",
            hint: "Create new folder",
            focusStateEnabled: false,
            //disabled: this.disableNewButton,
            onClick: this.onCreateNewFolderClick.bind(this),
          },
        },
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "fas fa-pencil-alt",
            stylingMode: "text",
            hint: "Rename folder",
            focusStateEnabled: false,
            disabled: true,
            //disabled: this.disableNewButton,
            //onClick: this.onRenameFolderClick.bind(this),
          },
        },
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "fas fa-plus",
            stylingMode: "text",
            hint: "Add new favourite",
            focusStateEnabled: false,
            //disabled: this.disableNewButton,
            onClick: this.onAddNewFavouriteClick.bind(this),
          },
        },
        {
          widget: "dxButton",
          location: "after",
          options: {
            icon: "fas fa-star",
            stylingMode: "text",
            hint: "Set as default",
            focusStateEnabled: false,
            disabled: this.disableDefaultButton,
            onClick: this.onSetDefaultFavouriteClick.bind(this),
          },
        },
        {
          widget: "dxButton",
          location: "after",
          options: {
            icon: "fas fa-trash-alt",
            stylingMode: "text",
            hint: "Remove favourite",
            focusStateEnabled: false,
            disabled: this.disableDeleteButton,
            onClick: this.onDeleteFavouriteClick.bind(this),
          },
        },
      ];
    },
    favouritesContextMenuItems() {
      //console.log(this.favouritesSelectedItemData);
      return [
        {
          text: "Create new folder",
          icon: "fas fa-folder-plus",
          disabled: this.isCreateNewFavouriteFolderDisabled,
        },
        {
          text: "Rename",
          icon: "fas fa-edit",
          disabled: this.isRenameFavouriteDisabled,
        },
        {
          text: "Delete",
          icon: "fas fa-trash-alt",
          disabled: this.isDeleteFavouriteDisabled,
        },
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
    },
    disableDefaultButton: function () {
      //console.log("disableDefaultButton");
      if (this.getFavouritesSelectedItemData) {
        if (this.getFavouritesSelectedItemData.isDefault) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    disableDeleteButton: function () {
      //console.log("disableDeleteButton");
      if (this.getFavouritesSelectedItemData) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    getFavouritesData: {
      handler() {
        //console.log("getFavouritesData changed!");
        this.favouritesData = this._.map(this.getFavouritesData);
      },
      deep: true,
    },
    getAvailableFavouritesData: {
      handler() {
        console.log("getAvailableFavouritesData changed!");
        this.newFavouritesData = this._.map(this.getAvailableFavouritesData);
      },
      deep: true,
    },
  },
  methods: {
    itemTemplate: function (itemData, itemIndex, element) {
      // display default flag
      /*let template = "<div>" + itemData.text;
      if (itemData.isDefault) {
        template =
          template + "<i class='fas fa-star tree-item-default-icon'></i>";
      }
      template = template + "<div>";*/

      let template =
        "<div style='display: table; width: 100%; padding-top: 2px;'>";
      template =
        template +
        "<i class='" +
        itemData.icon +
        " dx-icon' style='text-align: left; display: table-cell'></i>";
      template =
        template +
        "<span style='text-align: left; display: table-cell; padding-left: 5px;'>" +
        itemData.text +
        "</span>";
      if (itemData.isDefault) {
        template =
          template +
          "<i class='fas fa-star dx-icon' style='text-align: right; display: table-cell; font-size: 16px'></i>";
      }
      template = template + "</div>";
      return template;
    },
    createNewFavouritesFolder(name) {
      const newId = getNewId();
      //const newItemId = getNewId();
      this.$store.dispatch("addFolderToFavouritesData", {
        id: newId,
        text: name,
        expanded: true,
        icon: "fas fa-folder",
        isFolder: true,
        items: [],
      });
    },
    newFolderItemOKClick() {
      var result = this.$refs["formFolderData"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        if (this.folderPopupMode === "new") {
          // Create new folder
          this.createNewFavouritesFolder(this.formFolderData.folderName);
        } else {
          // Update folder
          console.log(this.formFolderData);
          this.$store.dispatch("updateFolderInFavouritesData", {
            id: this.formFolderData.id,
            text: this.formFolderData.folderName,
          });
        }
        this.newFolderItemCancelClick();
      }
    },
    newFolderItemCancelClick() {
      this.$refs["popupCreateFolderItem"].instance.hide();
    },
    addFavouriteItemOKClick() {},
    addFavouriteItemCancelClick() {
      this.$refs["popupAddFavouriteItem"].instance.hide();
    },
    validateForm(e) {
      e.component.validate();
    },
    popupCreateFolderItemShown() {
      this.$refs["popupCreateFolderItem"].instance
        .getEditor("folderName")
        .focus();
    },
    popupCreateFolderItemHiding() {
      this.$refs["popupCreateFolderItem"].instance.resetValues();
    },
    favouritesItemClick(e) {
      //console.log(e.itemData);
      if (!e.itemData.isFolder) {
        // Favourite item clicked on
        this.$store.dispatch("selectFavouriteItemById", e.itemData.id);
        this.$store.dispatch("setFavouritesSelectedItemData", e.itemData);
        if (e.itemData.link) {
          // Check new link is different from current link
          if (this.$route.path !== e.itemData.link) {
            //let menu = this.findMenuById(MenuData, e.itemData.menuId);
            // store current path
            //this.$store.dispatch("setCurrentPath", menu.path);
            // Re-route to new link
            this.$router.push(e.itemData.link);
          }
        }
      }
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
          this.folderPopupMode = "new";
          this.$refs["popupFavouritesFolder"].instance.show();
        } else if (e.itemData.text === "Rename") {
          // Rename folder
          this.folderPopupMode = "edit";
          //console.log(this.getFavouritesSelectedItemData);
          this.formFolderData.id = this.getFavouritesSelectedItemData.id;
          this.formFolderData.folderName = this.getFavouritesSelectedItemData.text;
          //console.log(this.formFolderData);
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
    },
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
    onCreateNewFolderClick(e) {
      //alert("Create new favourites folder button has been clicked!");
      this.folderPopupMode = "new";
      this.$refs["popupCreateFolderItem"].instance.show();
    },
    onAddNewFavouriteClick(e) {
      this.$refs["popupAddFavouriteItem"].instance.show();
    },
    onSetDefaultFavouriteClick(e) {
      //alert("Set default favourite");
      // get current item
      if (this.getFavouritesSelectedItemData) {
        let currentItemId = this.getFavouritesSelectedItemData.id;
        //console.log(currentItemId);
        // update items in store
        this.$store.dispatch("setDefaultFavouriteItem", currentItemId);
      }
    },
    onDeleteFavouriteClick(e) {
      let favourite = this.getFavouritesSelectedItemData;
      let result = confirm(
        "Are you sure you want to delete this favourite?",
        "Delete Favourite"
      );
      result.then((dialogResult) => {
        if (dialogResult) {
          //console.log("Yes");
          this.$store.dispatch("deleteFavouriteItem", favourite.id);
          this.$store.dispatch("setFavouritesSelectedItemData", null);
          // select another favourite based on the rules
          this.$store.dispatch("selectFavouriteItem");
        }
      });
    },
  },
  created() {
    this.favouritesData = this.getFavouritesData;
    this.$store.dispatch("selectFavouriteItem");
  },
};
</script>

<style scoped>
.favourites-panel {
  height: calc(100vh - 49px);
  width: 300px;
  /* border-left: 1px solid yellow; */
  border-right: 1px solid;
  /* background: black; */
  /* padding-right: 10px; */
}

.favourites-toolbar {
  width: 300px;
}

.favourite-tree {
  padding: 10px;
  /* background: yellow; */
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
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.panel-tree >>> .dx-icon {
  margin-right: 10px;
}
</style>
