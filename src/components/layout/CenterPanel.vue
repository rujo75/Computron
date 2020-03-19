<template>
  <div class="dx-theme-background-color">
    <Breadcrumb />
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb.vue";

export default {
  name: "app",
  components: {
    Breadcrumb
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
