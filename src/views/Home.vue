<template>
  <div class="home-panel">
    <div class="container">
      <div class="my-card dx-theme-border-color">
        <div class="card-header dx-theme-border-color">
          <dx-button
            width="100%"
            text="Chart of Accounts"
            type="normal"
            styling-mode="text"
            class="card-header-text"
            :focus-state-enabled="false"
          />
        </div>
        <div class="card-main">
          <i class="material-icons">account_tree</i>
          <div class="main-description">Manage accounts used by the organization.</div>
          <dx-button
            icon="fas fa-star"
            :focus-state-enabled="false"
            styling-mode="text"
            hint="Add to favourites"
          />
        </div>
      </div>
      <div class="my-card dx-theme-border-color">
        <div class="card-header dx-theme-border-color">
          <dx-button
            width="100%"
            text="Tax Rates"
            type="normal"
            styling-mode="text"
            class="card-header-text"
            :focus-state-enabled="false"
          />
        </div>
        <div class="card-main">
          <i class="fas fa-percentage"></i>
          <div class="main-description">Manage tax rates used by the organisation.</div>
          <dx-button
            icon="fas fa-star"
            :focus-state-enabled="false"
            styling-mode="text"
            hint="Add to favourites"
          />
        </div>
      </div>
      <div class="my-card dx-theme-border-color">
        <div class="card-header dx-theme-border-color">
          <dx-button
            width="100%"
            text="Suppliers"
            type="normal"
            styling-mode="text"
            class="card-header-text"
            :focus-state-enabled="false"
          />
        </div>
        <div class="card-main">
          <i class="material-icons">business</i>
          <div
            class="main-description"
          >Manage suppliers that supplie goods and services to the organization.</div>
          <dx-button
            icon="fas fa-star"
            :focus-state-enabled="false"
            styling-mode="text"
            hint="Add to favourites"
          />
        </div>
      </div>
      <div class="my-card dx-theme-border-color">
        <div class="card-header dx-theme-border-color">
          <dx-button
            width="100%"
            text="Customers"
            type="normal"
            styling-mode="text"
            class="card-header-text"
            :focus-state-enabled="false"
          />
        </div>
        <div class="card-main">
          <i class="material-icons">store</i>
          <div
            class="main-description"
          >Manage customers that buy goods or services from the organisation.</div>
          <dx-button
            icon="fas fa-star"
            :focus-state-enabled="false"
            styling-mode="text"
            hint="Add to favourites"
          />
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
  border: 1px solid; /* Set up Border */
  /*border-radius: 4px;*/ /* Slightly Curve edges */
  overflow: hidden; /* Fixes the corners */
  display: flex; /* Children use Flexbox */
  flex-direction: column; /* Rotate Axis */
}

.my-card:hover {
  box-shadow: 0 0 0 1px;
}

.card-header {
  border-bottom: 1px solid;
}

.card-header-text {
  /*font-weight: bold;*/
  font-size: 16px;
}

.card-main {
  display: grid; /* Children use Flexbox */
  padding: 15px; /* Add padding to the top/bottom/left/right */
  grid-column-gap: 15px;
  grid-template-columns: 40px auto 36px;
}

.material-icons,
.fas {
  font-size: 36px;
}

.main-description {
  font-size: 14px;
}
</style>
