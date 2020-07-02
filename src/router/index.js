import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Page from "@/views/Page";
import Companies from "@/views/Companies";
import Company from "@/views/Company";
import Users from "@/views/Users";
import User from "@/views/User";
import Settings from "@/views/Settings";
import BankAccounts from "@/views/BankAccounts";
import BankAccount from "@/views/BankAccount";

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
      path: "/Page/:id",
      props: true,
      name: "Page",
      component: Page
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
      props: true,
      name: "EditCompany",
      component: Company
    },
    {
      path: "/Users",
      name: "Users",
      component: Users
    },
    {
      path: "/CreateUser",
      name: "CreateUser",
      component: User
    },
    {
      path: "/EditUser/:id",
      props: true,
      name: "EditUser",
      component: User
    },
    {
      path: "/CopyUser/:id",
      props: true,
      name: "CopyUser",
      component: User
    },
    {
      path: "/Settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/BankAccounts",
      name: "BankAccounts",
      component: BankAccounts
    },
    {
      path: "/BankAccount",
      name: "CreateBankAccount",
      component: BankAccount
    },
    {
      path: "/BankAccount/:id",
      props: true,
      name: "EditBankAccount",
      component: BankAccount
    },
  ]
});

export default router;
