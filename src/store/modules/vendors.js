import _ from "lodash";

const state = {
    vendors: [
        {
            vendorID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            vendorCode: "1",
            vendorName: "Tyre and Wheels Pty Ltd",
            contactID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            contactCode: "1",
            addressID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            addressCode: "1",
            addressName: "Melbourne",
            addressLine1: "",
            addressLine2: "",
            contactName: "",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000",
            country: "AUS",
            phoneNo: "0274585434",
            faxNo: "",
            mobileNo: "",
            email: "sales@tyreandwheels.com.au",
            website: "www.tyreandwheels.com.au",
            contacts: [
                {
                    contactID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
                    contactCode: "1",
                    contactName: "Jenet Changhi",
                    jobTitle: "Sales Manager",
                    department: "Sales",
                    phoneNo: "0230767856",
                    faxNo: "",
                    mobileNo: "",
                    email: "jchanghi@tyreandwheels.com.au",
                    active: true
                }
            ],
            addresses: [
                {
                    addressID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
                    addressCode: "1",
                    addressName: "Melbourne",
                    addressLine1: "",
                    addressLine2: "",
                    contactName: "",
                    city: "Melbourne",
                    state: "VIC",
                    postcode: "3000",
                    country: "AUS",
                    phoneNo: "0274585434",
                    faxNo: "",
                    mobileNo: "",
                    email: "sales@tyreandwheels.com.au",
                    website: "www.tyreandwheels.com.au",
                    active: true
                }
            ],
            bankAccounts: [
                {
                    bankAccountID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
                    bankAccountCode: "WPAC",
                    bankName: "Westpac",
                    bankBranchNo: "032050",
                    bankAccountNo: "333333",
                    swiftCode: "WPACAU2S",
                    iban: "",
                    addressLine1: "",
                    addressLine2: "",
                    contactName: "",
                    city: "Melbourne",
                    state: "VIC",
                    postcode: "3000",
                    country: "AUS",
                    phoneNo: "",
                    faxNo: "",
                    mobileNo: "",
                    email: "",
                    website: "",
                    active: true
                }
            ],
            taxNo: "56765454758",
            pricesIncludeTax: false,
            lastDateModified: "",
            lastUserModified: "",
            active: true
        }
    ]
}

const getters = {
    getVendors: state => state.vendors,

    getVendorByID: (state) => (id) => {
        return state.vendors.find(vendor => vendor.vendorID === id)
    },

    vendorExistsByVendorCode: (state) => (vendorCode) => {
        if (state.vendors.find(vendor => vendor.vendorCode.toUpperCase() === vendorCode.toUpperCase())) {
            return true
        } else {
            return false
        }
    },

    vendorExistsByVendorName: (state) => (id, vendorName) => {
        if (state.vendors.find(vendor => (vendor.vendorName.toUpperCase() === vendorName.toUpperCase() && vendor.vendorID !== id))) {
            return true
        } else {
            return false
        }
    },
}

const mutations = {
    createVendor: (state, vendor) => {
        state.vendors.push(vendor);
    },

    updateVendor: (state, vendor) => {
        let index = _.findIndex(state.vendors, { vendorID: vendor.vendorID });
        //console.log(index)
        if (index >= 0) {
            state.vendors.splice(index, 1, vendor)
        }
    },

    deleteVendor: (state, id) => {
        let index = _.findIndex(state.vendors, { vendorID: id });
        if (index >= 0) {
            state.vendors.splice(index, 1)
        }
    }
}

const actions = {
    createVendor: ({ commit }, vendor) => {
        commit("createVendor", vendor);
    },

    updateVendor: ({ commit }, vendor) => {
        commit("updateVendor", vendor);
    },

    deleteVendor: ({ commit }, id) => {
        commit("deleteVendor", id);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
};