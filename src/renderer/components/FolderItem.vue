<template>
  <div>
    <p :class="$store.state.selected == $props.path ? 'selected' : ''">
      <span
        :class="$data.folders && $data.folders.length > 0 ? '' : 'hidden'"
        v-on:click="toggleOpen"
        ><font-awesome-icon v-if="!open" :icon="faPlusSquare" />
        <font-awesome-icon v-if="open" :icon="faMinusSquare"
      /></span>
      <span v-on:click="selectThis">
        <span v-if="!customIcon">
          <font-awesome-icon v-if="!open" :icon="faFolder" />
          <font-awesome-icon v-if="open" :icon="faFolderOpen" />
        </span>
        <font-awesome-icon v-if="customIcon" :icon="customIcon" />
        {{ name }}</span
      >
    </p>
    <div v-if="open" class="folderContent">
      <FolderItem
        v-for="folder in folders"
        :key="folder"
        :path="folder"
      ></FolderItem>
    </div>
  </div>
</template>

<script>
import {
  faPlusSquare,
  faMinusSquare,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "FolderItem",
  components: {},
  props: {
    customIcon: "",
    path: String,
  },
  data: () => {
    return {
      open: false,
      folders: [],
    };
  },
  methods: {
    toggleOpen() {
      if (this.$data.folders.length > 0) this.$data.open = !this.$data.open;
    },
    selectThis() {
      this.$store.commit("select", this.$props.path);
      console.log(this.$props.path);
      console.log(this.$store);
    },
  },
  computed: {
    name() {
      return window.MetaAPI.getName(this.$props.path);
    },
    faPlusSquare() {
      return faPlusSquare;
    },
    faMinusSquare() {
      return faMinusSquare;
    },
    faFolder() {
      return faFolder;
    },
    faFolderOpen() {
      return faFolderOpen;
    },
  },
  asyncComputed: {
    folders() {
      return window.MetaAPI.getFolders(this.$props.path);
    },
  },
};
</script>

<style scoped>
p {
  cursor: pointer;
  margin: 0;
  width: fit-content;
  padding-right: 10px;
}
.folderContent {
  margin: 0;
  margin-left: 10px;
}
.hidden {
  opacity: 0;
}
.selected {
  background-color: #cce8ff;
}
.fa-home {
  margin-left: 3.5px;
  margin-right: 3px;
}
</style>
