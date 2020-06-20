<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="grid"
      key-expr="companyID"
      :data-source="getCompanies"
      :remote-operations="false"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      :column-min-width="50"
      :column-auto-width="true"
      :row-alternation-enabled="false"
      :hover-state-enabled="true"
      :show-borders="true"
      :focused-row-enabled="true"
      :auto-navigate-to-focused-row="true"
      :focused-row-key.sync="focusedRowKey"
      :state-storing="stateStoring"
      column-resizing-mode="widget"
      width="100%"
      height="calc(100vh - 139px)"
      @toolbar-preparing="onToolbarPreparing($event);"
      @focused-row-changed="onFocusedRowChanged"
      @initialized="onGridInitialized"
    >
      <dx-export :enabled="true" :allow-export-selected-data="false" file-name="Companies List" />
      <dx-column-chooser :enabled="true" />
      <dx-column
        data-field="companyID"
        caption="Company ID"
        data-type="string"
        :width="300"
        :visible="false"
        cell-template="CompanyIDTemplate"
      />
      <dx-column
        data-field="companyNo"
        caption="Company No"
        data-type="string"
        :width="120"
        calculate-display-value="companyNoFormatted"
      />
      <dx-column
        data-field="companyName"
        caption="Company Name"
        data-type="string"
        :min-width="200"
      />
      <dx-column
        data-field="companyCode"
        caption="Company Code"
        data-type="string"
        :width="130"
        :visible="false"
      />
      <dx-column
        data-field="addressLine1"
        caption="Address Line 1"
        data-type="string"
        :width="200"
        :visible="false"
      />
      <dx-column
        data-field="addressLine2"
        caption="Address Line 2"
        data-type="string"
        :width="200"
        :visible="false"
      />
      <dx-column data-field="city" caption="City" data-type="string" :width="120" :visible="false" />
      <dx-column
        data-field="state"
        caption="State"
        data-type="string"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="postcode"
        caption="Postcode"
        data-type="string"
        :width="90"
        :visible="false"
      />
      <dx-column
        data-field="country"
        caption="Country"
        data-type="string"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="telephoneNo"
        caption="Telephone"
        data-type="string"
        :width="120"
        :visible="false"
        calculate-display-value="telephoneNoFormatted"
      />
      <dx-column
        data-field="faxNo"
        caption="Fax"
        data-type="string"
        :width="120"
        :visible="false"
        calculate-display-value="faxNoFormatted"
      />
      <dx-column
        data-field="mobileNo"
        caption="Mobile"
        data-type="string"
        :width="120"
        :visible="false"
        calculate-display-value="mobileNoFormatted"
      />
      <dx-column
        data-field="emailAddress"
        caption="Email Address"
        data-type="string"
        :width="200"
        :visible="false"
      />
      <dx-column
        data-field="taxNo"
        caption="ABN"
        data-type="string"
        :width="130"
        :visible="false"
        calculate-display-value="taxNoFormatted"
      />
      <dx-column
        data-field="dunsNo"
        caption="Duns No"
        data-type="string"
        :width="130"
        :visible="false"
        calculate-display-value="dunsNoFormatted"
      />
      <dx-load-panel :enabled="false" />
      <dx-group-panel :visible="false" />
      <dx-search-panel :visible="true" :width="250" />

      <div slot="CompanyIDTemplate" slot-scope="{ data: item }">
        <span
          @click.stop.prevent="onCompanyIDClick(item);"
          class="data-grid-hyperlink"
        >{{ item.value }}</span>
      </div>
    </dx-data-grid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxLoadPanel,
  DxGroupPanel,
  DxSearchPanel,
  DxColumnChooser,
  DxExport
  //DxSelection
} from "devextreme-vue/data-grid";
import { mapGetters } from "vuex";

//var editToolbarButtonRef = null;
//var deleteToolbarButtonRef = null;

export default {
  name: "companies",
  components: {
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxGroupPanel,
    DxSearchPanel,
    DxColumnChooser,
    DxExport
    //DxSelection
  },
  data() {
    return {
      dataSource: [
        {
          id: "1",
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
        },
        {
          id: "2",
          companyNo: "10",
          companyNoFormatted: "010",
          companyName: "Library Leaders",
          companyCode: "LIB LEAD",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          telephoneNo: "",
          faxNo: "",
          mobileNo: "",
          taxNo: "",
          dunsNo: "",
          emailAddress: ""
        },
        {
          id: "3",
          companyNo: "21",
          companyNoFormatted: "021",
          companyName: "Waste Management",
          companyCode: "WSTE MGMNT",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          telephoneNo: "",
          faxNo: "",
          mobileNo: "",
          taxNo: "",
          dunsNo: "",
          emailAddress: ""
        },
        {
          id: "4",
          companyNo: "24",
          companyNoFormatted: "024",
          companyName: "Health & Environment Service Management",
          companyCode: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          telephoneNo: "",
          faxNo: "",
          mobileNo: "",
          taxNo: "",
          dunsNo: "",
          emailAddress: ""
        },
        {
          id: "5",
          companyNo: "32",
          companyNoFormatted: "032",
          companyName: "Parking",
          companyCode: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          telephoneNo: "",
          faxNo: "",
          mobileNo: "",
          taxNo: "",
          dunsNo: "",
          emailAddress: ""
        }
      ],
      pageSizes: [10, 15, 20, 25, 50, 100],
      focusedRowKey: "",
      stateStoring: {
        enabled: true,
        storageKey: "Companies",
        type: "custom",
        savingTimeout: 0,
        customLoad: function() {
          //console.log("stateStoring customLoad");
          //console.log(this.stateStoring);
          var state = localStorage.getItem(this.stateStoring.storageKey);
          if (state) {
            state = JSON.parse(state);
            //console.log(state);
            let newFocusedRowKey = "";

            // make sure state has focusedRowKey property
            // eslint-disable-next-line no-prototype-builtins
            if (!state.hasOwnProperty("focusedRowKey")) {
              state.focusedRowKey = "";
            }

            // check new row key
            if (this.newCompanyID !== "") {
              newFocusedRowKey = this.newCompanyID;
            }
            let index = this._.findIndex(this.getCompanies, {
              companyID: newFocusedRowKey
            });

            if (index === -1) {
              // new row key not found
              // check the old key stored in the local storage
              newFocusedRowKey = state.focusedRowKey;
              index = this._.findIndex(this.getCompanies, {
                companyID: newFocusedRowKey
              });
              if (index === -1) {
                // old key no longer exists
                // check if we have any records
                if (this.getCompanies.length > 0) {
                  // select the first row
                  newFocusedRowKey = this.getCompanies[0].companyID;
                }
              }
            }

            // assign new focused row key
            state.focusedRowKey = newFocusedRowKey;
          }
          return state;
        }.bind(this),
        customSave: function(state) {
          //console.log("stateStoring customSave");
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getCompanies", "newCompanyID", "getCurrentPath"])
  },
  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-plus",
            stylingMode: "text",
            text: "Create",
            focusStateEnabled: false,
            disabled: true,
            onClick: () => {
              this.$router.push("/CompanyMaintenanceForm");
            }
          }
        },
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-edit",
            stylingMode: "text",
            text: "Edit",
            focusStateEnabled: false,
            onClick: () => {
              this.$router.push("/CompanyMaintenanceForm");
            }
          }
        },
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-trash-alt",
            stylingMode: "text",
            text: "Delete",
            focusStateEnabled: false,
            disabled: true
            //onClick: this.refreshDataGrid.bind(this)
          }
        }
      );
    },
    onFocusedRowChanged(e) {
      //var data = e.row && e.row.data;
      //console.log(data);
      //console.log(e.row);
      //console.log(e.row.data);
      this.$store.dispatch("setFormData", e.row.data);
    },
    onRowDblClick() {
      this.$router.push("/CompanyMaintenanceForm");
    }
  },
  mounted() {
    //console.log("mounted");
    // Build breadcrumb path
    const menuIdPath = this.getCurrentPath.split("/");
    let newBreadcrumbPath = [];

    for (let i = 0; i < menuIdPath.length; i++) {
      newBreadcrumbPath.push({ id: menuIdPath[i] });
    }
    //console.log(newBreadcrumbPath);
    // Save new breadcrumb data path
    this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);
  },
  created() {
    //console.log("created");
  },
  destroyed() {
    //console.log("destroyed");
  }
};
</script>

<style scoped>
.grid-panel {
  padding: 10px;
}
</style>