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
            validation-group="userData"
            @field-data-changed="onGeneralFieldDataChanged"
          >
            <dx-group-item :col-count="2">
              <dx-form-item data-field="userID" :editor-options="{disabled: true}">
                <dx-label text="User ID" />
              </dx-form-item>
              <dx-form-item data-field="userNo" :editor-options="{disabled: !isNewRecord}">
                <dx-label text="User No" />
                <dx-required-rule message="User No is required!" />
                <dx-pattern-rule
                  :pattern="userNoPattern"
                  message="Do not use spaces in the User No!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="User No must have maximum 20 characters!"
                />
                <!--<DxAsyncRule
                    :validation-callback="userNoValidationAsync"
                    message="User No is already used!"
                />-->
                <dx-custom-rule
                  :validation-callback="userNoValidation"
                  message="User No is already used!"
                />
              </dx-form-item>
              <dx-form-item data-field="userName">
                <dx-label text="User Name" />
                <dx-required-rule message="User Name is required!" />
                <dx-pattern-rule
                  :pattern="userNamePattern"
                  message="Do not use spaces in the User Name!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="User Name must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="userNameValidation"
                  message="User Name is already used!"
                />
              </dx-form-item>
              <dx-form-item data-field="fullName">
                <dx-label text="Full Name" />
                <dx-required-rule message="Full Name is required!" />
                <dx-string-length-rule
                  :max="255"
                  message="Full Name must have maximum 255 characters!"
                />
              </dx-form-item>
              <dx-form-item data-field="email">
                <dx-required-rule message="Email is required!" />
                <dx-email-rule message="Email is invalid!" />
                <dx-string-length-rule
                  :max="255"
                  message="Email must have maximum 255 characters!"
                />
                <dx-custom-rule
                  :validation-callback="emailValidation"
                  message="Email is already used!"
                />
              </dx-form-item>
              <!--<dx-form-item
                data-field="active"
                editor-type="dxSwitch"
                :editor-options="{switchedOffText: 'NO', switchedOnText: 'YES', width: '60'}"
              />-->
              <dx-form-item data-field="expiryDate" editor-type="dxDateBox" />
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="password" :editor-options="{mode: 'password'}">
                <dx-required-rule message="Password is required!" />
                <dx-string-length-rule
                  :max="50"
                  message="Password must have maximum 50 characters!"
                />
              </dx-form-item>
              <dx-form-item
                :editor-options="{text: 'User must change password at next login'}"
                data-field="mustChangePassword"
                editor-type="dxCheckBox"
                cssClass="change-password-checkbox"
              >
                <dx-label :visible="false" />
              </dx-form-item>
              <!--<dx-form-item data-field="mustChangePassword" editor-type="dxCheckBox">
                    <dx-label text="User must change password at next login" />
              </dx-form-item>-->
            </dx-group-item>
            <dx-group-item :col-count="2">
              <!--:editor-options="{text: 'Active'}"-->
              <!--<dx-label :visible="true" />-->
              <dx-form-item data-field="active" editor-type="dxCheckBox" />
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
  //DxAsyncRule
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
    //DxAsyncRule
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
      userNoPattern: /^[^\s]+$/,
      userNamePattern: /^[^\s]+$/
    };
  },
  computed: {
    isNewRecord() {
      if (this.id === "") {
        // new user
        return true;
      } else {
        // existing user
        return false;
      }
    }
  },
  methods: {
    loadFormData: function() {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.isNewRecord) {
        // create user
        let newUser = {
          userID: getNewId(),
          userNo: "",
          userName: "",
          fullName: "",
          email: "",
          active: true,
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
      if (this.isNewRecord) {
        // create user
        this.$store.dispatch("createUser", this.formData);
      } else {
        // update user
        this.$store.dispatch("updateUser", this.formData);
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    },
    userNoValidationAsync(params) {
      console.log("params.value: " + params.value);
      /*return new Promise((resolve, reject) => {
        if (params.value === "1") {
          resolve();
        } else {
          reject("User No is already used!");
        }
      });*/

      /*return new Promise(resolve => {
        setTimeout(function() {
          resolve(params.value === "1");
        }, 1000);
      });*/

      /*return new Promise((resolve, reject) => {
        setTimeout(function() {
          if (params.value === "1") {
            resolve();
          } else {
            reject("User No is already used!");
          }
        }, 1000);
      });*/
    },
    userNoValidation(e) {
      if (this.isNewRecord) {
        // new user
        let result = this.$store.getters.userExistsByUserNo(e.value);
        return (result = !result);
      } else {
        // existing user
        return true;
      }
    },
    userNameValidation(e) {
      if (this.isNewRecord) {
        // new user
        let result = this.$store.getters.userExistsByUserName(e.value);
        return (result = !result);
      } else {
        // existing user
        return true;
      }
    },
    emailValidation(e) {
      if (this.isNewRecord) {
        // new user
        let result = this.$store.getters.userExistsByEmail(e.value);
        return (result = !result);
      } else {
        // existing user
        return true;
      }
    },
    onGeneralFieldDataChanged() {
      //console.log(e);
      var result = this.$refs["formGeneral"].instance.validate();
      this.tabsData[0].isValid = result.isValid;
    }
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  mounted() {
    //console.log("mounted");
    if (this.isNewRecord) {
      // new user
      this.$refs["formGeneral"].instance.getEditor("userNo").focus();
    } else {
      // existing user
      this.$refs["formGeneral"].instance.getEditor("userName").focus();
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
}
</style>

<style>
.change-password-checkbox .dx-checkbox {
  padding-top: 7px;
}
</style>