<template>
  <div>
    <div class="container">
      <h2 :title="path">
        <font-awesome-icon :icon="faFolderOpen" />
        {{ name }}
      </h2>
      <p v-if="files.length == 0">
        There are no supported media files in this directory
      </p>
      <div class="fileContainer" v-if="files">
        <FileItem
          v-for="file in files"
          :key="file"
          :path="file"
          :click="select"
        />
      </div>
    </div>
    <div :style="{ height: height + 'px' }" class="metaEditor"></div>
  </div>
</template>

<script>
//import SystemInformation from '@/components/LandingPage/SystemInformation'
import FileItem from "@/components/FileItem";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "explorer",
  data() {
    return {
      files: [],
      height: 100,
    };
  },
  components: {},
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
    style() {
      return {
        height: `${this.h}px`,
      };
    },
    selected() {
      let output = {};
      this.files.forEach((file) => {
        output[file] = false;
      });
      return output;
    },
  },
  asyncComputed: {
    files() {
      return window.MetaAPI.getFiles(this.$props.path, ".mp3");
    },
  },
  watch: {
    files(files) {
      let output = {};
      files.forEach((file) => {
        output[file] = false;
      });
      return output;
    },
  },
  components: {
    FileItem,
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    select(a, b) {
      console.log(a, b);
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
.metaEditor {
  border-top: gray solid 1px;
  height: fit-content;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
