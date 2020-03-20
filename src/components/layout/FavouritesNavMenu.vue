<template>
  <div class="favourites-panel">
    <dx-toolbar class="favourites-toolbar">
      <DxItem #default location="before" locate-in-menu="never">
        <div class="toolbar-label">Favourites</div>
      </DxItem>
      <DxItem :options="addNavButtonOptions" location="after" widget="dxButton" />
      <!--<DxItem :options="renameNavButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="deleteNavButtonOptions" location="before" widget="dxButton" />-->
    </dx-toolbar>
    <div class="favourite-tree">
      <dx-tree-view
        :items="getFavouritesListDataSource"
        key-expr="id"
        display-expr="text"
        width="100%"
        height="100%"
        no-data-text="No favourites to display"
        :active-state-enabled="false"
        :hover-state-enabled="true"
        :focus-state-enabled="false"
        class="panel-tree"
      ></dx-tree-view>
    </div>
    <dx-popup
      :visible="showPopupForm"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="200"
      class="popup"
      title="Favourites Folder"
    >
      <p>
        <!--:on-content-ready="validateForm"-->
        <dx-form ref="formFavouriteGroup" :form-data="formData">
          <dx-form-item data-field="groupName" :validation-rules="validationRules.groupName" />
        </dx-form>
      </p>
      <div align="right">
        <dx-button
          text="OK"
          type="success"
          :use-submit-behavior="true"
          :width="80"
          @click="saveFavouritesGroup"
        />
        <dx-button text="Cancel" :width="80" class="margin-left-5" @click="hidePoupForm" />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import { DxTreeView, DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
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
    DxFormItem
  },
  data() {
    return {
      formData: { id: "", groupName: "" },
      validationRules: {
        groupName: [{ type: "required", message: "Folder name is required." }]
      },
      showPopupForm: false,
      addNavButtonOptions: {
        icon: "fas fa-folder-plus",
        focusStateEnabled: false,
        text: "",
        hint: "Create new folder",
        stylingMode: "text",
        onClick: () => {
          //alert("Add favourite group navigation button has been clicked!");
          //this.addFavouriteGroup();
          this.showPopupForm = true;
        }
      },
      renameNavButtonOptions: {
        icon: "fas fa-edit",
        focusStateEnabled: false,
        text: "Rename",
        stylingMode: "text",
        onClick: () => {
          alert("Rename favourite group navigation button has been clicked!");
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
          text: "Month End Adjustments",
          expanded: true,
          icon: "fas fa-folder-open",
          items: [
            {
              id: "1.1",
              text: "On Line Transaction Entry",
              icon: "fas fa-hand-point-up"
            },
            {
              id: "1.2",
              text: "Accrual/Reversal Entry",
              icon: "fas fa-hand-point-up"
            },
            {
              id: "1.3",
              text: "Transaction Edit & Delete",
              icon: "fas fa-file-alt"
            },
            {
              id: "1.4",
              text: "Trial Balance Report",
              icon: "fas fa-file-invoice-dollar"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getFavouritesListData"]),

    getFavouritesListDataSource() {
      return this.getFavouritesListData;
    }
  },
  methods: {
    addFavouriteGroup(name) {
      const newId = getNewId();
      this.$store.dispatch("addFavouriteGroupData", {
        id: newId,
        text: name,
        expanded: true,
        icon: "fas fa-folder-open",
        items: []
      });
    },
    saveFavouritesGroup() {
      var result = this.$refs["formFavouriteGroup"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        this.addFavouriteGroup(this.formData.groupName);
        this.hidePoupForm();
      }
    },
    hidePoupForm() {
      this.showPopupForm = false;
    },
    validateForm(e) {
      e.component.validate();
    }
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

.margin-left-5 {
  margin-left: 5px;
}
</style>
