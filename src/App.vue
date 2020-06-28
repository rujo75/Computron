<template>
  <div id="app">
    <NavBar />
    <MainPage />
    <StatusBar />
    <SignIn />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar";
import MainPage from "./components/layout/MainPage";
import StatusBar from "./components/layout/StatusBar";
import SignIn from "./components/layout/SignIn";
import { dbUsersRef } from "./firebase";
import { locale } from "devextreme/localization";

export default {
  name: "App",
  components: {
    NavBar,
    MainPage,
    StatusBar,
    SignIn
  },
  data() {
    return {
      locale: null
    };
  },
  methods: {
    getLocale() {
      var lang = navigator.language || navigator.userLanguage;
      //console.log(lang);
      return lang != null ? lang : "en";
    }
  },
  created() {
    this.locale = this.getLocale();
    //console.log(this.locale);
    locale(this.locale);
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

.dx-button .fa-star {
  /*font-size: 18px;*/
  padding-right: 2px;
  /*color: red;*/
}

/*.dx-field-item .dx-checkbox {*/
/*padding-top: 7px;*/ /* label inline */
/*padding-top: 29px;*/ /* lable on top */
/*}*/

/*.dx-field-item .dx-first-row .dx-checkbox {
  padding-top: 7px;
}*/

.dx-field-item .dx-checkbox-text {
  padding-left: 30px;
}

.dx-switch-on,
.dx-switch-off {
  font-size: 14px;
}

.dx-invalid-message.dx-overlay {
  position: absolute;
}

.dx-invalid-message .dx-overlay-wrapper .dx-overlay-content {
  color: white;
  font-size: 14px;
}

.dx-field-item-label-location-top {
  padding-bottom: 3px;
}

/*.data-grid-hyperlink {
  color: #0b0080;
}*/

.data-grid-hyperlink:hover {
  text-decoration: underline;
  cursor: pointer;
}

.data-grid-hyperlink:active {
  text-decoration: underline;
}
</style>
