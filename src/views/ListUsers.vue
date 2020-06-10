<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="grid"
      key-expr="userID"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      :column-min-width="50"
      :column-auto-width="true"
      :row-alternation-enabled="false"
      :hover-state-enabled="true"
      :show-borders="true"
      :focused-row-enabled="true"
      :auto-navigate-to-focused-row="true"
      :focused-row-key.sync="focusedRowKey"
      column-resizing-mode="widget"
      width="100%"
      height="calc(100vh - 139px)"
      @toolbar-preparing="onToolbarPreparing($event);"
      @focused-row-changed="onFocusedRowChanged"
      @row-dbl-click="onRowDblClick"
    >
      <dx-state-storing
        :enabled="true"
        :saving-timeout="100"
        type="localStorage"
        storage-key="storageUsersList"
      />
      <dx-export
        :enabled="true"
        :allow-export-selected-data="false"
        file-name="User Maintenance List"
      />
      <dx-column-chooser :enabled="true" />
      <dx-column
        data-field="userID"
        caption="User ID"
        data-type="string"
        :width="300"
        :visible="false"
      />
      <dx-column data-field="userName" caption="User Name" data-type="string" :width="150" />
      <dx-column data-field="email" caption="Email" data-type="string" :width="250" />
      <dx-column data-field="fullName" caption="Full Name" data-type="string" :width="300" />
      <dx-column
        data-field="enabled"
        caption="Enabled"
        data-type="boolean"
        :width="80"
        :visible="false"
      />
      <dx-column
        data-field="expiryDate"
        caption="Expiry Date"
        data-type="date"
        :width="150"
        :visible="false"
      />
      <dx-column
        data-field="mustChangePassword"
        caption="Change Password"
        data-type="boolean"
        :width="150"
        :visible="false"
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
  DxSearchPanel,
  DxColumnChooser,
  DxStateStoring,
  DxExport
} from "devextreme-vue/data-grid";
import { mapGetters } from "vuex";

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
    DxColumnChooser,
    DxStateStoring,
    DxExport
  },
  data() {
    return {
      pageSizes: [10, 15, 20, 25, 50, 100],
      focusedRowKey: null,
      dataSource: [
        {
          userID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
          userName: "drusmir",
          fullName: "Dal Rusmir",
          email: "drusmir@tpg.com",
          enabled: true,
          expiryDate: "2020-06-30",
          password: "123456",
          mustChangePassword: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getUsers"])
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
            disabled: true,
            onClick: () => {
              this.$router.push("/EditUser");
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
              this.$router.push("/EditUser");
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
            focusStateEnabled: false,
            disabled: true
            //onClick: this.refreshDataGrid.bind(this)
          }
        }
      );
    },
    onFocusedRowChanged(e) {
      //var data = e.row && e.row.data;
      //console.log(data);
      //console.log(e.row);
      //console.log(e.row.data);
      this.$store.dispatch("setFormData", e.row.data);
    },
    onRowDblClick() {
      this.$router.push("/EditUser");
    }
  },
  mounted() {
    //console.log("mounted");
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
    if (this.dataSource.length > 0 && this.focusedRowKey === null) {
      this.focusedRowKey = this.dataSource[0].id;
    }
  },
  created() {
    //console.log("created");
  },
  destroyed() {
    //console.log("destroyed");
  }
};
</script>

<style scoped>
.grid-panel {
  padding: 10px;
}
</style>