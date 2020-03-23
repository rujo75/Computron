<template>
  <div style="width: 450px">
    <!--<div>{{ id }}</div>-->
    <DxList
      :data-source="getMenuData"
      :active-state-enabled="false"
      :hover-state-enabled="true"
      :focus-state-enabled="false"
      class="panel-list"
      @item-click="onNavigationItemClick"
    >
      <template #item="{ data: item }">
        <div class="item-template">
          <div class="item-icon">
            <i class="dx-icon dx-list-item-icon" :class="item.icon" />
          </div>
          <div class="item-text">{{ item.text }}</div>
          <DxButton
            :icon="getItemFavouritesIcon(item)"
            styling-mode="text"
            :id="item.id"
            :active-state-enabled="false"
            :focus-state-enabled="false"
            :width="24"
            :height="24"
            hint="Add to favourites"
            @click="onNavigationItemButtonClick"
          />
        </div>
      </template>
    </DxList>
    <dx-popup
      ref="popupFavourites"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="200"
      class="popup"
      title="Favourites"
      @showing="popupFormShowing"
      @shown="popupFormShown"
      @hiding="popupFormHiding"
    >
      <p>
        <dx-form ref="formFavourites" :form-data="formData">
          <dx-form-item
            data-field="saveTo"
            :validation-rules="validationRules.saveTo"
            editor-type="dxSelectBox"
            :editor-options="saveToEditorOptions"
          />
        </dx-form>
      </p>
      <div align="right">
        <dx-button
          text="OK"
          type="success"
          :use-submit-behavior="true"
          :width="80"
          @click="saveFavourite"
        />
        <dx-button text="Cancel" :width="80" class="margin-left-10" @click="hidePoupForm" />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { DxList } from "devextreme-vue/list";
import { DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
import { MenuData } from "./../data/menus.js";
import { mapGetters } from "vuex";
import { getNewId } from "./../store/common.js";

export default {
  props: {
    id: String
  },
  components: {
    DxList,
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem
  },
  data() {
    return {
      formData: { id: "", saveTo: "" },
      validationRules: {
        saveTo: [{ type: "required", message: "Save to folder is required." }]
      }
    };
  },
  computed: {
    ...mapGetters([
      "getBreadcrumbData",
      "getFavouritesData",
      "getLastSelectedFavouriteFolder"
    ]),

    saveToEditorOptions() {
      return {
        dataSource: this.getFavouritesData,
        displayExpr: "text",
        valueExpr: "id"
      };
    },

    getMenuData() {
      //console.log("Menu id: " + this.id);
      // save current menu id to breadcrumb list
      let breadcrumbIds = this.getBreadcrumbData;
      let menuIdPath = this.id.split(".");
      //console.log("menuIdPath.length: " + menuIdPath.length);
      //console.log("breadcrumbIds.length: " + breadcrumbIds.length);
      breadcrumbIds.splice(menuIdPath.length - 1, breadcrumbIds.length, {
        id: this.id
      });

      //console.log(menuData);
      let result = this.findMenuById(MenuData, this.id);
      //console.log(result);
      if (result != null) {
        return result.items;
      } else {
        return [];
      }
    }
  },
  methods: {
    getItemFavouritesIcon(item) {
      if (item.favourite) {
        return "fas fa-star";
      } else {
        return "far fa-star";
      }
    },
    onNavigationItemClick(e) {
      if (e.itemData.link) {
        if (this.$route.path !== e.itemData.link) {
          this.$router.push(e.itemData.link);
        }
      }
    },
    onNavigationItemButtonClick(e) {
      e.event.stopPropagation();
      //console.log(e.element.id);
      this.formData.id = e.element.id;
      this.$refs["popupFavourites"].instance.show();
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
    deepSearch(object, key, predicate) {
      // Example:
      // let result = this.deepSearch(menuData, "id", (k, v) => v === "2.1.2");
      // eslint-disable-next-line no-prototype-builtins
      if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
        return object;

      for (let i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] === "object") {
          let o = this.deepSearch(
            object[Object.keys(object)[i]],
            key,
            predicate
          );
          if (o != null) return o;
        }
      }
      return null;
    },
    saveFavourite() {
      var result = this.$refs["formFavourites"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        //alert("folder id: " + this.formData.saveTo);
        // Find menu by id
        let menu = this.findMenuById(MenuData, this.formData.id);
        //console.log(menu);
        const newId = getNewId();
        let data = {
          folderId: this.formData.saveTo,
          favourite: {
            id: newId,
            menuId: this.formData.id,
            text: menu.text,
            icon: menu.icon,
            isFolder: false,
            link: menu.link
          }
        };
        //alert("saveTo: " + this.formData.saveTo);
        this.$store.dispatch("addFavouriteToFavouritesData", data);
        // Save the last folder selection for later use
        this.$store.dispatch(
          "setLastSelectedFavouriteFolder",
          this.formData.saveTo
        );
        this.hidePoupForm();
      }
    },
    hidePoupForm() {
      this.$refs["popupFavourites"].instance.hide();
    },
    validateForm(e) {
      e.component.validate();
    },
    popupFormShowing() {
      // Select default value
      //console.log(this.getLastSelectedFavouriteFolder);
      let folderSet = false;
      if (this.getLastSelectedFavouriteFolder) {
        // Check if folder still exists in array
        let index = this.getFavouritesData.findIndex(
          obj => obj.id === this.getLastSelectedFavouriteFolder
        );
        if (index >= 0) {
          this.formData.saveTo = this.getLastSelectedFavouriteFolder;
          folderSet = true;
        }
      }
      if (!folderSet) {
        // Default folder was not set. Set to first found in array
        //console.log(this.getFavouritesData);
        if (this.getFavouritesData) {
          this.formData.saveTo = this.getFavouritesData[0].id;
          folderSet = true;
        }
      }
    },
    popupFormShown() {
      // Set focus to input field
      this.$refs["formFavourites"].instance.getEditor("saveTo").focus();
    },
    popupFormHiding() {
      this.$refs["formFavourites"].instance.resetValues();
    }
  },
  mounted() {
    //console.log("Menu Id: " + this.id);
  }
};
</script>

<style scoped>
.panel-list {
  height: calc(100vh - 96px);
  padding: 10px;
}

.panel-list >>> .dx-list-item {
  border: none;
}

.panel-list >>> .dx-empty-message {
  border: none;
}

.item-template {
  padding: 8px 10px;
}

.item-template > i {
  float: left;
}

.item-template > .item-icon {
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
  /* background: green; */
}

.item-template > .item-text {
  padding-left: 15px;
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
  /* background: red; */
}

.item-template > div {
  float: left;
}

.item-template >>> .dx-button {
  float: right;
}

.item-template >>> .dx-button .dx-button-content {
  padding: 0px;
}
</style>