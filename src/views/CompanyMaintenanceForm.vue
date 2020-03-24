<template>
  <dx-toolbar>
    <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
    <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
  </dx-toolbar>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";

export default {
  name: "app",
  components: {
    DxToolbar,
    DxItem
  },
  data() {
    return {
      saveNavButtonOptions: {
        icon: "fas fa-save",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Save",
        onClick: () => {
          this.$router.back();
        }
      },
      cancelNavButtonOptions: {
        icon: "fas fa-times",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Cancel",
        onClick: () => {
          this.$router.back();
        }
      }
    };
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