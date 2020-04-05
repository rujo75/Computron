import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Menu from "@/views/Menu";
import CompanyMaintenanceList from "@/views/CompanyMaintenanceList";
import CompanyMaintenanceForm from "@/views/CompanyMaintenanceForm";
import UserProfileMaintenanceList from "@/views/UserProfileMaintenanceList";

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
      path: "/CompanyMaintenanceList/:id",
      props: true,
      name: "CompanyMaintenanceList",
      component: CompanyMaintenanceList
    },
    {
      path: "/CompanyMaintenanceForm",
      name: "CompanyMaintenanceForm",
      component: CompanyMaintenanceForm
    },
    {
      path: "/UserProfileMaintenanceList/:id",
      props: true,
      name: "UserProfileMaintenanceList",
      component: UserProfileMaintenanceList
    },
  ]
});

export default router;
