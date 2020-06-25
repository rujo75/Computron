<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <dx-scroll-view show-scrollbar="onHover" height="calc(100vh - 166px)">
        <form>
          <dx-accordion
            :multiple="true"
            :collapsible="true"
            class="accordion"
            @contentReady="onAccordionContentReady"
          >
            <dx-accordion-item #default title="General">
              <dx-form
                ref="formGeneral"
                :form-data="formData"
                validation-group="companyData"
                labelLocation="top"
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
                    <dx-string-length-rule
                      :max="50"
                      message="City must have maximum 50 characters!"
                    />
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
                  <dx-form-item
                    data-field="active"
                    editor-type="dxCheckBox"
                    :editor-options="{text: 'Active'}"
                  >
                    <dx-label :visible="false" />
                  </dx-form-item>
                </dx-group-item>
              </dx-form>
            </dx-accordion-item>
            <dx-accordion-item #default title="Communication">
              <dx-form
                ref="formCommunication"
                :form-data="formData"
                validation-group="companyData"
                labelLocation="top"
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
            </dx-accordion-item>
            <dx-accordion-item #default title="Payments">
              <dx-form
                ref="formPayments"
                :form-data="formData"
                validation-group="companyData"
                labelLocation="top"
              >
                <dx-group-item :col-count="2">
                  <dx-form-item data-field="bankName">
                    <dx-string-length-rule
                      :max="100"
                      message="Bank Name must have maximum 100 characters!"
                    />
                  </dx-form-item>
                  <dx-form-item data-field="bankBranchNo"></dx-form-item>
                  <dx-form-item data-field="bankAccountNo"></dx-form-item>
                  <dx-form-item data-field="swiftCode">
                    <dx-label text="SWIFT Code" />
                  </dx-form-item>
                  <dx-form-item data-field="iban">
                    <dx-label text="IBAN" />
                  </dx-form-item>
                </dx-group-item>
              </dx-form>
            </dx-accordion-item>
          </dx-accordion>
        </form>
      </dx-scroll-view>
    </div>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import {
  DxAccordion,
  DxItem as DxAccordionItem
} from "devextreme-vue/accordion";
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
import { DxScrollView } from "devextreme-vue/scroll-view";
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
    DxAccordion,
    DxAccordionItem,
    DxForm,
    DxFormItem,
    DxGroupItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxEmailRule,
    DxStringLengthRule,
    DxCustomRule,
    DxScrollView
  },
  data() {
    return {
      formData: null,
      formOriginalData: null,
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
      validationRules: {
        companyNo: [{ type: "required", message: "Company No is required." }]
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
      dunsNoEditorOptions: {
        mask: "000 000 000"
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
    onAccordionContentReady() {
      // expand security item
      //e.component.expandItem(1);
    },
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

.form {
  margin: 20px;
  height: calc(100vh - 206px);
}

.accordion {
  margin: 10px;
}
</style>