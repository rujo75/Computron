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
      :state-storing="stateStoring"
      column-resizing-mode="widget"
      width="100%"
      height="calc(100vh - 139px)"
      @toolbar-preparing="onToolbarPreparing($event);"
      @focused-row-changed="onFocusedRowChanged"
      @initialized="onGridInitialized"
    >
      <dx-export :enabled="true" :allow-export-selected-data="false" file-name="Users List" />
      <dx-column-chooser :enabled="true" />
      <dx-column
        data-field="userID"
        caption="User ID"
        data-type="string"
        :width="300"
        :visible="false"
        cell-template="UserIDTemplate"
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

      <div slot="UserIDTemplate" slot-scope="{ data: item }">
        <span
          @click.stop.prevent="onUserIDClick(item);"
          class="data-grid-hyperlink"
        >{{ item.value }}</span>
      </div>
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
        },
        {
          userID: "f274ab28-59af-45af-86f5-97a149104476",
          userName: "jsmith",
          fullName: "John Smith",
          email: "jsmith@tpg.com",
          enabled: true,
          expiryDate: "",
          password: "123456",
          mustChangePassword: false
        },
        {
          userID: "2652c185-09ab-4b8a-8518-7f184a4f2baf",
          userName: "jpike",
          fullName: "Jane Pike",
          email: "jpike@tpg.com",
          enabled: true,
          expiryDate: "",
          password: "123456",
          mustChangePassword: false
        }
      ],
      stateStoring: {
        enabled: true,
        storageKey: "storage2",
        type: "custom",
        savingTimeout: 100,
        customLoad: function() {
          //console.log(this.stateStoring);
          var state = localStorage.getItem(this.stateStoring.storageKey);
          if (state) {
            state = JSON.parse(state);
            /*for (var i = 0; i < state.columns.length; i++) {
              state.columns[i].filterValue = null;
            }*/
            //console.log(state);
            // eslint-disable-next-line no-prototype-builtins
            if (state.hasOwnProperty("focusedRowKey")) {
              //console.log(state.focusedRowKey);
              // find if record still exists in dataset
              let focusedRowKey = state.focusedRowKey;
              let record = this.dataSource.find(
                x => x.userID === focusedRowKey
              );
              if (record === undefined) {
                //console.log("record not found!");
                // record not found, set to the first record in dataset
                if (this.dataSource.length > 0) {
                  state.focusedRowKey = this.dataSource[0].userID;
                }
              }
            } else {
              //console.log("focusedRowKey does not exist");
              if (this.dataSource.length > 0) {
                //console.log("set state.focusedRowKey");
                //console.log(this.dataSource);
                state.focusedRowKey = this.dataSource[0].userID;
              }
            }
          }
          return state;
        }.bind(this),
        customSave: function(state) {
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getCurrentPath"])
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
    onGridInitialized() {
      //console.log("onGridInitialized");
      //console.log(e.component);
    },
    onRowDblClick() {
      this.$router.push("/EditUser");
    },
    onUserIDClick() {
      //alert(e.text);
      this.$router.push("/EditUser");
    }
  },
  mounted() {
    console.log("mounted");
    // Set breadcrumb path
    //console.log(this.getCurrentPath);
    /*this.id = "14.Users";
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
    this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);*/

    // Build breadcrumb path
    const menuIdPath = this.getCurrentPath.split("/");
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