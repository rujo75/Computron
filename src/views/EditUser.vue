<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <dx-accordion
        :multiple="true"
        :collapsible="true"
        class="accordion"
        @initialized="onAccordionInitialized"
      >
        <dx-accordion-item #default title="General">
          <dx-form ref="formGeneral" :form-data="getFormData">
            <dx-group-item :col-count="2">
              <dx-form-item data-field="userId" :editor-options="{disabled: true}">
                <dx-label text="User ID" />
              </dx-form-item>
              <dx-form-item data-field="userName">
                <dx-label text="User Name" />
              </dx-form-item>
              <dx-form-item data-field="fullName">
                <dx-label text="Full Name" />
              </dx-form-item>
              <dx-form-item data-field="email" />
              <dx-form-item
                data-field="enabled"
                editor-type="dxSwitch"
                :editor-options="{switchedOffText: 'NO', switchedOnText: 'YES', width: '60'}"
              />
              <dx-form-item data-field="expiryDate" editor-type="dxDateBox" />
            </dx-group-item>
          </dx-form>
        </dx-accordion-item>
        <dx-accordion-item #default title="Security">
          <dx-form ref="formSecurity" :form-data="getFormData">
            <dx-group-item :col-count="2">
              <dx-form-item data-field="password" :editor-options="{mode: 'password'}" />
              <dx-form-item
                :editor-options="{text: 'User must change password at next login'}"
                data-field="mustChangePassword"
                editor-type="dxCheckBox"
              >
                <dx-label :visible="false" />
              </dx-form-item>
            </dx-group-item>
          </dx-form>
        </dx-accordion-item>
      </dx-accordion>
    </div>
  </div>
</template>

<script>
import {
  DxAccordion,
  DxItem as DxAccordionItem
} from "devextreme-vue/accordion";
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
    DxAccordion,
    DxAccordionItem,
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
  },
  methods: {
    onAccordionInitialized() {
      //console.log(e.data);
      /*for (var i = 0; i < e.accordionItems.length; i++) {
        e.component.expandItem(i);
      }*/
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