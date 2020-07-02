<template>
  <div class="home-panel">
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    // store current path
    this.$store.dispatch("setCurrentPath", "Home");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.home-panel {
  padding: 10px;
}

.container {
  margin: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
  grid-gap: 10px;
  width: 100%;
}
</style>
