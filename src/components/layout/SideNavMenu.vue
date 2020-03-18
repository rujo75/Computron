<template>
  <div style="width: 250px">
    <DxList
      :data-source="dataSource"
      :active-state-enabled="true"
      :hover-state-enabled="true"
      :focus-state-enabled="true"
      :selected-item-keys="[currentItem.id]"
      selection-mode="single"
      class="panel-list"
      @item-click="onNavBarItemClick"
    />
  </div>
</template>
<!-- :selected-item-keys="[currentItem.id]" -->

<script>
import { DxList } from "devextreme-vue/list";
import ArrayStore from "devextreme/data/array_store";
import { NavigationData } from "./../../data/navigation.js";

export default {
  components: {
    DxList
  },
  data() {
    return {
      dataSource: {
        store: new ArrayStore({
          data: NavigationData,
          key: "id"
        })
      },
      currentItem: NavigationData[0]
    };
  },
  methods: {
    onNavBarItemClick(e) {
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
  height: calc(100vh - 48px);
  width: 250px;
  /* border-right: 1px solid rgba(221, 221, 221); */
  border-right: 1px solid rgba(77, 77, 77);
}

.panel-list >>> .dx-list-item-icon-container {
  width: 36px;
  padding-right: 10px;
  text-align: left;
}

.panel-list >>> .dx-list-item-content {
  padding-left: 10px;
  text-align: left;
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




