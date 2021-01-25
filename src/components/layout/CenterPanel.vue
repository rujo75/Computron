<template>
  <div class="dx-theme-background-color">
    <!-- <Breadcrumb /> -->
    <HeaderPanel />
    <router-view class="router"></router-view>
  </div>
</template>

<script>
//import Breadcrumb from "./Breadcrumb.vue";
import HeaderPanel from "./HeaderPanel.vue";

export default {
  name: "centerPanel",
  components: {
    //Breadcrumb
    HeaderPanel,
  },
  data() {
    return {};
  },
  created: function () {
    // select a favourite based on the rules
    //this.$store.dispatch("selectFavouriteItem");
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
