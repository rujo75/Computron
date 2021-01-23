import Vue from "vue";
import Vuex from "vuex";
import general from "./modules/general";
import users from "./modules/users";
import companies from "./modules/companies";
import bankAccounts from "./modules/bankAccounts";
import favourites from "./modules/favourites";
import vendors from "./modules/vendors";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    general,
    users,
    companies,
    bankAccounts,
    favourites,
    vendors
  }
});
