<template>
  <div style="width: 250px">
    <DxList
      :data-source="dataSource"
      :active-state-enabled="true"
      :hover-state-enabled="true"
      :focus-state-enabled="true"
      :selected-item-keys="[currentItem.id]"
      selection-mode="single"
      class="panel-list dx-theme-border-color"
      @item-click="onNavigationItemClick"
    />
  </div>
</template>

<script>
import { DxList } from "devextreme-vue/list";
import ArrayStore from "devextreme/data/array_store";
import { MenuData } from "./../../data/menus.js";

export default {
  components: {
    DxList
  },
  data() {
    return {
      dataSource: {
        store: new ArrayStore({
          data: MenuData.items,
          key: "id"
        })
      },
      currentItem: MenuData.items[0]
    };
  },
  computed: {},
  methods: {
    onNavigationItemClick(e) {
      if (e.itemData.link) {
        if (this.$route.path !== e.itemData.link) {
          this.$router.push(e.itemData.link);
        }
      }
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.panel-list {
  height: calc(100vh - 72px);
  width: 250px;
  border-right: 1px solid;
}

.panel-list >>> .dx-list-item-icon-container {
  width: 36px;
  padding-right: 10px;
  text-align: left;
}

.panel-list >>> .dx-list-item-content {
  padding-left: 10px;
  text-align: left;
  height: 46px;
  vertical-align: middle;
}

.panel-list >>> .dx-list-item {
  /* color: rgb(170, 22, 22);
  background: yellow; */
  border: none;
}

/* .panel-list >>> .dx-list-item .dx-icon {
  color: rgb(170, 22, 22);
  background: yellow;
} */
</style>




