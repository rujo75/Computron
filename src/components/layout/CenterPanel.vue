<template>
  <div class="dx-theme-background-color">
    <!-- <Breadcrumb /> -->
    <Header />
    <router-view class="router"></router-view>
  </div>
</template>

<script>
//import Breadcrumb from "./Breadcrumb.vue";
import Header from "./Header.vue";

export default {
  name: "centerPanel",
  components: {
    //Breadcrumb
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  border-bottom: 1px solid;
}
</style>
