<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="grid"
      key-expr="accountID"
      :data-source="getBankAccounts"
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
    >
      <dx-export :enabled="true" :allow-export-selected-data="false" file-name="Bank Accounts" />
      <dx-column-chooser :enabled="true" />
      <dx-column
        data-field="accountID"
        caption="Account ID"
        data-type="string"
        :width="300"
        :visible="false"
        cell-template="IDTemplate"
      />
      <dx-column data-field="accountCode" caption="Account Code" data-type="string" :width="150" />
      <dx-column data-field="bankName" caption="Bank Name" data-type="string" :width="150" />
      <dx-column
        data-field="bankBranchNo"
        caption="Branch No"
        data-type="string"
        :width="130"
        :visible="true"
        cell-template="bankBranchNoTemplate"
      />
      <dx-column
        data-field="bankAccountNo"
        caption="Bank Account No"
        data-type="string"
        :width="150"
      />
      <dx-column
        data-field="swiftCode"
        caption="SWIFT Code"
        data-type="string"
        :width="100"
        :visible="false"
      />
      <dx-column data-field="iban" caption="IBAN" data-type="string" :width="100" :visible="false" />
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
      <dx-column
        data-field="contactName"
        caption="Contact Name"
        data-type="string"
        :width="130"
        :visible="false"
      />
      <dx-column data-field="city" caption="City" data-type="string" :width="120" :visible="false" />
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
        data-field="state"
        caption="State"
        data-type="string"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="phoneNo"
        caption="Phone No"
        data-type="string"
        :width="120"
        :visible="false"
        cell-template="phoneNoTemplate"
      />
      <dx-column
        data-field="faxNo"
        caption="Fax No"
        data-type="string"
        :width="120"
        :visible="false"
        cell-template="phoneNoTemplate"
      />
      <dx-column
        data-field="mobileNo"
        caption="Mobile No"
        data-type="string"
        :width="120"
        :visible="false"
        cell-template="mobileNoTemplate"
      />
      <dx-column
        data-field="email"
        caption="Email"
        data-type="string"
        :width="200"
        :visible="false"
      />
      <dx-column
        data-field="website"
        caption="Home Page"
        data-type="string"
        :width="200"
        :visible="false"
      />
      <dx-column
        data-field="active"
        caption="Active"
        data-type="boolean"
        :width="80"
        :visible="false"
      />
      <dx-load-panel :enabled="false" />
      <dx-group-panel :visible="false" />
      <dx-search-panel :visible="true" :width="250" />

      <div slot="IDTemplate" slot-scope="{ data: item }">
        <span @click.stop.prevent="onIDClick(item);" class="data-grid-hyperlink">{{ item.value }}</span>
      </div>
      <div slot="phoneNoTemplate" slot-scope="{ data: item }">{{ item.value | VMask(phoneNoMask) }}</div>
      <div
        slot="mobileNoTemplate"
        slot-scope="{ data: item }"
      >{{ item.value | VMask(mobileNoMask) }}</div>
      <div
        slot="bankBranchNoTemplate"
        slot-scope="{ data: item }"
      >{{ item.value | VMask(bankBranchNoMask) }}</div>
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
} from "devextreme-vue/data-grid";
import { mapGetters } from "vuex";

var editToolbarButtonRef = null;
var copyToolbarButtonRef = null;
var deleteToolbarButtonRef = null;

export default {
  name: "bankAccounts",
  components: {
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxGroupPanel,
    DxSearchPanel,
    DxColumnChooser,
    DxExport
  },
  data() {
    return {
      pageSizes: [10, 15, 20, 25, 50, 100],
      focusedRowKey: "",
      phoneNoMask: "(##) #### ####",
      mobileNoMask: "#### ### ###",
      bankBranchNoMask: "###-###",
      stateStoring: {
        enabled: true,
        storageKey: "BankAccounts",
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

            // check the old key stored in the local storage
            newFocusedRowKey = state.focusedRowKey;
            let index = this._.findIndex(this.getBankAccounts, {
              accountID: newFocusedRowKey
            });
            if (index === -1) {
              // old key no longer exists
              // check if we have any records
              if (this.getBankAccounts.length > 0) {
                // select the first row
                newFocusedRowKey = this.getBankAccounts[0].accountID;
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
    ...mapGetters(["getBankAccounts", "getCurrentPath"])
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
            disabled: false,
            onClick: () => {
              this.$router.push("/CreateBankAccount");
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
            disabled: true,
            onInitialized: e => {
              editToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/EditBankAccount/" + this.focusedRowKey);
            }
          }
        },
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-copy",
            stylingMode: "text",
            text: "Copy",
            focusStateEnabled: false,
            disabled: true,
            onInitialized: e => {
              copyToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/CopyBankAccount/" + this.focusedRowKey);
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
            disabled: true,
            onInitialized: e => {
              deleteToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$store.dispatch("deleteBankAccount", this.focusedRowKey);
              this.focusedRowKey = "";
            }
          }
        }
      );
    },
    onFocusedRowChanged(e) {
      //console.log("onFocusedRowChanged");
      //console.log("onFocusedRowChanged ->  e.component.state(): ");
      //console.log(e.component.state());
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.stateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
      // read back the saved data and display to console
      //var state = localStorage.getItem(this.stateStoring.storageKey);
      //console.log(state);
    },
    onIDClick() {
      //alert(e.text);
      //console.log("onIDClick");
      setTimeout(
        function() {
          this.$router.push("/EditBankAccount/" + this.focusedRowKey);
        }.bind(this),
        1
      );
    }
  },
  watch: {
    focusedRowKey: {
      handler(value) {
        //console.log("focusedRowKey value changed: " + value);
        if (value === "" || this.getBankAccounts.length === 0) {
          editToolbarButtonRef.option("disabled", true);
          copyToolbarButtonRef.option("disabled", true);
          deleteToolbarButtonRef.option("disabled", true);
        } else {
          editToolbarButtonRef.option("disabled", false);
          copyToolbarButtonRef.option("disabled", false);
          deleteToolbarButtonRef.option("disabled", false);
        }
      }
    }
  },
  mounted() {
    //console.log("mounted");
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