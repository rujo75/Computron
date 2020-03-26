<template>
  <div>
    <dx-toolbar>
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <dx-form ref="formCompanies" :form-data="getFormData" :scrolling-enabled="true" class="form">
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
import { mapGetters } from "vuex";

export default {
  name: "app",
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
      formData: {
        id: "1",
        companyNo: "001",
        companyName: "City of Melbourne",
        companyCode: "COM",
        addressLine1: "100 Burk Steet",
        addressLine2: "",
        city: "Melbourne",
        state: "VIC",
        postcode: "3000",
        country: "AUS",
        telephoneNo: "0392003776",
        faxNo: "",
        mobileNo: "",
        taxNo: "12345678901",
        dunsNo: "",
        emailAddress: "helpdesk@melbourne.vic.gov.au"
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
      }
    };
  },
  computed: {
    ...mapGetters(["getFormData"])
  }
};
</script>

<style scoped>
.dx-toolbar {
  /* background-color: rgba(191, 191, 191, 0.15); */
  padding: 5px 10px;
  /* border-bottom: 1px solid rgba(221, 221, 221); */
  border-bottom: 1px solid rgba(77, 77, 77);
}

.form {
  margin: 20px;
  height: calc(100vh - 206px);
}
</style>