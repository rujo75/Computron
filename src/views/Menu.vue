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
            @click="onNavigationItemButtonClick"
          />
        </div>
      </template>
    </DxList>
    <dx-popup
      :visible="showPopupForm"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="450"
      :height="200"
      class="popup"
      title="Favourites"
      @showing="loadFavourites"
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
        <dx-button text="Cancel" :width="80" class="margin-left-5" @click="hidePoupForm" />
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
      },
      showPopupForm: false,
      saveToEditorOptions: {
        items: [{ id: "1", text: "Test Folder" }],
        displayExpr: "text",
        valueExpr: "id"
      }
    };
  },
  computed: {
    ...mapGetters(["getBreadcrumbData", "getFavouritesListData"]),

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
      //alert("Menu Navigtion Button Clicked!");
      //console.log(e);
      //console.log(e.element.id);
      // find menu item by id
      //let result = this.findMenuById(MenuData, e.element.id);
      // update favourite flag if menu found
      /*if (result != null) {
        result.favourite = !result.favourite;
      }*/
      e.event.stopPropagation();
      this.showPopupForm = true;
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
    loadFavourites() {
      //console.log("loadFavourites");
      //console.log(this.getFavouritesListData);
      //this.saveToEditorOptions.items.push({ id: "3", text: "Item 3" });
      this.saveToEditorOptions.items.splice(
        0,
        this.saveToEditorOptions.items.length
      );
      this.saveToEditorOptions.items = this.getFavouritesListData;
      //console.log(this.saveToEditorOptions.items);
    },
    saveFavourite() {
      var result = this.$refs["formFavourites"].instance.validate();
      //console.log(result);
      if (result.isValid) {
        this.hidePoupForm();
      }
    },
    hidePoupForm() {
      this.showPopupForm = false;
    },
    validateForm(e) {
      e.component.validate();
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

.margin-left-5 {
  margin-left: 5px;
}
</style>