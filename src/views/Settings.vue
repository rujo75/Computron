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
  }
};
</script>