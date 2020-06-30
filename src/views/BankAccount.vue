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
            validation-group="bankAccountData1"
            @field-data-changed="onGeneralFieldDataChanged"
          >
            <dx-group-item :col-count="2">
              <dx-form-item data-field="accountID" :editor-options="{disabled: true}">
                <dx-label text="Account ID" />
              </dx-form-item>
              <dx-form-item data-field="accountNo" :editor-options="{disabled: !isNewRecord}">
                <dx-label text="Account No" />
                <dx-required-rule message="Account No is required!" />
                <dx-pattern-rule
                  :pattern="accountNoPattern"
                  message="Do not use spaces in the Account No!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="Account No must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="accountNoValidation"
                  message="Account No is already used!"
                />
              </dx-form-item>
            </dx-group-item>
            <dx-group-item :col-count="2">
              <dx-form-item data-field="bankName">
                <dx-label text="Bank Name" />
                <dx-required-rule message="Bank Name is required!" />
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
            <dx-group-item :col-count="2">
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
            validation-group="bankAccountData2"
            @field-data-changed="onCommunicationFieldDataChanged"
          >
            <dx-group-item :col-count="2">
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
  //DxEmailRule,
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
    //DxEmailRule,
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
      bankBranchNoEditorOptions: {
        mask: "000-000"
      },
      accountNoPattern: /^[^\s]+$/
    };
  },
  computed: {
    isNewRecord() {
      if (this.id === "") {
        // new account
        return true;
      } else {
        // existing account
        return false;
      }
    }
  },
  methods: {
    loadFormData: function() {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.isNewRecord) {
        // create account
        let newAccount = {
          accountID: getNewId(),
          accountNo: "",
          bankName: "",
          bankBranchNo: "",
          bankAccountNo: "",
          swiftCode: "",
          iban: "",
          active: true
        };
        // use new account
        this.formData = newAccount;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else {
        // edit account
        // get account by id
        let account = this.$store.getters.getBankAccountByID(this.id);
        //console.log(account);
        if (account) {
          // clone account
          this.formData = this._.cloneDeep(account);
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
      var resultCommunication = this.$refs[
        "formCommunication"
      ].instance.validate();

      // update accordionItems
      this.tabsData[0].isValid = resultGeneral.isValid;
      this.tabsData[1].isValid = resultCommunication.isValid;

      if (resultGeneral.isValid && resultCommunication.isValid) {
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
        // create account
        this.$store.dispatch("createBankAccount", this.formData);
      } else {
        // update account
        this.$store.dispatch("updateBankAccount", this.formData);
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    },
    accountNoValidation(e) {
      if (this.isNewRecord) {
        // new account
        let result = this.$store.getters.bankAccountExistsByAccountNo(e.value);
        return (result = !result);
      } else {
        // existing account
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
      // new account
      this.$refs["formGeneral"].instance.getEditor("accountNo").focus();
    } else {
      // existing account
      this.$refs["formGeneral"].instance.getEditor("bankName").focus();
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