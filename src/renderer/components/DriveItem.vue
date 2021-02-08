<template>
  <div class="drive">
    <p :class="$store.state.selected == $props.path ? 'selected' : ''">
      <span
        :class="$data.folders && $data.folders.length > 0 ? '' : 'hidden'"
        v-on:click="toggleOpen"
        ><font-awesome-icon
          v-if="!open"
          :icon="faPlusSquare" /><font-awesome-icon
          v-if="open"
          :icon="faMinusSquare" /></span
      ><span v-on:click="selectThis"
        ><font-awesome-icon :icon="faHdd" /> {{ path }}</span
      >
    </p>
    <div v-if="open" class="driveContent">
      <FolderItem
        v-for="folder in folders"
        :key="folder"
        :path="folder"
      ></FolderItem>
    </div>
  </div>
</template>

<script>
import FolderItem from "./FolderItem";
import { faPlusSquare, faMinusSquare, faHdd } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "DriveItem",
  components: {
    FolderItem,
  },
  props: {
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
      this.$data.open = !this.$data.open;
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
    faHdd() {
      return faHdd
    },
    faPlusSquare() {
      return faPlusSquare
    },
    faMinusSquare() {
      return faMinusSquare
    }
  },
  asyncComputed: {
    folders() {
      return window.MetaAPI.getFolders(this.$props.path);
    },
  },
};
</script>

<style scoped>
svg {
  margin-left: 5px;
  margin-right: 2px;
}
p {
  margin: 0;
  cursor: pointer;
  width: fit-content;
}
.driveContent {
  margin: 0;
  margin-left: 10px;
}
.drive {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.selected {
  background-color: #cce8ff;
}
</style>
