<template>
  <div style="width: 450px">
    <DxList
      :data-source="navigation"
      :active-state-enabled="true"
      :hover-state-enabled="true"
      :focus-state-enabled="true"
      class="panel-list"
      @item-click="onNavigationItemClick"
    >
      <template #item="{ data: item }">
        <div class="item-template">
          <div class="item-icon">
            <i class="dx-icon dx-list-item-icon" :class="item.icon"/>
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
import { SystemAdministratorMenuData } from "./../../data/menus.js";

export default {
  components: {
    DxList,
    DxButton
  },
  data() {
    return {
      navigation: SystemAdministratorMenuData
    };
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
    }
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
