import _ from "lodash";

const state = {
    vendors: [
        {
            vendorID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            vendorCode: "1",
            vendorName: "Tyre and Wheels Pty Ltd",
            contactID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            contactCode: "1",
            contactName: "Jenet Changhi",
            contactJobTitle: "Sales Manager",
            contactDepartment: "Sales",
            contactPhoneNo: "0390767856",
            contactFaxNo: "",
            contactMobileNo: "",
            contactEmail: "jchanghi@tyreandwheels.com.au",
            addressID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            addressCode: "1",
            addressName: "Melbourne",
            addressLine1: "3656  Redbud Drive",
            addressLine2: "",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000",
            country: "AUS",
            email: "sales@tyreandwheels.com.au",
            website: "www.tyreandwheels.com.au",
            contacts: [
                {
                    contactID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
                    contactCode: "1",
                    contactName: "Jenet Changhi",
                    jobTitle: "Sales Manager",
                    department: "Sales",
                    phoneNo: "0390767856",
                    faxNo: "",
                    mobileNo: "",
                    email: "jchanghi@tyreandwheels.com.au",
                    active: true
                },
                {
                    contactID: "2652c185-09ab-4b8a-8518-7f184a4f2baf",
                    contactCode: "2",
                    contactName: "Gayle Grice",
                    jobTitle: "Sales Associate",
                    department: "Sales",
                    phoneNo: "0230767857",
                    faxNo: "",
                    mobileNo: "",
                    email: "ggrice@tyreandwheels.com.au",
                    active: true
                },
                {
                    contactID: "f274ab28-59af-45af-86f5-97a149104476",
                    contactCode: "3",
                    contactName: "James Dyal",
                    jobTitle: "Sales Specialist",
                    department: "Sales",
                    phoneNo: "0230767858",
                    faxNo: "",
                    mobileNo: "",
                    email: "jdyal@tyreandwheels.com.au",
                    active: true
                }
            ],
            addresses: [
                {
                    addressID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
                    addressCode: "1",
                    addressName: "Melbourne",
                    addressLine1: "3656  Redbud Drive",
                    addressLine2: "",
                    contactName: "",
                    city: "Melbourne",
                    state: "VIC",
                    postcode: "3000",
                    country: "AUS",
                    email: "sales@tyreandwheels.com.au",
                    website: "www.tyreandwheels.com.au",
                    active: true
                },
                {
                    addressID: "2652c185-09ab-4b8a-8518-7f184a4f2baf",
                    addressCode: "2",
                    addressName: "Sydney",
                    addressLine1: "4720  West Side Avenue",
                    addressLine2: "",
                    contactName: "",
                    city: "Sydney",
                    state: "QLD",
                    postcode: "2745",
                    country: "AUS",
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