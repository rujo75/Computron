<template>
  <div class="grid-panel">
    <dx-data-grid
      ref="grid"
      key-expr="userID"
      :data-source="getUsers"
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
  name: "users",
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
      stateStoring: {
        enabled: true,
        storageKey: "Users",
        type: "custom",
        savingTimeout: 10,
        customLoad: function() {
          //console.log("stateStoring customLoad");
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
              // set to new user if new user was just created
              if (this.newUserID !== "") {
                state.focusedRowKey = this.newUserID;
              }
              // find if record still exists in dataset
              //console.log("state.focusedRowKey: " + state.focusedRowKey);
              let focusedRowKey = state.focusedRowKey;
              let index = this._.findIndex(this.getUsers, {
                userID: focusedRowKey
              });
              if (index === -1) {
                //console.log("record not found!");
                // record not found, set to the first record in dataset
                if (this.getUsers.length > 0) {
                  state.focusedRowKey = this.getUsers[0].userID;
                }
              }
            } else {
              //console.log("focusedRowKey does not exist");
              if (this.getUsers.length > 0) {
                //console.log("set state.focusedRowKey");
                //console.log(this.getUsers);
                // set to new user if new user was just created
                if (this.newUserID !== "") {
                  state.focusedRowKey = this.newUserID;
                } else {
                  state.focusedRowKey = this.getUsers[0].userID;
                }
              }
            }
          }
          return state;
        }.bind(this),
        customSave: function(state) {
          //console.log("stateStoring customSave");
          localStorage.setItem(this.storageKey, JSON.stringify(state));
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getUsers", "newUserID", "getCurrentPath"])
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
            disabled: false,
            onClick: () => {
              this.$router.push("/CreateUser");
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
              this.$store.dispatch("clearNewUserID");
              this.$router.push("/EditUser/" + this.focusedRowKey);
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
      //console.log("onFocusedRowChanged");
      //console.log("onFocusedRowChanged ->  e.component.state(): ");
      //console.log(e.component.state());
      // save grid state in case it was manually set from the code
      if (e.component.state()) {
        localStorage.setItem(
          this.stateStoring.storageKey,
          JSON.stringify(e.component.state())
        );
      }
      // read back the saved data and display to console
      //var state = localStorage.getItem(this.stateStoring.storageKey);
      //console.log(state);
    },
    onGridInitialized() {
      //console.log("onGridInitialized");
      //console.log(e.component);
    },
    onRowDblClick() {
      //this.$router.push("/EditUser/" + this.focusedRowKey);
    },
    onUserIDClick() {
      //alert(e.text);
      //console.log("onUserIDClick");
      setTimeout(
        function() {
          this.$store.dispatch("clearNewUserID");
          this.$router.push("/EditUser/" + this.focusedRowKey);
        }.bind(this),
        1
      );
    }
  },
  mounted() {
    //console.log("mounted");
    // Set breadcrumb path
    //console.log(this.getCurrentPath);
    // Build breadcrumb path
    const menuIdPath = this.getCurrentPath.split("/");
    let newBreadcrumbPath = [];

    for (let i = 0; i < menuIdPath.length; i++) {
      newBreadcrumbPath.push({ id: menuIdPath[i] });
    }
    console.log(newBreadcrumbPath);
    // Save new breadcrumb data path
    this.$store.dispatch("setBreadcrumbData", newBreadcrumbPath);
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