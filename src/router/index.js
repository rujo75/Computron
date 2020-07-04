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
import Vendors from "@/views/Vendors";
import Vendor from "@/views/Vendor";

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
      path: "/CreateCompany",
      name: "CreateCompany",
      component: Company
    },
    {
      path: "/EditCompany/:id",
      props: true,
      name: "EditCompany",
      component: Company
    },
    {
      path: "/CopyCompany/:id",
      props: true,
      name: "CopyCompany",
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
      path: "/CreateBankAccount",
      name: "CreateBankAccount",
      component: BankAccount
    },
    {
      path: "/EditBankAccount/:id",
      props: true,
      name: "EditBankAccount",
      component: BankAccount
    },
    {
      path: "/CopyBankAccount/:id",
      props: true,
      name: "CopyBankAccount",
      component: BankAccount
    },
    {
      path: "/Vendors",
      name: "Vendors",
      component: Vendors
    },
    {
      path: "/CreateVendor",
      name: "CreateVendor",
      component: Vendor
    },
    {
      path: "/EditVendor/:id",
      props: true,
      name: "EditVendor",
      component: Vendor
    },
    {
      path: "/CopyVendor/:id",
      props: true,
      name: "CopyVendor",
      component: Vendor
    },
  ]
});

export default router;
