<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="gridCompanies"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-resizing="true"
      :column-min-width="50"
      column-resizing-mode="widget"
      :column-auto-width="true"
      :row-alternation-enabled="false"
      :hover-state-enabled="true"
      :selection="{ mode: 'single' }"
      :show-borders="true"
      width="100%"
      height="calc(100vh - 139px)"
      @toolbar-preparing="onToolbarPreparing($event);"
    >
      <dx-column data-field="companyNo" caption="Company No" data-type="string" :width="120" />
      <dx-column
        data-field="companyName"
        caption="Company Name"
        data-type="string"
        :min-width="200"
      />
      <dx-load-panel :enabled="false" />
      <dx-group-panel :visible="false" />
      <dx-search-panel :visible="true" :width="250" />
      <dx-selection mode="single" />
    </dx-data-grid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxLoadPanel,
  DxGroupPanel,
  DxSearchPanel,
  DxSelection
} from "devextreme-vue/data-grid";

export default {
  props: {
    id: String
  },
  name: "app",
  components: {
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxGroupPanel,
    DxSearchPanel,
    DxSelection
  },
  data() {
    return {
      dataSource: [
        { companyNo: "001", companyName: "City of Melbourne" },
        { companyNo: "010", companyName: "Library Leaders" },
        { companyNo: "021", companyName: "Waste Management" },
        {
          companyNo: "024",
          companyName: "Health & Environment Service Managment"
        },
        { companyNo: "032", companyName: "Parking" }
      ],
      pageSizes: [10, 15, 20, 25, 50, 100]
    };
  },
  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-plus",
            stylingMode: "text",
            text: "Create",
            focusStateEnabled: false,
            onClick: () => {
              this.$router.push("/CompanyMaintenanceForm");
            }
          }
        },
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-edit",
            stylingMode: "text",
            text: "Edit",
            focusStateEnabled: false,
            onClick: () => {
              this.$router.push("/CompanyMaintenanceForm");
            }
          }
        },
        {
          location: "before",
          widget: "dxButton",
          options: {
            icon: "fas fa-trash-alt",
            stylingMode: "text",
            text: "Delete",
            focusStateEnabled: false
            //onClick: this.refreshDataGrid.bind(this)
          }
        }
      );
    }
  },
  mounted() {
    console.log("Menu Id: " + this.id);
    const menuIdPath = this.id.split(".");
    let newBreadcrumbPath = [];
    let tempBreadcrumb = "";
    for (let i = 0; i < menuIdPath.length; i++) {
      if (i === 0) {
        tempBreadcrumb = menuIdPath[0];
      } else {
        tempBreadcrumb += "." + menuIdPath[i];
      }
      newBreadcrumbPath.push({ id: tempBreadcrumb });
    }
    // Save new breadcrumb data path
    this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);
    /* this.$store.dispatch("setBreadcrumbData", [
      { id: "2" },
      { id: "2.1" },
      { id: "2.1.1" }
    ]); */
  }
};
</script>

<style scoped>
.grid-panel {
  padding: 10px;
}
</style>