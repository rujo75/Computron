<template>
  <div>
    <dx-popup
      ref="popupSignIn"
      :visible="currentUser === null"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-title="true"
      :show-close-button="false"
      :shading-color="backgroundColour"
      :width="400"
      :height="220"
      class="popup"
      title="Computron Financial"
      @shown="popupFormShown"
      @hiding="popupFormHiding"
    >
      <form>
        <dx-form ref="formSignIn" :form-data="formData" validation-group="signInData">
          <dx-form-item
            data-field="username"
            :validation-rules="validationRules.username"
            :editor-options="usernameOptions"
          >
            <dx-label text="Email" />
          </dx-form-item>
          <dx-form-item
            data-field="password"
            :validation-rules="validationRules.password"
            :editor-options="passwordOptions"
          />
          <dx-button-item :button-options="signInButtonOptions" horizontal-alignment="right" />
        </dx-form>
      </form>
      <dx-load-panel
        :visible.sync="signInLoading"
        :show-indicator="true"
        :show-pane="true"
        :shading="false"
        :close-on-outside-click="false"
      />
    </dx-popup>
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import {
  DxForm,
  DxItem as DxFormItem,
  DxLabel,
  DxButtonItem
} from "devextreme-vue/form";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import { mapGetters } from "vuex";
import { store } from "../../store/store";

export default {
  name: "signIn",
  components: {
    DxPopup,
    DxForm,
    DxFormItem,
    DxLabel,
    DxButtonItem,
    DxLoadPanel
  },
  data() {
    return {
      backgroundColour: "rgb(42,42,42)",
      formData: { username: "", password: "" },
      validationRules: {
        username: [{ type: "required", message: "Email is required!" }],
        password: [{ type: "required", message: "Password is required!" }]
      },
      usernameOptions: {
        onEnterKey: this.onUsernameEnterKey.bind(this)
      },
      passwordOptions: {
        mode: "password",
        onEnterKey: this.onPasswordEnterKey.bind(this)
      },
      signInButtonOptions: {
        text: "Sign In",
        type: "success",
        focusStateEnabled: false,
        width: 100,
        onClick: this.onSignInClick.bind(this)
      }
    };
  },
  computed: {
    ...mapGetters(["currentUser", "signInLoading"])
  },
  methods: {
    popupFormShown() {
      this.$refs["formSignIn"].instance.getEditor("username").focus();
    },
    popupFormHiding() {
      this.$refs["formSignIn"].instance.resetValues();
    },
    onUsernameEnterKey() {
      //console.log("onUsernameEnterKey");
      this.signIn();
    },
    onPasswordEnterKey() {
      //console.log("onPasswordEnterKey");
      this.signIn();
    },
    onSignInClick() {
      this.signIn();
    },
    signIn() {
      console.log("signIn");
      var result = this.$refs["formSignIn"].instance.validate();

      if (result.isValid) {
        // all data is valid
        const user = {
          email: this.formData.username,
          password: this.formData.password
        };
        store.dispatch("signIn", user);
      }
    }
  },
  mounted() {
    //console.log("mounted");
    this.$refs["formSignIn"].instance.getEditor("username").focus();
  }
};
</script>

<style scoped>
#small-indicator,
#medium-indicator,
#large-indicator {
  vertical-align: middle;
  margin-right: 10px;
}

#button,
#button .dx-button-content {
  padding: 0;
}

#button .button-indicator {
  height: 32px;
  width: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>