<template>
  <div id="app">
    <NavBar />
    <Main />
    <StatusBar />
    <SignIn />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar";
import Main from "./components/layout/Main";
import StatusBar from "./components/layout/StatusBar";
import SignIn from "./components/layout/SignIn";
import { dbUsersRef } from "./firebase";

export default {
  name: "App",
  components: {
    NavBar,
    Main,
    StatusBar,
    SignIn
  },
  created() {
    this.$store.dispatch("setUsersRef", dbUsersRef);
  },
  mounted() {
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
