<template>
  <dx-scroll-view show-scrollbar="onHover" height="calc(100vh - 119px)">
    <div class="home-panel">
      <div class="container">
        <div class="my-card dx-theme-border-color" v-for="item in getMenuItems" :key="item.id">
          <div class="card-header dx-theme-border-color">
            <dx-button
              width="100%"
              :text="item.text"
              type="normal"
              styling-mode="text"
              class="card-header-text"
              :focus-state-enabled="false"
              :id="item.id"
              @click="onHeaderButtonClick"
            />
          </div>
          <div class="card-main">
            <i v-bind:class="item.icon"></i>
            <div class="main-description">{{ item.description }}</div>
            <dx-button
              :icon="getItemFavouritesIcon(item)"
              :focus-state-enabled="false"
              :id="item.id"
              styling-mode="text"
              hint="Add to favourites"
              @click="onAddToFavouritesButtonClick"
            />
          </div>
        </div>
        <dx-popup
          ref="popupFavourites"
          :drag-enabled="true"
          :close-on-outside-click="false"
          :show-title="true"
          :width="450"
          :height="200"
          class="popup"
          title="Add to Favourites"
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
    </div>
  </dx-scroll-view>
</template>

<script>
import { DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
import { DxScrollView } from "devextreme-vue/scroll-view";
import { MenuData } from "./../data/menus.js";
import { mapGetters } from "vuex";
import { getNewId } from "./../store/common.js";

export default {
  props: {
    id: String
  },
  name: "page",
  components: {
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem,
    DxScrollView
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
    ...mapGetters(["getFavouritesData", "getLastSelectedFavouriteFolder"]),

    saveToEditorOptions() {
      return {
        dataSource: this.getFavouritesData,
        displayExpr: "text",
        valueExpr: "id"
      };
    },
    getMenuItems() {
      //console.log("Menu id: " + this.id);
      // Build new breadcrumb data path
      const menuIdPath = this.id.split(".");
      let newBreadcrumbPath = [];
      let tempBreadcrumb = "";
      for (let i = 0; i < menuIdPath.length; i++) {
        if (i === 0) {
          tempBreadcrumb = menuIdPath[0];
        } else {
          tempBreadcrumb += "." + menuIdPath[i];
        }
        newBreadcrumbPath.push({ id: tempBreadcrumb });
      }
      //console.log("newBreadcrumbPath");
      //console.log(newBreadcrumbPath);
      // Save new breadcrumb data path
      this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);

      //console.log(menuData);
      // Get menu items
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
    onHeaderButtonClick(e) {
      console.log(e.element);
      let menu = this.findMenuById(MenuData, e.element.id);
      console.log(menu);
      if (menu.link) {
        if (this.$route.path !== menu.link) {
          // store current path
          this.$store.dispatch("setCurrentPath", menu.path);
          // navigate to new page
          this.$router.push(menu.link);
        }
      }
    },
    onAddToFavouritesButtonClick(e) {
      e.event.stopPropagation();
      //console.log(e.element);
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
      console.log(result);
      if (result.isValid) {
        //alert("folder id: " + this.formData.saveTo);
        // Find menu by id
        //console.log(this.formData);
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
        // mark item as favourite to update the icon
        menu.favourite = true;
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
* {
  box-sizing: border-box;
}

.home-panel {
  padding: 10px;
}

.container {
  margin: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
  grid-gap: 10px;
  width: 100%;
}

.my-card {
  border: 1px solid; /* Set up Border */
  /*border-radius: 4px;*/ /* Slightly Curve edges */
  overflow: hidden; /* Fixes the corners */
  display: flex; /* Children use Flexbox */
  flex-direction: column; /* Rotate Axis */
}

.my-card:hover {
  box-shadow: 0 0 0 1px;
}

.card-header {
  border-bottom: 1px solid;
}

.card-header-text {
  /*font-weight: bold;*/
  font-size: 16px;
}

.card-main {
  display: grid; /* Children use Flexbox */
  padding: 15px; /* Add padding to the top/bottom/left/right */
  grid-column-gap: 15px;
  grid-template-columns: 40px auto 36px;
}

.material-icons,
.fas,
.svg-inline--fa {
  display: block;
  margin: auto;
  font-size: 24px;
}

.main-description {
  font-size: 14px;
}
</style>