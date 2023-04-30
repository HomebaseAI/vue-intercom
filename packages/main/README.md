## vue3-intercom

```sh
npm i @homebaseai/vue3-intercom
```

### Usage

Apply the plugin via [`app.use`](https://vuejs.org/api/application.html#app-use).

```ts
import { createApp } from 'vue'
import VueIntercom from '@homebaseai/vue3-intercom';
import App from '@/App.vue';

const app = createApp(App);
app.use(VueIntercom);
app.mount('#app');
```

#### Composition API

```vue
<script setup lang="ts">
import { useIntercom } from '@homebaseai/vue3-intercom';

const intercom = useIntercom();

// init intercom
intercom.boot({
  app_id: import.meta.env.VITE_APP_INTERCOM_TOKEN,
  user_id: 1,
  name: 'John Doe',
  email: 'john@exampl.com',
});

// display it
intercom.show();
</script>
```

#### Options API

```vue
<script lang="ts">
import { useIntercom } from '@homebaseai/vue3-intercom';

export default {
  setup() {
    return {
      intercom: useIntercom(),
    }
  },
  data() {
    return {
      userId: 1,
      name: 'John Doe',
      email: 'john@example.com',
    }
  },
  mounted() {
    // init intercom
    intercom.boot({
      app_id: import.meta.env.VITE_APP_INTERCOM_TOKEN,
      user_id: this.userId,
      name: this.name,
      email: this.email,
    });

    // display it
    intercom.show();
  }
}
```