<template>
  <div class="home-panel">
    <div class="container">
      <div class="my-card">
        <div class="card-header">
          <!--<a class="waves-effect waves-dark btn-flat" style="width: 100%">CHART OF ACCOUNTS</a>-->
          <dx-button
            width="100%"
            text="CHART OF ACCOUNTS"
            type="normal"
            styling-mode="text"
            :focus-state-enabled="false"
          />
        </div>
        <div class="card-main">
          <i class="material-icons">account_tree</i>
          <div class="main-description">Manage accounts used by the organization.</div>
          <!--<a class="btn-floating waves-effect waves-light red">
            <i class="material-icons">add</i>
          </a>-->
          <dx-button icon="fas fa-star" :focus-state-enabled="false" class="button-icon" />
        </div>
      </div>
      <div class="my-card">
        <div class="card-header">
          <!--<a class="waves-effect waves-dark btn-flat" style="width: 100%">TAX RATES</a>-->
          <dx-button width="100%" text="TAX RATES" type="normal" styling-mode="text" />
        </div>
        <div class="card-main">
          <i class="material-icons">emoji_symbols</i>
          <div class="main-description">Manage tax rates used by the organisation.</div>
          <!--<a class="btn-floating waves-effect waves-light red">
            <i class="material-icons">add</i>
          </a>-->
          <dx-button icon="fas fa-star" :focus-state-enabled="false" class="button-icon" />
        </div>
      </div>
      <div class="my-card">
        <div class="card-header">
          <!--<a class="waves-effect waves-dark btn-flat" style="width: 100%">SUPPLIERS</a>-->
          <dx-button width="100%" text="SUPPLIERS" type="normal" styling-mode="text" />
        </div>
        <div class="card-main">
          <i class="material-icons">business</i>
          <div
            class="main-description"
          >Manage suppliers that supplie goods and services to the organization.</div>
          <!--<a class="btn-floating waves-effect waves-light red">
            <i class="material-icons">add</i>
          </a>-->
          <dx-button icon="fas fa-star" :focus-state-enabled="false" class="button-icon" />
        </div>
      </div>
      <div class="my-card">
        <div class="card-header">
          <!--<a class="waves-effect waves-dark btn-flat" style="width: 100%">CUSTOMERS</a>-->
          <dx-button width="100%" text="CUSTOMERS" type="normal" styling-mode="text" />
        </div>
        <div class="card-main">
          <i class="material-icons">store</i>
          <div
            class="main-description"
          >Manage customers that buy goods or services from the organisation.</div>
          <!--<a class="btn-floating waves-effect waves-light red">
            <i class="material-icons">add</i>
          </a>-->
          <dx-button icon="fas fa-star" :focus-state-enabled="false" class="button-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue";

export default {
  components: { DxButton },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.dispatch("setBreadcrumbData", [{ id: "1" }]);
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.home-panel {
  padding: 10px;
}

.container {
  margin: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
  grid-gap: 10px;
  width: 100%;
}

.my-card {
  border: 1px solid rgba(77, 77, 77); /* Set up Border */
  /*border-radius: 4px;*/ /* Slightly Curve edges */
  overflow: hidden; /* Fixes the corners */
  display: flex; /* Children use Flexbox */
  flex-direction: column; /* Rotate Axis */
}

.my-card:hover {
  box-shadow: 0 0 0 1px; /*#F05B41;*/
}

.card-header {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(77, 77, 77);
}

.card-main {
  display: grid; /* Children use Flexbox */
  padding: 15px; /* Add padding to the top/bottom/left/right */
  grid-column-gap: 15px;
  grid-template-columns: 40px auto 36px;
}

.material-icons {
  font-size: 36px;
}

.main-description {
  font-size: 14px;
}

.card-main > a {
  flex: none;
  margin-left: 15px;
}

.button-icon >>> .dx-button-content .dx-icon {
  font-size: 16px;
}
</style>
