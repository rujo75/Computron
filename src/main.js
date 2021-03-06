import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLodash from "vue-lodash";
import { store } from "./store/store";
import { VueMaskFilter } from 'v-mask'


Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.use(VueLodash);
Vue.filter('VMask', VueMaskFilter)
window.Vue = Vue;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
