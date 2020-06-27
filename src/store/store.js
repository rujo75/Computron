import Vue from "vue";
import Vuex from "vuex";
import general from "./modules/general";
import users from "./modules/users";
import companies from "./modules/companies";
import bankAccounts from "./modules/bankAccounts";
import favourites from "./modules/favourites";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export const store = new Vuex.Store({
    mutations: vuexfireMutations,
    modules: {
        general,
        users,
        companies,
        bankAccounts,
        favourites
    }
});
