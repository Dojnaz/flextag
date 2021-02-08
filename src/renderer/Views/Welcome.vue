<template>
  <div class="container">
    <h1>Welcome to Dojnaz Metadata Editor!</h1>
    <p>Select a folder on the left to get started</p>
  </div>
</template>

<script>
  //import SystemInformation from '@/components/LandingPage/SystemInformation'

  export default {
    name: 'welcome',
    components: {},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
.container {
  margin-left: 10px;
}
</style>
