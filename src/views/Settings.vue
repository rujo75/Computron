<template>
  <div>Settings</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "settings",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCurrentPath"])
  },
  mounted() {
    //console.log("mounted");
    // Set breadcrumb path
    //console.log(this.getCurrentPath);
    // Build breadcrumb path
    const menuIdPath = this.getCurrentPath.split("/");
    let newBreadcrumbPath = [];

    for (let i = 0; i < menuIdPath.length; i++) {
      newBreadcrumbPath.push({ id: menuIdPath[i] });
    }
    console.log(newBreadcrumbPath);
    // Save new breadcrumb data path
    this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);
  }
};
</script>