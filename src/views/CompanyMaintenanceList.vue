<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="gridCompanies"
      :data-source="dataSource"
      key-expr="id"
      :remote-operations="false"
      :allow-column-resizing="true"
      :column-min-width="50"
      column-resizing-mode="widget"
      :column-auto-width="true"
      :row-alternation-enabled="false"
      :hover-state-enabled="true"
      :show-borders="true"
      :focused-row-enabled="true"
      :auto-navigate-to-focused-row="true"
      :focused-row-key.sync="focusedRowKey"
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
    </dx-data-grid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxLoadPanel,
  DxGroupPanel,
  DxSearchPanel
  //DxSelection
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
    DxSearchPanel
    //DxSelection
  },
  data() {
    return {
      dataSource: [
        { id: "1", companyNo: "001", companyName: "City of Melbourne" },
        { id: "2", companyNo: "010", companyName: "Library Leaders" },
        { id: "3", companyNo: "021", companyName: "Waste Management" },
        {
          id: "4",
          companyNo: "024",
          companyName: "Health & Environment Service Managment"
        },
        { id: "5", companyNo: "032", companyName: "Parking" }
      ],
      pageSizes: [10, 15, 20, 25, 50, 100],
      focusedRowKey: null
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
    //console.log("Menu Id: " + this.id);
    // Set breadcrumb path
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
    // Focus on first row if we have any records
    if (this.dataSource.length > 0) {
      this.focusedRowKey = this.dataSource[0].id;
    }
  }
};
</script>

<style scoped>
.grid-panel {
  padding: 10px;
}
</style>