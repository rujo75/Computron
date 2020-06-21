import _ from "lodash";

const state = {
    newCompanyID: "",
    companies: [
        {
            companyID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            companyNo: "1",
            companyNoFormatted: "001",
            companyName: "City of Melbourne",
            companyCode: "COM",
            addressLine1: "100 Burk Steet",
            addressLine2: "",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000",
            country: "AUS",
            telephoneNo: "0392003776",
            telephoneNoFormatted: "(03) 9200 3776",
            faxNo: "",
            mobileNo: "0488711256",
            mobileNoFormatted: "0488 711 256",
            taxNo: "12345678901",
            taxNoFormatted: "12 345 678 901",
            dunsNo: "",
            emailAddress: "helpdesk@melbourne.vic.gov.au"
        }
    ]
}

const getters = {
    newCompanyID: state => state.newCompanyID,

    getCompanies: state => state.companies,

    getCompanyByID: (state) => (id) => {
        return state.companies.find(company => company.companyID === id)
    }
};

const mutations = {
    createCompany: (state, company) => {
        state.companies.push(company);
    },

    setNewCompanyID: (state, id) => {
        state.newCompanyID = id;
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
        commit("setNewCompanyID", company.companyID);
    },

    clearNewCompanyID: ({ commit }) => {
        commit("setNewCompanyID", "");
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
