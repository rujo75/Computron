<template>
  <div id="app">
    <NavBar />
    <Main />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar";
import Main from "./components/layout/Main";

export default {
  name: "App",
  components: {
    NavBar,
    Main
  },
  mounted: function() {
    // Navigate to Home page
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
}

html,
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

.margin-left-10 {
  margin-left: 10px;
}
</style>
