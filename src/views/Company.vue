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
            validation-group="companyData1"
            @field-data-changed="onGeneralFieldDataChanged"
          >
            <dx-group-item :col-count="2">
              <dx-form-item data-field="companyID" :editor-options="{disabled: true}">
                <dx-label text="Company ID" />
              </dx-form-item>
              <dx-form-item data-field="companyNo" :editor-options="{disabled: !isNewRecord}">
                <dx-label text="Company No" />
                <dx-required-rule message="Company No is required!" />
                <dx-pattern-rule
                  :pattern="companyNoPattern"
                  message="Do not use spaces in the Company No!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="Company No must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="companyNoValidation"
                  message="Company No is already used!"
                />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="companyName">
                <dx-required-rule message="Company No is required!" />
                <dx-string-length-rule
                  :max="255"
                  message="Company No must have maximum 255 characters!"
                />
                <dx-custom-rule
                  :validation-callback="companyNameValidation"
                  message="Company Name is already used!"
                />
              </dx-form-item>
              <dx-form-item data-field="companyCode">
                <dx-string-length-rule
                  :max="20"
                  message="Company Code must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="companyCodeValidation"
                  message="Company Code is already used!"
                />
              </dx-form-item>
              <dx-form-item data-field="addressLine1">
                <dx-string-length-rule
                  :max="255"
                  message="Address Line 1 must have maximum 255 characters!"
                />
              </dx-form-item>
              <dx-form-item data-field="addressLine2">
                <dx-string-length-rule
                  :max="255"
                  message="Address Line 2 must have maximum 255 characters!"
                />
              </dx-form-item>
              <dx-form-item data-field="city">
                <dx-string-length-rule :max="50" message="City must have maximum 50 characters!" />
              </dx-form-item>
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
              <dx-form-item data-field="taxNo" :editor-options="taxNoEditorOptions">
                <dx-label text="ABN" />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <!--:editor-options="{text: 'Active'}"-->
              <!--<dx-label :visible="true" />-->
              <dx-form-item data-field="active" editor-type="dxCheckBox" />
            </dx-group-item>
          </dx-form>
        </div>
        <div class="tab" slot="CommunicationTab">
          <dx-form
            ref="formCommunication"
            class="form"
            :form-data="formData"
            :scrolling-enabled="true"
            validation-group="companyData2"
            @field-data-changed="onCommunicationFieldDataChanged"
          >
            <dx-group-item :col-count="2">
              <dx-form-item data-field="phoneNo" :editor-options="telephoneNoEditorOptions">
                <dx-label text="Phone No" />
              </dx-form-item>
              <dx-form-item data-field="faxNo" :editor-options="telephoneNoEditorOptions">
                <dx-label text="Fax No" />
              </dx-form-item>
              <dx-form-item data-field="mobileNo" :editor-options="mobileNoEditorOptions">
                <dx-label text="Mobile No" />
              </dx-form-item>
              <dx-form-item data-field="contactName">
                <dx-string-length-rule
                  :max="255"
                  message="Contact Name must have maximum 255 characters!"
                />
              </dx-form-item>
              <dx-form-item data-field="email">
                <dx-required-rule message="Email is required!" />
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
          </dx-form>
        </div>
        <div class="tab" slot="PaymentsTab">
          <dx-form
            ref="formPayments"
            class="form"
            :form-data="formData"
            :scrolling-enabled="true"
            validation-group="companyData3"
          >
            <dx-group-item :col-count="2">
              <dx-form-item data-field="bankName">
                <dx-string-length-rule
                  :max="100"
                  message="Bank Name must have maximum 100 characters!"
                />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="bankBranchNo" :editor-options="bankBranchNoEditorOptions" />
              <dx-form-item data-field="bankAccountNo" />
              <dx-form-item data-field="swiftCode">
                <dx-label text="SWIFT Code" />
              </dx-form-item>
              <dx-form-item data-field="iban">
                <dx-label text="IBAN" />
              </dx-form-item>
            </dx-group-item>
          </dx-form>
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
  DxEmailRule,
  DxStringLengthRule,
  DxCustomRule
} from "devextreme-vue/form";
import { getNewId } from "../store/common";

export default {
  props: {
    id: {
      default: "",
      type: String
    }
  },
  name: "company",
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
    DxCustomRule
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
      companyNoPattern: /^[^\s]+$/
    };
  },
  computed: {
    isNewRecord() {
      if (this.id === "") {
        // new company
        return true;
      } else {
        // company company
        return false;
      }
    }
  },
  methods: {
    loadFormData: function() {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.isNewRecord) {
        // create company
        let newCompany = {
          companyID: getNewId(),
          companyNo: "",
          companyName: "",
          companyCode: "",
          addressLine1: "",
          addressLine2: "",
          contactName: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          phoneNo: "",
          phoneNoFormatted: "",
          faxNo: "",
          mobileNo: "",
          mobileNoFormatted: "",
          taxNo: "",
          taxNoFormatted: "",
          email: "",
          website: "",
          logo: "",
          bankName: "",
          bankBranchNo: "",
          bankAccountNo: "",
          swiftCode: "",
          iban: "",
          active: true
        };
        // use new company
        this.formData = newCompany;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else {
        // edit company
        // get company by id
        let company = this.$store.getters.getCompanyByID(this.id);
        //console.log(company);
        if (company) {
          // clone company
          this.formData = this._.cloneDeep(company);
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
      //console.log("onSaveClick");
      var resultGeneral = this.$refs["formGeneral"].instance.validate();
      var resultCommunication = this.$refs[
        "formCommunication"
      ].instance.validate();
      var resultPayments = this.$refs["formPayments"].instance.validate();

      //console.log(resultGeneral.isValid);
      //console.log(resultCommunication.isValid);
      //console.log(resultPayments.isValid);

      // update accordionItems
      this.tabsData[0].isValid = resultGeneral.isValid;
      this.tabsData[1].isValid = resultCommunication.isValid;
      this.tabsData[2].isValid = resultPayments.isValid;

      if (
        resultGeneral.isValid &&
        resultCommunication.isValid &&
        resultPayments.isValid
      ) {
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
      //console.log("saveFormData");
      if (this.isNewRecord) {
        // create company
        this.$store.dispatch("createCompany", this.formData);
      } else {
        // update company
        this.$store.dispatch("updateCompany", this.formData);
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    },
    companyNoValidation(e) {
      if (this.isNewRecord) {
        // new company
        let result = this.$store.getters.companyExistsByCompanyNo(e.value);
        return (result = !result);
      } else {
        // existing company
        return true;
      }
    },
    companyNameValidation(e) {
      if (this.isNewRecord) {
        // new company
        let result = this.$store.getters.companyExistsByCompanyName(e.value);
        return (result = !result);
      } else {
        // existing company
        return true;
      }
    },
    companyCodeValidation(e) {
      if (this.isNewRecord) {
        // new company
        let result = this.$store.getters.companyExistsByCompanyCode(e.value);
        return (result = !result);
      } else {
        // existing company
        return true;
      }
    },
    onGeneralFieldDataChanged() {
      //console.log(e);
      var result = this.$refs["formGeneral"].instance.validate();
      this.tabsData[0].isValid = result.isValid;
    },
    onCommunicationFieldDataChanged() {
      //console.log(e);
      var result = this.$refs["formCommunication"].instance.validate();
      this.tabsData[1].isValid = result.isValid;
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  mounted() {
    //console.log("mounted");
    if (this.isNewRecord) {
      // new company
      this.$refs["formGeneral"].instance.getEditor("companyNo").focus();
    } else {
      // existing company
      this.$refs["formGeneral"].instance.getEditor("companyName").focus();
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