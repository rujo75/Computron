<template>
  <div>{{ id }}</div>
</template>

<script>
import menuData from "./../data/menus.js";

export default {
  props: {
    id: String
  },
  computed() {},
  created() {
    console.log("Menu Id: " + this.id);
  }
};
</script>