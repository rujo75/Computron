import _ from "lodash";

const state = {
    companies: [
        {
            companyID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            companyNo: "1",
            companyName: "Globeworks",
            companyCode: "GLB",
            addressLine1: "16 Parkes Road",
            addressLine2: "",
            contactName: "John Globe",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000",
            country: "AUS",
            phoneNo: "0381005925",
            faxNo: "",
            mobileNo: "0488711256",
            taxNo: "12345678901",
            email: "admin@globeworks.com.au",
            website: "www.globeworks.com.au",
            logo: "",
            bankName: "Westpac",
            bankBranchNo: "032050",
            bankAccountNo: "111111",
            swiftCode: "WPACAU2S",
            iban: "",
            active: true
        }
    ]
}

const getters = {
    getCompanies: state => state.companies,

    getCompanyByID: (state) => (id) => {
        return state.companies.find(company => company.companyID === id)
    },

    companyExistsByCompanyNo: (state) => (companyNo) => {
        if (state.companies.find(company => company.companyNo.toUpperCase() === companyNo.toUpperCase())) {
            return true
        } else {
            return false
        }
    },

    companyExistsByCompanyName: (state) => (id, companyName) => {
        if (state.companies.find(company => (company.companyName.toUpperCase() === companyName.toUpperCase() && company.companyID !== id))) {
            return true
        } else {
            return false
        }
    },

    companyExistsByCompanyCode: (state) => (id, companyCode) => {
        if (state.companies.find(company => (company.companyCode.toUpperCase() === companyCode.toUpperCase() && company.companyID !== id))) {
            return true
        } else {
            return false
        }
    }
};

const mutations = {
    createCompany: (state, company) => {
        state.companies.push(company);
    },

    updateCompany: (state, company) => {
        let index = _.findIndex(state.companies, { companyID: company.companyID });
        //console.log(index)
        if (index >= 0) {
            state.companies.splice(index, 1, company)
        }
    },

    deleteCompany: (state, id) => {
        let index = _.findIndex(state.companies, { companyID: id });
        if (index >= 0) {
            state.companies.splice(index, 1)
        }
    }
}

const actions = {
    createCompany: ({ commit }, company) => {
        commit("createCompany", company);
    },

    updateCompany: ({ commit }, company) => {
        commit("updateCompany", company);
    },

    deleteCompany: ({ commit }, id) => {
        commit("deleteCompany", id);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
