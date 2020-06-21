<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <form>
        <dx-form ref="form" :form-data="formData" :scrolling-enabled="true" class="form">
          <dx-group-item :col-count="2">
            <dx-form-item data-field="companyNo" :editor-options="{disabled: true}" />
          </dx-group-item>
          <dx-group-item caption="Company Details" :col-count="2">
            <dx-form-item data-field="companyName" />
            <dx-form-item data-field="companyCode" />
          </dx-group-item>
          <dx-group-item caption="Company Address" :col-count="2">
            <dx-form-item data-field="addressLine1" />
            <dx-form-item data-field="addressLine2" />
            <dx-form-item data-field="city" />
            <dx-form-item
              data-field="state"
              editor-type="dxSelectBox"
              :editor-options="stateEditorOptions"
            />
            <dx-form-item data-field="postcode" :editor-options="postcodeEditorOptions" />
            <dx-form-item
              data-field="country"
              editor-type="dxSelectBox"
              :editor-options="countryEditorOptions"
            />
          </dx-group-item>
          <dx-group-item caption="Company Contact Details" :col-count="2">
            <dx-form-item data-field="telephoneNo" :editor-options="telephoneNoEditorOptions">
              <dx-label text="Telephone" />
            </dx-form-item>
            <dx-form-item data-field="faxNo" :editor-options="telephoneNoEditorOptions">
              <dx-label text="Fax" />
            </dx-form-item>
            <dx-form-item data-field="mobileNo" :editor-options="mobileNoEditorOptions">
              <dx-label text="Mobile" />
            </dx-form-item>
            <dx-form-item data-field="emailAddress" />
          </dx-group-item>
          <dx-group-item caption="Other Company Details" :col-count="2">
            <dx-form-item data-field="taxNo" :editor-options="taxNoEditorOptions">
              <dx-label text="ABN" />
            </dx-form-item>
            <dx-form-item data-field="dunsNo" :editor-options="dunsNoEditorOptions" />
          </dx-group-item>
        </dx-form>
      </form>
    </div>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem,
  DxLabel
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
    DxForm,
    DxFormItem,
    DxGroupItem,
    DxLabel
  },
  data() {
    return {
      saveNavButtonOptions: {
        icon: "fas fa-save",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Save",
        onClick: () => {
          this.$router.back();
        }
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
      formData: null,
      formOriginalData: null,
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
      }
    };
  },
  computed: {},
  methods: {
    loadFormData: function() {
      console.log("loadFormData");
      console.log("id: " + this.id);
      if (this.id === "") {
        // create company
        let newCompany = {
          companyID: getNewId(),
          companyNo: "",
          companyNoFormatted: "",
          companyName: "",
          companyCode: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          telephoneNo: "",
          telephoneNoFormatted: "",
          faxNo: "",
          mobileNo: "",
          mobileNoFormatted: "",
          taxNo: "",
          taxNoFormatted: "",
          dunsNo: "",
          emailAddress: "",
          enabled: true
        };
        // use new company
        this.formData = newCompany;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else {
        // edit company
        // get company by id
        let company = this.$store.getters.getCompanyByID(this.id);
        console.log(company);
        if (company) {
          // clone company
          this.formData = this._.cloneDeep(company);
          // clone formData
          this.formOriginalData = this._.cloneDeep(this.formData);
        }
      }
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  mounted() {
    //console.log("mounted");
    //this.$refs["formGeneral"].instance.getEditor("userName").focus();
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
</style>