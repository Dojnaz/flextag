<template>
  <div>
    <p>
      <span v-on:click="selectThis"
        ><font-awesome-icon :icon="faFileAudio"/> {{ name }}</span
      >
    </p>
  </div>
</template>

<script>
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "FolderItem",
  components: {},
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
      if (this.$data.folders.length > 0) this.$data.open = !this.$data.open;
    },
    selectThis() {
      //this.$store.commit('select', this.$props.path)
    },
  },
  computed: {
    name() {
      return window.MetaAPI.getName(this.$props.path);
    },
    faFileAudio() {
      return faFileAudio;
    },
  },
  asyncComputed: {
    stats() {},
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
.selected {
  background-color: #cce8ff;
}
</style>
