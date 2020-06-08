import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Menu from "@/views/Menu";
import CompanyMaintenanceList from "@/views/CompanyMaintenanceList";
import CompanyMaintenanceForm from "@/views/CompanyMaintenanceForm";
import ListUsers from "@/views/ListUsers";
import EditUser from "@/views/EditUser";

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
      path: "/ListUsers/:id",
      props: true,
      name: "ListUsers",
      component: ListUsers
    },
    {
      path: "/EditUser",
      name: "EditUser",
      component: EditUser
    },
  ]
});

export default router;
