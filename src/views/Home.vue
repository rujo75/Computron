<template>
  <div></div>
</template>

<script>
export default {
  methods: {},
  mounted() {
    this.$store.dispatch("setBreadcrumbData", [{ id: "1" }]);
  }
};
</script>
