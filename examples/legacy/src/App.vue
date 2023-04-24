<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  async mounted() {
    await this.$intercom.boot({
      app_id: process.env.VUE_INTERCOM_TOKEN,
      hide_default_launcher: true,
      custom_launcher_selector: '#launch_intercom',
      created_at: Date.now(),
      user_id: `${Date.now() * 100}`,
      name: `John Doe`,
      email: 'john@example.com',
    });

    this.$intercom.show();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
