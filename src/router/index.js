import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import GeneralLedger from "@/pages/GeneralLedger";
import AccountsPayable from "@/pages/AccountsPayable";
import AccountsReceivable from "@/pages/AccountsReceivable";
import SystemAdministrator from "@/pages/SystemAdministrator";
import UniversalUtilities from "@/pages/UniversalUtilities";
import SystemParameters from "@/pages/SystemParameters";
import Menu from "@/pages/Menu";

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
      path: "/GeneralLedger",
      name: "GeneralLedger",
      component: GeneralLedger
    },
    {
      path: "/AccountsPayable",
      name: "AccountsPayable",
      component: AccountsPayable
    },
    {
      path: "/AccountsReceivable",
      name: "AccountsReceivable",
      component: AccountsReceivable
    },
    {
      path: "/SystemAdministrator",
      name: "SystemAdministrator",
      component: SystemAdministrator
    },
    {
      path: "/UniversalUtilities",
      name: "UniversalUtilities",
      component: UniversalUtilities
    },
    {
      path: "/SystemParameters",
      name: "SystemParameters",
      component: SystemParameters
    },
    {
      path: "/Menu/:id",
      props: true,
      name: "Menu",
      component: Menu
    }
  ]
});

export default router;
