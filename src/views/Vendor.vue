<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <dx-tab-panel
        :items="tabsData"
        :animation-enabled="true"
        :swipe-enabled="false"
        :deferRendering="false"
        item-title-template="title"
        class="tab-panel"
      >
        <template #title="{ data }">
          <div>
            <span>{{ data.title }}</span>
            <i class="fas fa-exclamation-circle red" v-if="!data.isValid"></i>
          </div>
        </template>
        <div class="tab" slot="GeneralTab">
          <dx-form
            ref="formGeneral"
            class="form"
            :form-data="formData"
            :scrolling-enabled="true"
            validation-group="vendorData"
            @field-data-changed="onGeneralFieldDataChanged"
          >
            <dx-group-item :col-count="2" caption="Vendor Information">
              <dx-form-item data-field="vendorID" :editor-options="{disabled: true}">
                <dx-label text="Vendor ID" />
              </dx-form-item>
              <dx-form-item
                data-field="vendorCode"
                :editor-options="{disabled: this.currentRouteName === 'EditVendor'}"
              >
                <dx-label text="Vendor Code" />
                <dx-required-rule message="Vendor Code is required!" />
                <dx-pattern-rule
                  :pattern="vendorCodePattern"
                  message="Do not use spaces in the Vendor Code!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="Vendor Code must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="vendorCodeValidation"
                  message="Vendor Code is already used!"
                />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="vendorName">
                <dx-label text="Vendor Name" />
                <dx-required-rule message="Vendor Name is required!" />
                <dx-string-length-rule
                  :max="255"
                  message="Vendor Name must have maximum 255 characters!"
                />
              </dx-form-item>
              <dx-form-item data-field="taxNo" :editor-options="taxNoEditorOptions">
                <dx-label text="ABN" />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="active" editor-type="dxCheckBox" />
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-group-item :col-count="1" caption="Address">
                <dx-form-item data-field="addressCode" template="addressCodeTemplate" />
                <dx-form-item data-field="addressName"></dx-form-item>
                <dx-form-item data-field="addressLine1"></dx-form-item>
                <dx-form-item data-field="addressLine2"></dx-form-item>
                <dx-form-item data-field="city"></dx-form-item>
                <dx-form-item data-field="postcode" :editor-options="postcodeEditorOptions" />
                <dx-form-item
                  data-field="country"
                  editor-type="dxSelectBox"
                  :editor-options="countryEditorOptions"
                />
                <dx-form-item
                  data-field="state"
                  editor-type="dxSelectBox"
                  :editor-options="stateEditorOptions"
                />
              </dx-group-item>
              <dx-group-item :col-count="1" caption="Contact">
                <dx-form-item data-field="contactCode" template="contactCodeTemplate" />
                <dx-form-item data-field="contactName">
                  <dx-string-length-rule
                    :max="255"
                    message="Contact Name must have maximum 255 characters!"
                  />
                </dx-form-item>
                <dx-form-item data-field="phoneNo" :editor-options="telephoneNoEditorOptions">
                  <dx-label text="Phone No" />
                </dx-form-item>
                <dx-form-item data-field="faxNo" :editor-options="telephoneNoEditorOptions">
                  <dx-label text="Fax No" />
                </dx-form-item>
                <dx-form-item data-field="mobileNo" :editor-options="mobileNoEditorOptions">
                  <dx-label text="Mobile No" />
                </dx-form-item>
                <dx-form-item data-field="email">
                  <dx-email-rule message="Email is invalid!" />
                  <dx-string-length-rule
                    :max="255"
                    message="Email must have maximum 255 characters!"
                  />
                </dx-form-item>
                <dx-form-item data-field="website">
                  <dx-label text="Home Page" />
                  <dx-string-length-rule
                    :max="255"
                    message="Home Page must have maximum 255 characters!"
                  />
                </dx-form-item>
              </dx-group-item>
            </dx-group-item>
            <template #addressCodeTemplate>
              <div class="dx-texteditor-container">
                <dx-lookup class="dx-lookup-container">
                  <!--<DxDropDownOptions :show-title="false" />-->
                </dx-lookup>
                <dx-button
                  name="createAddressCode"
                  icon="fas fa-plus"
                  hint="Create Address"
                  :focus-state-enabled="false"
                  class="dx-lookup-button-container"
                />
                <dx-button
                  name="editAddressCode"
                  icon="fas fa-edit"
                  hint="Edit Address"
                  :focus-state-enabled="false"
                  class="dx-lookup-button-container"
                />
              </div>
            </template>
            <template #contactCodeTemplate>
              <div class="dx-texteditor-container">
                <dx-lookup
                  class="dx-lookup-container"
                  :items="formData.contacts"
                  value-expr="contactID"
                  display-expr="contactName"
                >
                  <!--<dx-drop-down-options :show-title="false" />-->
                </dx-lookup>
                <dx-button
                  name="createContactCode"
                  icon="fas fa-plus"
                  hint="Create Contact"
                  :focus-state-enabled="false"
                  class="dx-lookup-button-container"
                />
                <dx-button
                  name="editContactCode"
                  icon="fas fa-edit"
                  hint="Edit Contact"
                  :focus-state-enabled="false"
                  class="dx-lookup-button-container"
                />
              </div>
            </template>
          </dx-form>
        </div>
        <div class="grid-tab" slot="ContactsTab">
          <!--:state-storing="stateStoring"-->
          <dx-data-grid
            ref="grid"
            key-expr="addressID"
            :data-source="formData.addresses"
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
            :focused-row-key.sync="communicationFocusedRowKey"
            column-resizing-mode="widget"
            width="100%"
            height="calc(100vh - 251px)"
            @toolbar-preparing="onCommunicationToolbarPreparing($event);"
            @focused-row-changed="onCommunicationFocusedRowChanged"
          >
            <dx-column-chooser :enabled="true" />
            <dx-column
              data-field="addressID"
              caption="Contact ID"
              data-type="string"
              :width="300"
              :visible="false"
              cell-template="IDTemplate"
            />

            <dx-load-panel :enabled="false" />
            <dx-group-panel :visible="false" />
            <dx-search-panel :visible="true" :width="250" />

            <div slot="IDTemplate" slot-scope="{ data: item }">
              <span
                @click.stop.prevent="onIDClick(item);"
                class="data-grid-hyperlink"
              >{{ item.value }}</span>
            </div>
          </dx-data-grid>
        </div>
        <div class="grid-tab" slot="AddressesTab"></div>
        <div class="grid-tab" slot="BankAccountsTab"></div>
      </dx-tab-panel>
    </div>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import DxTabPanel from "devextreme-vue/tab-panel";
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem,
  DxLabel,
  DxRequiredRule,
  DxPatternRule,
  DxEmailRule,
  DxStringLengthRule,
  DxCustomRule
} from "devextreme-vue/form";
import {
  DxDataGrid,
  DxColumn,
  DxLoadPanel,
  DxGroupPanel,
  DxSearchPanel,
  DxColumnChooser
  //DxExport
} from "devextreme-vue/data-grid";
import {
  DxLookup
  //DxDropDownOptions
} from "devextreme-vue/lookup";
import { DxButton } from "devextreme-vue";
import { getNewId } from "../store/common";

var editToolbarButtonRef = null;
var copyToolbarButtonRef = null;
var deleteToolbarButtonRef = null;

export default {
  props: {
    id: {
      default: "",
      type: String
    }
  },
  name: "vendor",
  components: {
    DxToolbar,
    DxItem,
    DxTabPanel,
    DxForm,
    DxFormItem,
    DxGroupItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxEmailRule,
    DxStringLengthRule,
    DxCustomRule,
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxGroupPanel,
    DxSearchPanel,
    DxColumnChooser,
    DxLookup,
    //DxDropDownOptions,
    DxButton
    //DxExport
  },
  data() {
    return {
      formData: null,
      formOriginalData: null,
      tabsData: [
        {
          title: "General",
          template: "GeneralTab",
          isValid: true
        },
        {
          title: "Contacts",
          template: "ContactsTab",
          isValid: true
        },
        {
          title: "Addresses",
          template: "AddressesTab",
          isValid: true
        },
        {
          title: "Bank Accounts",
          template: "BankAccountsTab",
          isValid: true
        }
      ],
      saveNavButtonOptions: {
        icon: "fas fa-save",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Save",
        onClick: this.onSaveClick.bind(this)
      },
      cancelNavButtonOptions: {
        icon: "fas fa-times-circle",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Cancel",
        onClick: () => {
          this.$router.back();
        }
      },
      stateEditorOptions: {
        items: [
          { id: "ACT", text: "Australian Capital Territory" },
          { id: "NSW", text: "New South Wales" },
          { id: "NT", text: "Northern Territory" },
          { id: "QLD", text: "Queensland" },
          { id: "SA", text: "South Australia" },
          { id: "TAS", text: "Tasmania" },
          { id: "VIC", text: "Victoria" },
          { id: "WA", text: "Western Australia" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true
      },
      postcodeEditorOptions: {
        mask: "0000"
      },
      countryEditorOptions: {
        items: [{ id: "AUS", text: "Australia" }],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true
      },
      telephoneNoEditorOptions: {
        mask: "(00) 0000 0000"
      },
      mobileNoEditorOptions: {
        mask: "0000 000 000"
      },
      taxNoEditorOptions: {
        mask: "00 000 000 000"
      },
      bankBranchNoEditorOptions: {
        mask: "000-000"
      },
      vendorCodePattern: /^[^\s]+$/,
      pageSizes: [10, 15, 20, 25, 50, 100],
      communicationFocusedRowKey: "",
      stateStoring: {
        enabled: true,
        storageKey: "VendorAddresses",
        type: "custom",
        savingTimeout: 0,
        customLoad: function() {
          //console.log("stateStoring customLoad");
          //console.log(this.stateStoring);
          var state = localStorage.getItem(this.stateStoring.storageKey);
          /*if (state) {
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
            let index = this._.findIndex(this.getVendors[0].addresses, {
              addressID: newFocusedRowKey
            });
            if (index === -1) {
              // old key no longer exists
              // check if we have any records
              if (this.getVendors.addresses.length > 0) {
                // select the first row
                newFocusedRowKey = this.getVendors[0].addressID;
              }
            }

            // assign new focused row key
            state.focusedRowKey = newFocusedRowKey;
          }*/
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
    currentRouteName() {
      // returns NewVendor or EditVendor or CopyVendor
      return this.$route.name;
    }
  },
  methods: {
    loadFormData: function() {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.currentRouteName === "CreateVendor") {
        // create vendor
        let newVendor = {
          vendorID: getNewId(),
          vendorCode: "",
          vendorName: "",
          taxNo: "",
          addresses: [],
          active: true
        };
        //console.log(newVendor);
        // use new vendor
        this.formData = newVendor;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else if (this.currentRouteName === "EditVendor") {
        // edit vendor
        // get vendor by id
        let vendor = this.$store.getters.getVendorByID(this.id);
        //console.log(vendor);
        if (vendor) {
          // clone vendor
          this.formData = this._.cloneDeep(vendor);
          // clone formData
          this.formOriginalData = this._.cloneDeep(this.formData);
          console.log(this.formData);
        }
      } else {
        // copy vendor
        // get vendor by id
        let vendor = this.$store.getters.getVendorByID(this.id);
        //console.log(vendor);
        if (vendor) {
          // copy vendor with new id
          let newVendor = {
            vendorID: getNewId(),
            vendorCode: vendor.vendorCode,
            vendorName: vendor.vendorName,
            taxNo: vendor.taxNo,
            addresses: [],
            active: true
          };
          // use new vendor
          this.formData = newVendor;
          // clone formData
          this.formOriginalData = this._.cloneDeep(this.formData);
        }
      }
    },
    isFormDataChanged: function() {
      // check the main form data
      let isFormDataNotChanged = this._.isEqual(
        this.formData,
        this.formOriginalData
      );
      //console.log(isFormDataNotChanged);
      return !isFormDataNotChanged;
    },
    onSaveClick() {
      var resultGeneral = this.$refs["formGeneral"].instance.validate();

      // update accordionItems
      this.tabsData[0].isValid = resultGeneral.isValid;

      if (resultGeneral.isValid) {
        // all data is valid
        let changed = this.isFormDataChanged();
        //console.log("changed: " + changed);
        if (changed) {
          this.saveFormData();
        }
        this.$router.back();
      }
    },
    saveFormData() {
      if (this.currentRouteName === "EditVendor") {
        // update vendor
        this.$store.dispatch("updateVendor", this.formData);
      } else {
        // create vendor
        this.$store.dispatch("createVendor", this.formData);
        // update vendors grid state to set focus row to new record
        // get grid state
        var state = localStorage.getItem("Vendors");
        //console.log(state);
        if (state) {
          state = JSON.parse(state);
          state.focusedRowKey = this.formData.vendorID;
          // save state
          localStorage.setItem("Vendors", JSON.stringify(state));
        }
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    },
    vendorCodeValidation(e) {
      if (this.currentRouteName === "EditVendor") {
        // existing vendor
        return true;
      } else {
        // new vendor
        let result = this.$store.getters.vendorExistsByVendorCode(e.value);
        return (result = !result);
      }
    },
    onGeneralFieldDataChanged() {
      //console.log(e);
      var result = this.$refs["formGeneral"].instance.validate();
      this.tabsData[0].isValid = result.isValid;
    },
    onCommunicationToolbarPreparing(e) {
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
              this.$router.push("/CreateVendor");
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
              this.$router.push("/EditVendor/" + this.focusedRowKey);
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
              this.$router.push("/CopyVendor/" + this.focusedRowKey);
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
              this.$store.dispatch("deleteVendor", this.focusedRowKey);
              this.focusedRowKey = "";
            }
          }
        }
      );
    },
    onCommunicationFocusedRowChanged(e) {
      //console.log("onCommunicationFocusedRowChanged");
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.stateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
    },
    onIDClick() {
      //alert(e.text);
      //console.log("onIDClick");
      setTimeout(
        function() {
          this.$router.push("/EditContact/" + this.communicationFocusedRowKey);
        }.bind(this),
        1
      );
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  watch: {
    communicationFocusedRowKey: {
      handler(value) {
        //console.log("communicationFocusedRowKey value changed: " + value);
        if (value === "" || this.tabsData.contacts.length === 0) {
          editToolbarButtonRef.option("disabled", true);
          copyToolbarButtonRef.option("disabled", true);
          deleteToolbarButtonRef.option("disabled", true);
        } else {
          if (this.tabsData.contacts.length === 0) {
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
    }
  },
  mounted() {
    //console.log("mounted");
    if (this.currentRouteName === "EditVendor") {
      // existing vendor
      this.$refs["formGeneral"].instance.getEditor("vendorName").focus();
    } else {
      // new vendor
      this.$refs["formGeneral"].instance.getEditor("vendorCode").focus();
    }
  }
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  border-bottom: 1px solid;
}

.tab-panel {
  margin: 10px;
  height: calc(100vh - 186px);
}

.tab {
  padding: 15px;
}

.grid-tab {
  padding: 10px;
}

.form {
  height: calc(100vh - 257px);
}

.red {
  color: #d9534f;
  font-size: 18px;
  margin-left: 10px;
  vertical-align: -2px;
}

.dx-lookup-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  position: relative;
  -webkit-box-align: baseline;
  -webkit-align-items: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
}

.dx-lookup-button-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: auto;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-basis: content;
  -ms-flex-preferred-size: content;
  flex-basis: content;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>

<style>
.change-password-checkbox .dx-checkbox {
  padding-top: 7px;
}
</style>

