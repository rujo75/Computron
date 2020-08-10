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
        :deferRendering="true"
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
            <dx-group-item :col-count="2" caption="Account Information">
              <dx-form-item data-field="accountID" :editor-options="{disabled: true}">
                <dx-label text="Account ID" />
              </dx-form-item>
              <dx-form-item
                data-field="accountCode"
                :editor-options="{disabled: this.currentRouteName === 'EditBankAccount'}"
              >
                <dx-label text="Account Code" />
                <dx-required-rule message="Account Code is required!" />
                <dx-pattern-rule
                  :pattern="accountCodePattern"
                  message="Do not use spaces in the Account Code!"
                />
                <dx-string-length-rule
                  :max="20"
                  message="Account Code must have maximum 20 characters!"
                />
                <dx-custom-rule
                  :validation-callback="accountCodeValidation"
                  message="Account Code is already used!"
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
            <dx-group-item :col-count="2" caption="Address">
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
  DxCustomRule,
} from "devextreme-vue/form";
import { getNewId } from "../store/common";

export default {
  props: {
    id: {
      default: "",
      type: String,
    },
  },
  name: "bankAccount",
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
    DxCustomRule,
  },
  data() {
    return {
      formData: null,
      formOriginalData: null,
      tabsData: [
        {
          title: "General",
          template: "GeneralTab",
          isValid: true,
        },
      ],
      saveNavButtonOptions: {
        icon: "fas fa-save",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Save",
        onClick: this.onSaveClick.bind(this),
      },
      cancelNavButtonOptions: {
        icon: "fas fa-ban",
        focusStateEnabled: false,
        stylingMode: "text",
        text: "Cancel",
        onClick: () => {
          this.$router.back();
        },
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
          { id: "WA", text: "Western Australia" },
        ],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true,
      },
      postcodeEditorOptions: {
        mask: "0000",
      },
      countryEditorOptions: {
        items: [{ id: "AUS", text: "Australia" }],
        displayExpr: "text",
        valueExpr: "id",
        showClearButton: true,
      },
      telephoneNoEditorOptions: {
        mask: "(00) 0000 0000",
      },
      mobileNoEditorOptions: {
        mask: "0000 000 000",
      },
      bankBranchNoEditorOptions: {
        mask: "000-000",
      },
      accountCodePattern: /^[^\s]+$/,
    };
  },
  computed: {
    currentRouteName() {
      // returns NewBankAccount or EditBankAccount or CopyBankAccount
      return this.$route.name;
    },
  },
  methods: {
    loadFormData: function () {
      //console.log("loadFormData");
      //console.log("id: " + this.id);
      if (this.currentRouteName === "CreateBankAccount") {
        // create account
        let newAccount = {
          accountID: getNewId(),
          accountCode: "",
          bankName: "",
          bankBranchNo: "",
          bankAccountNo: "",
          swiftCode: "",
          iban: "",
          addressLine1: "",
          addressLine2: "",
          contactName: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          phoneNo: "",
          faxNo: "",
          mobileNo: "",
          email: "",
          website: "",
          active: true,
        };
        // use new account
        this.formData = newAccount;
        // clone formData
        this.formOriginalData = this._.cloneDeep(this.formData);
      } else if (this.currentRouteName === "EditBankAccount") {
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
      } else {
        // copy account
        // get account by id
        let account = this.$store.getters.getBankAccountByID(this.id);
        //console.log(account);
        if (account) {
          // copy account with new id
          let newAccount = {
            accountID: getNewId(),
            accountCode: account.accountCode,
            bankName: account.bankName,
            bankBranchNo: account.bankBranchNo,
            bankAccountNo: account.bankAccountNo,
            swiftCode: account.swiftCode,
            iban: account.iban,
            addressLine1: account.addressLine1,
            addressLine2: account.addressLine2,
            contactName: account.contactName,
            city: account.city,
            state: account.state,
            postcode: account.postcode,
            country: account.country,
            phoneNo: account.phoneNo,
            faxNo: account.faxNo,
            mobileNo: account.mobileNo,
            email: account.email,
            website: account.website,
            active: true,
          };
          // use new account
          this.formData = newAccount;
          // clone formData
          this.formOriginalData = this._.cloneDeep(this.formData);
        }
      }
    },
    isFormDataChanged: function () {
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
      if (this.currentRouteName === "EditBankAccount") {
        // update account
        this.$store.dispatch("updateBankAccount", this.formData);
      } else {
        // create account
        this.$store.dispatch("createBankAccount", this.formData);
        // update bank accounts grid state to set focus row to new record
        // get grid state
        var state = localStorage.getItem("BankAccounts");
        //console.log(state);
        if (state) {
          state = JSON.parse(state);
          state.focusedRowKey = this.formData.accountID;
          // save state
          localStorage.setItem("BankAccounts", JSON.stringify(state));
        }
      }

      // update formOriginalData with formData
      this.formOriginalData = this.formData;
    },
    accountCodeValidation(e) {
      if (this.currentRouteName === "EditBankAccount") {
        // existing account
        return true;
      } else {
        // new account
        let result = this.$store.getters.bankAccountExistsByaccountCode(
          e.value
        );
        return (result = !result);
      }
    },
    onGeneralFieldDataChanged() {
      //console.log(e);
      var result = this.$refs["formGeneral"].instance.validate();
      this.tabsData[0].isValid = result.isValid;
    },
  },
  created() {
    //console.log("created");
    this.loadFormData();
  },
  mounted() {
    //console.log("mounted");
    if (this.currentRouteName === "EditBankAccount") {
      // existing account
      this.$refs["formGeneral"].instance.getEditor("bankName").focus();
    } else {
      // new account
      this.$refs["formGeneral"].instance.getEditor("accountCode").focus();
    }
  },
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