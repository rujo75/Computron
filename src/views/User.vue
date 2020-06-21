<template>
  <div>
    <dx-toolbar class="dx-theme-border-color">
      <dx-item :options="saveNavButtonOptions" location="before" widget="dxButton" />
      <dx-item :options="cancelNavButtonOptions" location="before" widget="dxButton" />
    </dx-toolbar>
    <div class="widget-container">
      <form>
        <dx-accordion
          :multiple="true"
          :collapsible="true"
          class="accordion"
          @contentReady="onAccordionContentReady"
        >
          <dx-accordion-item #default title="General">
            <dx-form ref="formGeneral" :form-data="formData" validation-group="userData">
              <dx-group-item :col-count="2">
                <dx-form-item data-field="userID" :editor-options="{disabled: true}">
                  <dx-label text="User ID" />
                </dx-form-item>
                <dx-form-item data-field="userName">
                  <dx-label text="User Name" />
                  <dx-required-rule message="User Name is required!" />
                  <dx-pattern-rule
                    :pattern="userNamePattern"
                    message="Do not use spaces in the User Name!"
                  />
                </dx-form-item>
                <dx-form-item data-field="fullName">
                  <dx-label text="Full Name" />
                  <dx-required-rule message="Full Name is required!" />
                </dx-form-item>
                <dx-form-item data-field="email">
                  <dx-email-rule message="Email is invalid!" />
                </dx-form-item>
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
                <dx-form-item data-field="password" :editor-options="{mode: 'password'}">
                  <dx-required-rule message="Password is required!" />
                </dx-form-item>
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
      </form>
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
  DxLabel,
  DxRequiredRule,
  DxPatternRule,
  DxEmailRule
} from "devextreme-vue/form";
import { getNewId } from "../store/common";

export default {
  props: {
    id: {
      default: "",
      type: String
    }
  },
  name: "user",
  components: {
    DxAccordion,
    DxAccordionItem,
    DxToolbar,
    DxItem,
    DxForm,
    DxFormItem,
    DxGroupItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxEmailRule
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
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true
      },
      validationRules: {
        userName: [{ type: "pattern", pattern: "[^s]+" }]
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
      },
      userNamePattern: /^[^\s]+$/
    };
  },
  computed: {},
  methods: {
    onAccordionContentReady(e) {
      // expand security item
      e.component.expandItem(1);
    },
    loadFormData: function() {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.id === "") {
        // create user
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
        // edit user
        // get user by id
        let user = this.$store.getters.getUserByID(this.id);
        //console.log(user);
        if (user) {
          // clone user
          this.formData = this._.cloneDeep(user);
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
      var resultSecurity = this.$refs["formSecurity"].instance.validate();

      if (resultGeneral.isValid && resultSecurity.isValid) {
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
      if (this.id === "") {
        // create user
        this.$store.dispatch("createUser", this.formData);
      } else {
        // update user
        this.$store.dispatch("updateUser", this.formData);
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  mounted() {
    //console.log("mounted");
    this.$refs["formGeneral"].instance.getEditor("userName").focus();
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