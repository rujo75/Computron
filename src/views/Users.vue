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

var editToolbarButtonRef = null;
var deleteToolbarButtonRef = null;

export default {
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
      focusedRowKey: "",
      stateStoring: {
        enabled: true,
        storageKey: "Users",
        type: "custom",
        savingTimeout: 0,
        customLoad: function() {
          //console.log("stateStoring customLoad");
          //console.log(this.stateStoring);
          var state = localStorage.getItem(this.stateStoring.storageKey);
          if (state) {
            state = JSON.parse(state);
            //console.log(state);
            let newFocusedRowKey = "";

            // make sure state has focusedRowKey property
            // eslint-disable-next-line no-prototype-builtins
            if (!state.hasOwnProperty("focusedRowKey")) {
              state.focusedRowKey = "";
            }

            // check new row key
            if (this.newUserID !== "") {
              newFocusedRowKey = this.newUserID;
            }
            let index = this._.findIndex(this.getUsers, {
              userID: newFocusedRowKey
            });

            if (index === -1) {
              // new row key not found
              // check the old key stored in the local storage
              newFocusedRowKey = state.focusedRowKey;
              index = this._.findIndex(this.getUsers, {
                userID: newFocusedRowKey
              });
              if (index === -1) {
                // old key no longer exists
                // check if we have any records
                if (this.getUsers.length > 0) {
                  // select the first row
                  newFocusedRowKey = this.getUsers[0].userID;
                }
              }
            }

            // assign new focused row key
            state.focusedRowKey = newFocusedRowKey;
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
            disabled: true,
            onInitialized: e => {
              editToolbarButtonRef = e.component;
            },
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
            disabled: true,
            onInitialized: e => {
              deleteToolbarButtonRef = e.component;
            },
            onClick: () => {
              this.$store.dispatch("deleteUser", this.focusedRowKey);
              this.focusedRowKey = "";
            }
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
  watch: {
    focusedRowKey: {
      handler(value) {
        //console.log("focusedRowKey value changed: " + value);
        if (value === "" || this.getUsers.length === 0) {
          editToolbarButtonRef.option("disabled", true);
          deleteToolbarButtonRef.option("disabled", true);
        } else {
          editToolbarButtonRef.option("disabled", false);
          deleteToolbarButtonRef.option("disabled", false);
        }
      }
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
    //console.log(newBreadcrumbPath);
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