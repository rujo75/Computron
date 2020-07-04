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
            <dx-group-item :col-count="2">
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
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="active" editor-type="dxCheckBox" />
            </dx-group-item>
          </dx-form>
        </div>
        <div class="tab" slot="CommunicationTab">
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
            :state-storing="stateStoring"
            column-resizing-mode="widget"
            width="100%"
            height="calc(100vh - 259px)"
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
        <div class="tab" slot="PaymentsTab"></div>
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
    //DxEmailRule,
    DxStringLengthRule,
    DxCustomRule,
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxGroupPanel,
    DxSearchPanel,
    DxColumnChooser
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
          title: "Communication",
          template: "CommunicationTab",
          isValid: true
        },
        {
          title: "Payments",
          template: "PaymentsTab",
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
        icon: "fas fa-times",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Cancel",
        onClick: () => {
          this.$router.back();
        }
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
        if (value === "" || this.getVendors.length === 0) {
          editToolbarButtonRef.option("disabled", true);
          copyToolbarButtonRef.option("disabled", true);
          deleteToolbarButtonRef.option("disabled", true);
        } else {
          if (this.getVendors.addresses.length === 0) {
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
  padding: 15px 15px;
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
</style>

<style>
.change-password-checkbox .dx-checkbox {
  padding-top: 7px;
}
</style>
