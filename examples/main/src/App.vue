<script setup lang="ts">
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useIntercom } from 'vue-intercom';

const intercom = useIntercom();

onMounted(async () => {
  await intercom.boot({
    app_id: import.meta.env.VITE_INTERCOM_TOKEN,
    hide_default_launcher: true,
    custom_launcher_selector: '#launch_intercom',
    created_at: Date.now(),
    user_id: `${Date.now() * 100}`,
    name: `Dylan Hackworth`,
    email: 'dylan.hackworth@homebase.ai',
  });
  intercom.show();
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
