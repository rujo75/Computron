import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Menu from "@/views/Menu";
import Companies from "@/views/Companies";
import Company from "@/views/Company";
import Users from "@/views/Users";
import User from "@/views/User";
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
      path: "/Company",
      name: "CreateCompany",
      component: Company
    },
    {
      path: "/Company/:id",
      name: "EditCompany",
      component: Company
    },
    {
      path: "/Users",
      name: "Users",
      component: Users
    },
    {
      path: "/User",
      name: "CreateUser",
      component: User
    },
    {
      path: "/User/:id",
      props: true,
      name: "EditUser",
      component: User
    },
    {
      path: "/Settings",
      name: "Settings",
      component: Settings
    },
  ]
});

export default router;
