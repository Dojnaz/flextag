<template>
  <div class="container">
    <h2 :title="path"><font-awesome-icon :icon="faFolderOpen" /> {{ name }}</h2>
    <p v-if="files.length == 0">
      There are no supported media files in this directory
    </p>
    <div class="fileContainer">
      <FileItem v-for="file in files" :key="file" :path="file" />
    </div>
  </div>
</template>

<script>
//import SystemInformation from '@/components/LandingPage/SystemInformation'
import FileItem from "@/components/FileItem";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "explorer",
  props: {
    path: String,
  },
  computed: {
    name() {
      console.log("getName", this.$props.path);
      return window.MetaAPI.getName(this.$props.path);
    },
    faFolderOpen() {
      return faFolderOpen;
    },
  },
  asyncComputed: {
    files() {
      return window.MetaAPI.getFiles(this.$props.path, ".mp3");
    },
  },
  components: {
    FileItem,
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: 10px;
}
h2 {
  margin-top: 10px;
  margin-left: 5px;
}
</style>
