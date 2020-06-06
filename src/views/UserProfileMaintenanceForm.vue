<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <dx-form ref="form" :form-data="getFormData" :scrolling-enabled="true" class="form">
        <dx-group-item caption="Security Details" :col-count="2">
          <dx-form-item data-field="username">
            <dx-label text="Email" />
          </dx-form-item>
          <dx-form-item data-field="password" />
        </dx-group-item>
        <dx-group-item caption="General Details" :col-count="2">
          <dx-form-item data-field="firstname">
            <dx-label text="First Name" />
          </dx-form-item>
          <dx-form-item data-field="lastname">
            <dx-label text="Last Name" />
          </dx-form-item>
          <dx-form-item data-field="enabled" editor-type="dxSwitch" />
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
      validationRules: {
        companyNo: [{ type: "required", message: "Company No is required." }]
      },
      /* stateEditorOptions: {
        items: [
          { id: "enabled", text: "Enabled" },
          { id: "disabled", text: "Disabled" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true
      }, */
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
  border-bottom: 1px solid;
}

.form {
  margin: 20px;
  height: calc(100vh - 206px);
}
</style>