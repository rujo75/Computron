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
        @contentReady="onAccordionContentReady"
      >
        <dx-accordion-item #default title="General">
          <dx-form ref="formGeneral" :form-data="formData">
            <dx-group-item :col-count="2">
              <dx-form-item data-field="userID" :editor-options="{disabled: true}">
                <dx-label text="User ID" />
              </dx-form-item>
              <dx-form-item data-field="userName">
                <dx-label text="User Name" />
              </dx-form-item>
              <dx-form-item data-field="fullName">
                <dx-label text="Full Name" />
              </dx-form-item>
              <dx-form-item data-field="email" />
              <!--<dx-form-item
                data-field="enabled"
                editor-type="dxSwitch"
                :editor-options="{switchedOffText: 'NO', switchedOnText: 'YES', width: '60'}"
              />-->
              <dx-form-item data-field="enabled" editor-type="dxCheckBox" />
              <dx-form-item data-field="expiryDate" editor-type="dxDateBox" />
            </dx-group-item>
          </dx-form>
        </dx-accordion-item>
        <dx-accordion-item #default title="Security">
          <dx-form ref="formSecurity" :form-data="formData">
            <dx-group-item :col-count="2">
              <dx-form-item data-field="password" :editor-options="{mode: 'password'}" />
              <dx-form-item
                :editor-options="mustChangePasswordOptions"
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
import { getNewId } from "../store/common";

export default {
  props: {
    id: {
      default: "",
      type: String
    }
  },
  name: "editUser",
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
      },
      mustChangePasswordOptions: {
        text: "User must change password at next login"
      }
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getFormData"])
  },
  methods: {
    onAccordionContentReady(e) {
      // expand security item
      e.component.expandItem(1);
    },
    loadFormData: function() {
      //console.log("loadFormData");
      console.log("id: " + this.id);
      if (this.id === "") {
        // new user
        let newUser = {
          userID: getNewId(),
          userName: "",
          fullName: "",
          email: "",
          enabled: true,
          expiryDate: "",
          password: "",
          mustChangePassword: true
        };
        // use new user
        this.formData = newUser;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else {
        let index = this._.findIndex(this.getUsers, { userID: this.id });
        if (index >= 0) {
          // clone user
          this.formData = this._.cloneDeep(this.getUsers[index]);
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
      let changed = this.isFormDataChanged();
      console.log("changed: " + changed);
      if (changed) {
        this.saveFormData();
      }
      this.$router.back();
    },
    saveFormData() {
      // update store
      this.$store.dispatch("setFormData", this.formData);
      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
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