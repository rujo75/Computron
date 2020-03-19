<template>
  <div style="width: 450px">
    <!--<div>{{ id }}</div>-->
    <DxList
      :data-source="getMenuData"
      :active-state-enabled="true"
      :hover-state-enabled="true"
      :focus-state-enabled="true"
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
            :focus-state-enabled="false"
            :width="24"
            :height="24"
          />
        </div>
      </template>
    </DxList>
  </div>
</template>

<script>
import { DxList } from "devextreme-vue/list";
import { DxButton } from "devextreme-vue";
import { MenuData } from "./../data/menus.js";

export default {
  props: {
    id: String
  },
  components: {
    DxList,
    DxButton
  },
  data() {
    return {};
  },
  computed: {
    getMenuData() {
      //console.log("Menu id: " + this.id);
      // save current menu id to breadcrumb list
      let breadcrumbIds = this.$store.getters.getBreadcrumbData;
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