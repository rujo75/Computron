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
        :deferRendering="true"
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
                <dx-form-item template="addressTemplate">
                  <dx-label text="Address" />
                </dx-form-item>
                <dx-form-item data-field="addressLine1" :editor-options="{disabled: true}" />
                <dx-form-item data-field="addressLine2" :editor-options="{disabled: true}" />
                <dx-form-item data-field="city" :editor-options="{disabled: true}" />
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
                <dx-form-item template="contactTemplate">
                  <dx-label text="Contact" />
                </dx-form-item>
                <dx-form-item data-field="contactJobTitle" :editor-options="{disabled: true}">
                  <dx-label text="Job Title" />
                </dx-form-item>
                <dx-form-item data-field="contactDepartment" :editor-options="{disabled: true}">
                  <dx-label text="Department" />
                </dx-form-item>
                <dx-form-item
                  data-field="contactPhoneNo"
                  :editor-options="telephoneNoEditorOptions"
                >
                  <dx-label text="Phone No" />
                </dx-form-item>
                <dx-form-item data-field="contactFaxNo" :editor-options="telephoneNoEditorOptions">
                  <dx-label text="Fax No" />
                </dx-form-item>
                <dx-form-item data-field="contactMobileNo" :editor-options="mobileNoEditorOptions">
                  <dx-label text="Mobile No" />
                </dx-form-item>
                <dx-form-item data-field="contactEmail" :editor-options="{disabled: true}">
                  <dx-label text="Email" />
                </dx-form-item>
              </dx-group-item>
            </dx-group-item>
            <template #addressTemplate>
              <div class="dx-texteditor-container">
                <dx-lookup
                  class="dx-lookup-container"
                  :items="formData.addresses"
                  value-expr="addressID"
                  display-expr="addressName"
                  :drop-down-options="dropDownOptions"
                  :value="formData.addressID"
                  @item-click="setSelectedAddress"
                />
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
            <template #contactTemplate>
              <div class="dx-texteditor-container">
                <dx-lookup
                  class="dx-lookup-container"
                  :items="formData.contacts"
                  value-expr="contactID"
                  display-expr="contactName"
                  :drop-down-options="dropDownOptions"
                  :value="formData.contactID"
                  @item-click="setSelectedContact"
                />
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
          <dx-data-grid
            ref="contactsGrid"
            key-expr="contactID"
            :data-source="formData.contacts"
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
            :focused-row-key.sync="contactsFocusedRowKey"
            :state-storing="contactsStateStoring"
            column-resizing-mode="widget"
            width="100%"
            height="calc(100vh - 251px)"
            @toolbar-preparing="onContactsToolbarPreparing($event);"
            @focused-row-changed="onContactsFocusedRowChanged"
          >
            <dx-export
              :enabled="true"
              :allow-export-selected-data="false"
              file-name="Vendor Contacts"
            />
            <dx-column-chooser :enabled="true" />
            <dx-column
              data-field="contactID"
              caption="Contact ID"
              data-type="string"
              :width="300"
              :visible="false"
              cell-template="IDTemplate"
            />
            <dx-column
              data-field="contactCode"
              caption="Contact Code"
              data-type="string"
              :width="130"
              :visible="false"
            />
            <dx-column
              data-field="contactName"
              caption="Contact Name"
              data-type="string"
              :min-width="200"
            />
            <dx-column
              data-field="jobTitle"
              caption="Job Title"
              data-type="string"
              :min-width="150"
            />
            <dx-column
              data-field="department"
              caption="Department"
              data-type="string"
              :min-width="150"
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
              <span
                @click.stop.prevent="onIDClick(item);"
                class="data-grid-hyperlink"
              >{{ item.value }}</span>
            </div>
            <div
              slot="phoneNoTemplate"
              slot-scope="{ data: item }"
            >{{ item.value | VMask(phoneNoMask) }}</div>
            <div
              slot="mobileNoTemplate"
              slot-scope="{ data: item }"
            >{{ item.value | VMask(mobileNoMask) }}</div>
          </dx-data-grid>
        </div>
        <div class="grid-tab" slot="AddressesTab">
          <dx-data-grid
            ref="addressesGrid"
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
            :focused-row-key.sync="addressesFocusedRowKey"
            :state-storing="addressesStateStoring"
            column-resizing-mode="widget"
            width="100%"
            height="calc(100vh - 251px)"
            @toolbar-preparing="onAddressesToolbarPreparing($event);"
            @focused-row-changed="onAddressesFocusedRowChanged"
          >
            <dx-export
              :enabled="true"
              :allow-export-selected-data="false"
              file-name="Vendor Addresses"
            />
            <dx-column-chooser :enabled="true" />
            <dx-column
              data-field="addressID"
              caption="Address ID"
              data-type="string"
              :width="300"
              :visible="false"
              cell-template="IDTemplate"
            />
            <dx-column
              data-field="addressCode"
              caption="Address Code"
              data-type="string"
              :width="130"
              :visible="false"
            />
            <dx-column
              data-field="addressName"
              caption="Address Name"
              data-type="string"
              :min-width="200"
            />
            <dx-column
              data-field="addressLine1"
              caption="Address Line 1"
              data-type="string"
              :min-width="200"
            />
            <dx-column
              data-field="addressLine2"
              caption="Address Line 2"
              data-type="string"
              :min-width="200"
              :visible="false"
            />
            <dx-column data-field="city" caption="City" data-type="string" :width="120" />
            <dx-column data-field="postcode" caption="Postcode" data-type="string" :width="90" />
            <dx-column
              data-field="country"
              caption="Country"
              data-type="string"
              :width="120"
              :visible="false"
            />
            <dx-column data-field="state" caption="State" data-type="string" :width="120" />
            <dx-column
              data-field="email"
              caption="Email"
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
              <span
                @click.stop.prevent="onIDClick(item);"
                class="data-grid-hyperlink"
              >{{ item.value }}</span>
            </div>
          </dx-data-grid>
        </div>
        <div class="grid-tab" slot="BankAccountsTab">
          <dx-data-grid
            ref="bankAccountsGrid"
            key-expr="bankAccountID"
            :data-source="formData.bankAccounts"
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
            :focused-row-key.sync="bankAccountsFocusedRowKey"
            :state-storing="bankAccountsStateStoring"
            column-resizing-mode="widget"
            width="100%"
            height="calc(100vh - 251px)"
            @toolbar-preparing="onBankAccountsToolbarPreparing($event);"
            @focused-row-changed="onBankAccountsFocusedRowChanged"
          >
            <dx-export
              :enabled="true"
              :allow-export-selected-data="false"
              file-name="Bank Accounts"
            />
            <dx-column-chooser :enabled="true" />
            <dx-column
              data-field="bankAccountID"
              caption="Bank Account ID"
              data-type="string"
              :width="300"
              :visible="false"
              cell-template="IDTemplate"
            />
            <dx-column
              data-field="bankAccountCode"
              caption="Bank Account Code"
              data-type="string"
              :width="130"
              :visible="false"
            />
            <dx-column
              data-field="bankName"
              caption="Bank Name"
              data-type="string"
              :min-width="120"
            />
            <dx-column
              data-field="bankBranchNo"
              caption="Bank Branch No"
              data-type="string"
              :width="100"
              cell-template="bankBranchNoTemplate"
            />
            <dx-column
              data-field="bankAccountNo"
              caption="Bank Account No"
              data-type="string"
              :width="100"
            />
            <dx-column
              data-field="swiftCode"
              caption="SWIFT Code"
              data-type="string"
              :width="100"
              :visible="false"
            />
            <dx-column
              data-field="iban"
              caption="IBAN"
              data-type="string"
              :width="100"
              :visible="false"
            />
            <dx-column
              data-field="addressLine1"
              caption="Address Line 1"
              data-type="string"
              :min-width="200"
            />
            <dx-column
              data-field="addressLine2"
              caption="Address Line 2"
              data-type="string"
              :min-width="200"
              :visible="false"
            />
            <dx-column data-field="city" caption="City" data-type="string" :width="120" />
            <dx-column data-field="postcode" caption="Postcode" data-type="string" :width="90" />
            <dx-column
              data-field="country"
              caption="Country"
              data-type="string"
              :width="120"
              :visible="false"
            />
            <dx-column data-field="state" caption="State" data-type="string" :width="120" />

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
              <span
                @click.stop.prevent="onIDClick(item);"
                class="data-grid-hyperlink"
              >{{ item.value }}</span>
            </div>
            <div
              slot="bankBranchNoTemplate"
              slot-scope="{ data: item }"
            >{{ item.value | VMask(bankBranchNoMask) }}</div>
          </dx-data-grid>
        </div>
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
  //DxEmailRule,
  DxStringLengthRule,
  DxCustomRule,
} from "devextreme-vue/form";
import {
  DxDataGrid,
  DxColumn,
  DxLoadPanel,
  DxGroupPanel,
  DxSearchPanel,
  DxColumnChooser,
  DxExport,
} from "devextreme-vue/data-grid";
import {
  DxLookup, //DxDropDownOptions
} from "devextreme-vue/lookup";
import { DxButton } from "devextreme-vue";
import { getNewId } from "../store/common";

var editContactsToolbarButtonRef = null;
var copyContactsToolbarButtonRef = null;
var deleteContactsToolbarButtonRef = null;

var editAddressesToolbarButtonRef = null;
var copyAddressesToolbarButtonRef = null;
var deleteAddressesToolbarButtonRef = null;

var editBankAccountsToolbarButtonRef = null;
var copyBankAccountsToolbarButtonRef = null;
var deleteBankAccountsToolbarButtonRef = null;

export default {
  props: {
    id: {
      default: "",
      type: String,
    },
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
    //DxEmailRule,
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
    DxButton,
    DxExport,
  },
  data() {
    return {
      formData: null,
      formOriginalData: null,
      phoneNoMask: "(##) #### ####",
      mobileNoMask: "#### ### ###",
      bankBranchNoMask: "###-###",
      tabsData: [
        {
          title: "General",
          template: "GeneralTab",
          isValid: true,
        },
        {
          title: "Contacts",
          template: "ContactsTab",
          isValid: true,
        },
        {
          title: "Addresses",
          template: "AddressesTab",
          isValid: true,
        },
        {
          title: "Bank Accounts",
          template: "BankAccountsTab",
          isValid: true,
        },
      ],
      saveNavButtonOptions: {
        icon: "fas fa-save",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Save",
        onClick: this.onSaveClick.bind(this),
      },
      cancelNavButtonOptions: {
        icon: "fas fa-ban",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Cancel",
        onClick: () => {
          this.$router.back();
        },
      },
      dropDownOptions: {
        closeOnOutsideClick: true,
        showTitle: false,
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
          { id: "WA", text: "Western Australia" },
        ],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true,
        disabled: true,
      },
      postcodeEditorOptions: {
        mask: "0000",
        disabled: true,
      },
      countryEditorOptions: {
        items: [{ id: "AUS", text: "Australia" }],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true,
        disabled: true,
      },
      telephoneNoEditorOptions: {
        mask: "(00) 0000 0000",
        disabled: true,
      },
      mobileNoEditorOptions: {
        mask: "0000 000 000",
        disabled: true,
      },
      taxNoEditorOptions: {
        mask: "00 000 000 000",
      },
      bankBranchNoEditorOptions: {
        mask: "000-000",
      },
      vendorCodePattern: /^[^\s]+$/,
      pageSizes: [10, 15, 20, 25, 50, 100],
      contactsFocusedRowKey: "",
      contactsStateStoring: {
        enabled: true,
        storageKey: "VendorContacts",
        type: "custom",
        savingTimeout: 0,
        customLoad: function () {
          //console.log("contactsStateStoring customLoad");
          //console.log(this.contactsStateStoring);
          var state = localStorage.getItem(
            this.contactsStateStoring.storageKey
          );
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
            newFocusedRowKey = state.contactsFocusedRowKey;
            let index = this._.findIndex(this.formData.contacts, {
              contactID: newFocusedRowKey,
            });
            if (index === -1) {
              // old key no longer exists
              // check if we have any records
              if (this.formData.contacts.length > 0) {
                // select the first row
                newFocusedRowKey = this.formData.contactID;
              }
            }

            // assign new focused row key
            state.contactsFocusedRowKey = newFocusedRowKey;
          }
          return state;
        }.bind(this),
        customSave: function (state) {
          //console.log("contactsStateStoring customSave");
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        },
      },
      addressesFocusedRowKey: "",
      addressesStateStoring: {
        enabled: true,
        storageKey: "VendorAddresses",
        type: "custom",
        savingTimeout: 0,
        customLoad: function () {
          //console.log("addressesStateStoring customLoad");
          //console.log(this.addressesStateStoring);
          var state = localStorage.getItem(
            this.addressesStateStoring.storageKey
          );
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
            newFocusedRowKey = state.addressesFocusedRowKey;
            let index = this._.findIndex(this.formData.addresses, {
              addressID: newFocusedRowKey,
            });
            if (index === -1) {
              // old key no longer exists
              // check if we have any records
              if (this.formData.addresses.length > 0) {
                // select the first row
                newFocusedRowKey = this.formData.addressID;
              }
            }

            // assign new focused row key
            state.addressesFocusedRowKey = newFocusedRowKey;
          }
          return state;
        }.bind(this),
        customSave: function (state) {
          //console.log("addressesStateStoring customSave");
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        },
      },
      bankAccountsFocusedRowKey: "",
      bankAccountsStateStoring: {
        enabled: true,
        storageKey: "VendorBankAccounts",
        type: "custom",
        savingTimeout: 0,
        customLoad: function () {
          //console.log("bankAccountsStateStoring customLoad");
          //console.log(this.bankAccountsStateStoring);
          var state = localStorage.getItem(
            this.bankAccountsStateStoring.storageKey
          );
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
            newFocusedRowKey = state.bankAccountsFocusedRowKey;
            let index = this._.findIndex(this.formData.bankAccounts, {
              addressID: newFocusedRowKey,
            });
            if (index === -1) {
              // old key no longer exists
              // check if we have any records
              if (this.formData.bankAccounts.length > 0) {
                // select the first row
                newFocusedRowKey = this.formData.bankAccountID;
              }
            }

            // assign new focused row key
            state.bankAccountsFocusedRowKey = newFocusedRowKey;
          }
          return state;
        }.bind(this),
        customSave: function (state) {
          //console.log("bankAccountsStateStoring customSave");
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        },
      },
    };
  },
  computed: {
    currentRouteName() {
      // returns NewVendor or EditVendor or CopyVendor
      return this.$route.name;
    },
  },
  methods: {
    loadFormData: function () {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.currentRouteName === "CreateVendor") {
        // create vendor
        let newVendor = {
          vendorID: getNewId(),
          vendorCode: "",
          vendorName: "",
          taxNo: "",
          contacts: [],
          addresses: [],
          bankAccounts: [],
          active: true,
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
            contacts: [],
            addresses: [],
            bankAccounts: [],
            active: true,
          };
          // use new vendor
          this.formData = newVendor;
          // clone formData
          this.formOriginalData = this._.cloneDeep(this.formData);
        }
      }
    },
    isFormDataChanged: function () {
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
    onContactsToolbarPreparing(e) {
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
            },
          },
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
            onInitialized: (e) => {
              editContactsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/EditVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              copyContactsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/CopyVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              deleteContactsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$store.dispatch("deleteVendor", this.focusedRowKey);
              this.focusedRowKey = "";
            },
          },
        }
      );
    },
    onContactsFocusedRowChanged(e) {
      //console.log("onContactsFocusedRowChanged");
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.contactsStateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
    },
    onIDClick() {
      //alert(e.text);
      //console.log("onIDClick");
      setTimeout(
        function () {
          this.$router.push("/EditContact/" + this.communicationFocusedRowKey);
        }.bind(this),
        1
      );
    },
    onAddressesToolbarPreparing(e) {
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
            },
          },
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
            onInitialized: (e) => {
              editAddressesToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/EditVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              copyAddressesToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/CopyVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              deleteAddressesToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$store.dispatch("deleteVendor", this.focusedRowKey);
              this.focusedRowKey = "";
            },
          },
        }
      );
    },
    onAddressesFocusedRowChanged(e) {
      //console.log("onAddressesFocusedRowChanged");
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.addressesStateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
    },
    onBankAccountsToolbarPreparing(e) {
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
            },
          },
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
            onInitialized: (e) => {
              editBankAccountsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/EditVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              copyBankAccountsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$router.push("/CopyVendor/" + this.focusedRowKey);
            },
          },
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
            onInitialized: (e) => {
              deleteBankAccountsToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$store.dispatch("deleteVendor", this.focusedRowKey);
              this.focusedRowKey = "";
            },
          },
        }
      );
    },
    onBankAccountsFocusedRowChanged(e) {
      //console.log("onBankAccountsFocusedRowChanged");
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.bankAccountsStateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
    },
    setSelectedContact(e) {
      //console.log(e.itemData);
      this.formData.contactID = e.itemData.contactID;
      this.formData.contactCode = e.itemData.contactCode;
      this.formData.contactName = e.itemData.contactName;
      this.formData.contactJobTitle = e.itemData.jobTitle;
      this.formData.contactDepartment = e.itemData.department;
      this.formData.contactPhoneNo = e.itemData.phoneNo;
      this.formData.contactFaxNo = e.itemData.faxNo;
      this.formData.contactMobileNo = e.itemData.mobileNo;
      this.formData.contactEmail = e.itemData.email;
    },
    setSelectedAddress(e) {
      this.formData.addressID = e.itemData.addressID;
      this.formData.addressCode = e.itemData.addressCode;
      this.formData.addressName = e.itemData.addressName;
      this.formData.addressLine1 = e.itemData.addressLine1;
      this.formData.addressLine2 = e.itemData.addressLine2;
      this.formData.city = e.itemData.city;
      this.formData.state = e.itemData.state;
      this.formData.postcode = e.itemData.postcode;
      this.formData.country = e.itemData.country;
      this.formData.email = e.itemData.email;
      this.formData.website = e.itemData.website;
    },
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  watch: {
    contactsFocusedRowKey: {
      handler(value) {
        //console.log("contactsFocusedRowKey value changed: " + value);
        if (value === "" || this.formData.contacts.length === 0) {
          editContactsToolbarButtonRef.option("disabled", true);
          copyContactsToolbarButtonRef.option("disabled", true);
          deleteContactsToolbarButtonRef.option("disabled", true);
        } else {
          if (this.formData.contacts.length === 0) {
            editContactsToolbarButtonRef.option("disabled", true);
            copyContactsToolbarButtonRef.option("disabled", true);
            deleteContactsToolbarButtonRef.option("disabled", true);
          } else {
            editContactsToolbarButtonRef.option("disabled", false);
            copyContactsToolbarButtonRef.option("disabled", false);
            deleteContactsToolbarButtonRef.option("disabled", false);
          }
        }
      },
    },
    addressesFocusedRowKey: {
      handler(value) {
        //console.log("addressesFocusedRowKey value changed: " + value);
        if (value === "" || this.formData.addresses.length === 0) {
          editAddressesToolbarButtonRef.option("disabled", true);
          copyAddressesToolbarButtonRef.option("disabled", true);
          deleteAddressesToolbarButtonRef.option("disabled", true);
        } else {
          if (this.formData.addresses.length === 0) {
            editAddressesToolbarButtonRef.option("disabled", true);
            copyAddressesToolbarButtonRef.option("disabled", true);
            deleteAddressesToolbarButtonRef.option("disabled", true);
          } else {
            editAddressesToolbarButtonRef.option("disabled", false);
            copyAddressesToolbarButtonRef.option("disabled", false);
            deleteAddressesToolbarButtonRef.option("disabled", false);
          }
        }
      },
    },
    bankAccountsFocusedRowKey: {
      handler(value) {
        //console.log("bankAccountsFocusedRowKey value changed: " + value);
        if (value === "" || this.formData.bankAccounts.length === 0) {
          editBankAccountsToolbarButtonRef.option("disabled", true);
          copyBankAccountsToolbarButtonRef.option("disabled", true);
          deleteBankAccountsToolbarButtonRef.option("disabled", true);
        } else {
          if (this.formData.bankAccounts.length === 0) {
            editBankAccountsToolbarButtonRef.option("disabled", true);
            copyBankAccountsToolbarButtonRef.option("disabled", true);
            deleteBankAccountsToolbarButtonRef.option("disabled", true);
          } else {
            editBankAccountsToolbarButtonRef.option("disabled", false);
            copyBankAccountsToolbarButtonRef.option("disabled", false);
            deleteBankAccountsToolbarButtonRef.option("disabled", false);
          }
        }
      },
    },
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
  },
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

