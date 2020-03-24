import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Menu from "@/views/Menu";
import CompanyMaintenance from "@/views/CompanyMaintenance";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Menu/:id",
      props: true,
      name: "Menu",
      component: Menu
    },
    {
      path: "/CompanyMaintenance",
      props: true,
      name: "CompanyMaintenance",
      component: CompanyMaintenance
    }
  ]
});

export default router;
