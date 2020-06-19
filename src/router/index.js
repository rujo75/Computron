import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Menu from "@/views/Menu";
import Companies from "@/views/Companies";
import CompanyMaintenanceForm from "@/views/CompanyMaintenanceForm";
import Users from "@/views/Users";
import EditUser from "@/views/EditUser";
import Settings from "@/views/Settings";

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
      path: "/Companies",
      name: "Companies",
      component: Companies
    },
    {
      path: "/CompanyMaintenanceForm",
      name: "CompanyMaintenanceForm",
      component: CompanyMaintenanceForm
    },
    {
      path: "/Users",
      name: "Users",
      component: Users
    },
    {
      path: "/CreateUser",
      name: "CreateUser",
      component: EditUser
    },
    {
      path: "/EditUser/:id",
      props: true,
      name: "EditUser",
      component: EditUser
    },
    {
      path: "/Settings",
      name: "Settings",
      component: Settings
    },
  ]
});

export default router;
