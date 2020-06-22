<template>
  <dx-drawer
    class="drawer"
    :opened-state-mode="selectedOpenMode"
    :position="selectedPosition"
    :reveal-mode="selectedRevealMode"
    :opened="sideNavMenuOpenState"
    :close-on-outside-click="closeOnOutsideClick"
    template="listMenu"
    height="calc(100vh - 72px)"
  >
    <template #listMenu>
      <SideNavMenu />
    </template>
    <div id="content" class="dx-theme-background-color">
      <dx-drawer
        class="drawer"
        :opened-state-mode="selectedOpenMode"
        :position="selectedPosition2"
        :reveal-mode="selectedRevealMode"
        :opened="favouritesNavMenuOpenState"
        :close-on-outside-click="closeOnOutsideClick"
        template="listMenu"
        height="calc(100vh - 72px)"
      >
        <template #listMenu>
          <FavouritesNavMenu />
        </template>
        <CenterPanel id="content" />
      </dx-drawer>
    </div>
  </dx-drawer>
</template>

<script>
import { DxDrawer } from "devextreme-vue";
import SideNavMenu from "./SideNavMenu.vue";
import FavouritesNavMenu from "./FavouritesNavMenu.vue";
import CenterPanel from "./CenterPanel.vue";

export default {
  name: "main",
  components: {
    DxDrawer,
    SideNavMenu,
    FavouritesNavMenu,
    CenterPanel
  },
  data() {
    return {
      transitionName: "fade",
      selectedOpenMode: "shrink",
      selectedPosition: "left",
      selectedPosition2: "right",
      selectedRevealMode: "slide",
      closeOnOutsideClick: false
    };
  },
  methods: {},
  computed: {
    sideNavMenuOpenState: {
      get: function() {
        return this.$store.getters.getSideNavMenuOpenState;
      }
      //set: function() {}
    },
    favouritesNavMenuOpenState: {
      get: function() {
        return this.$store.getters.getFavouritesNavMenuOpenState;
      }
      //set: function() {}
    }
  },
  created: function() {
    //this.$router.push("/WorkQueue");
  }
};
</script>


