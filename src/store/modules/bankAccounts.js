import _ from "lodash";

const state = {
    bankAccounts: [
        {
            accountID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            accountNo: "1",
            bankName: "Westpac",
            bankBranchNo: "032050",
            bankAccountNo: "111111",
            swiftCode: "WPACAU2S",
            iban: "",
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
            email: "admin@globeworks.com.au",
            website: "www.globeworks.com.au",
            active: true
        }
    ]
}

const getters = {
    getBankAccounts: state => state.bankAccounts,

    getBankAccountByID: (state) => (id) => {
        return state.bankAccounts.find(account => account.accountID === id)
    },

    bankAccountExistsByAccountNo: (state) => (accountNo) => {
        if (state.bankAccounts.find(account => account.accountNo.toUpperCase() === accountNo.toUpperCase())) {
            return true
        } else {
            return false
        }
    },

    bankAccountExistsByBankName: (state) => (bankName) => {
        if (state.bankAccounts.find(account => account.bankName.toUpperCase() === bankName.toUpperCase())) {
            return true
        } else {
            return false
        }
    },
};

const mutations = {
    createBankAccount: (state, account) => {
        state.bankAccounts.push(account);
    },

    updateBankAccount: (state, account) => {
        let index = _.findIndex(state.bankAccounts, { accountID: account.accountID });
        //console.log(index)
        if (index >= 0) {
            state.bankAccounts.splice(index, 1, account)
        }
    },

    deleteBankAccount: (state, id) => {
        let index = _.findIndex(state.bankAccounts, { accountID: id });
        if (index >= 0) {
            state.bankAccounts.splice(index, 1)
        }
    }
}

const actions = {
    createBankAccount: ({ commit }, account) => {
        commit("createBankAccount", account);
    },

    updateBankAccount: ({ commit }, account) => {
        commit("updateBankAccount", account);
    },

    deleteBankAccount: ({ commit }, id) => {
        commit("deleteBankAccount", id);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
