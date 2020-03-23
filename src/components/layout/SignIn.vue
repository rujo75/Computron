<template>
  <dx-popup
    ref="popupSignIn"
    :visible="getSignInVisible"
    :drag-enabled="false"
    :close-on-outside-click="false"
    :show-title="true"
    :show-close-button="false"
    :shading-color="backgroundColour"
    :width="400"
    :height="250"
    class="popup"
    title="Sign In"
    @shown="popupFormShown"
    @hiding="popupFormHiding"
  >
    <p>
      <dx-form ref="formSignIn" :form-data="formData">
        <dx-form-item data-field="username" :validation-rules="validationRules.username" />
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
  </dx-popup>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxItem as DxFormItem } from "devextreme-vue/form";
import { DxButton } from "devextreme-vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    DxButton,
    DxPopup,
    DxForm,
    DxFormItem
  },
  data() {
    return {
      popupVisible: false,
      backgroundColour: "rgb(42,42,42)",
      formData: { username: "", password: "" },
      validationRules: {
        username: [{ type: "required", message: "Username is required." }],
        password: [{ type: "required", message: "Password is required." }]
      },
      passwordOptions: { mode: "password" }
    };
  },
  computed: {
    ...mapGetters(["getSignInVisible"])
  },
  methods: {
    popupFormShown() {
      this.$refs["formSignIn"].instance.getEditor("username").focus();
    },
    popupFormHiding() {
      this.$refs["formSignIn"].instance.resetValues();
    },
    signIn() {
      this.hidePoupForm();
    },
    hidePoupForm() {
      this.$store.dispatch("setSingInVisible", false);
    }
  }
};
</script>