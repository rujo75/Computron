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
      :height="250"
      class="popup"
      title="Computron Financial"
      @shown="popupFormShown"
      @hiding="popupFormHiding"
    >
      <p>
        <dx-form ref="formSignIn" :form-data="formData">
          <dx-form-item data-field="username" :validation-rules="validationRules.username">
            <dx-label text="Email" />
          </dx-form-item>
          <dx-form-item
            data-field="password"
            :validation-rules="validationRules.password"
            :editor-options="passwordOptions"
          />
        </dx-form>
      </p>
      <div align="right">
        <dx-button
          text="Sign In"
          type="success"
          :use-submit-behavior="true"
          :width="100"
          @click="signIn"
        />
      </div>
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
import { DxForm, DxItem as DxFormItem, DxLabel } from "devextreme-vue/form";
import { DxButton } from "devextreme-vue";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import { mapGetters } from "vuex";
import { store } from "../../store/store";

export default {
  name: "app",
  components: {
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem,
    DxLabel,
    DxLoadPanel
  },
  data() {
    return {
      backgroundColour: "rgb(42,42,42)",
      formData: { username: "", password: "" },
      validationRules: {
        username: [{ type: "required", message: "Username is required." }],
        password: [{ type: "required", message: "Password is required." }]
      },
      passwordOptions: {
        mode: "password",
        onEnterKey: this.onPasswordEnterKey.bind(this)
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
    onPasswordEnterKey() {
      console.log("onPasswordEnterKey");
      this.signIn();
    },
    signIn() {
      const user = {
        email: this.formData.username,
        password: this.formData.password
      };
      store.dispatch("signIn", user);
    }
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