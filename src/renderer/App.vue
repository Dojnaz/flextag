<template>
  <div id="app">
    <div class="left">
      <FolderItem
        class="folderItem"
        :customIcon="faHome"
        :path="homePath"
      />
      <DriveItem v-for="drive in drives" :key="drive" :path="drive"></DriveItem>
    </div>
    <div class="right">
      <Welcome v-if="$store.state.selected == ''"></Welcome>
      <Explorer
        v-if="$store.state.selected != ''"
        :path="$store.state.selected"
      ></Explorer>
    </div>
  </div>
</template>

<script>
import { faHome } from "@fortawesome/free-solid-svg-icons";
import FolderItem from "./components/FolderItem";
import DriveItem from "./components/DriveItem";
import Explorer from "./Views/Explorer";
import Welcome from "./Views/Welcome";

export default {
  name: "metadata-editor",
  asyncComputed: {
    async drives() {
      return window.MetaAPI.drives();
    },
  },
  computed: {
    homePath() {
      return MetaAPI.homeDir();
    },
    faHome() {
      return faHome;
    }
  },
  components: {
    FolderItem,
    DriveItem,
    Explorer,
    Welcome,
  },
};
</script>

<style>
.folderItem {
  margin-left: 5px;
}

#app {
  display: grid;
  grid-template-columns: 300px auto;
  min-height: 100vh;
}
.left {
  width: 100%;
  max-height: 100vh;
  overflow: auto;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.right {
}
</style>
