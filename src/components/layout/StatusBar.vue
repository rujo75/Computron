<template>
  <dx-toolbar class="status-toolbar" :height="26">
    <DxItem #default location="after" locate-in-menu="never">
      <div class="toolbar-label">Version 1.0</div>
    </DxItem>
  </dx-toolbar>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxItem
  }
};
</script>

<style scoped>
.toolbar-label,
.toolbar-label > b {
  font-size: 14px;
  margin-left: 5px;
  margin-right: 5px;
}

.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 1px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-top: 1px solid rgba(77, 77, 77);
  /* border-bottom: 1px solid rgba(77, 77, 77); */
}

.status-toolbar >>> .dx-toolbar-items-container {
  height: 22px;
}
</style>