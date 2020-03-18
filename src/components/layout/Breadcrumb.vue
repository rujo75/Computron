<template>
  <dx-toolbar></dx-toolbar>
</template>

<script>
import { DxToolbar, DxMenu, DxItem } from "devextreme-vue/toolbar";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxMenu,
    DxItem
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-bottom: 1px solid rgba(77, 77, 77);
}
</style>

