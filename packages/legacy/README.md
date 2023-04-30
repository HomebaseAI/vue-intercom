## vue2-intercom

```sh
npm install @homebaseai/vue2-intercom
```

### Usage

```ts
import Vue from 'vue';
import VueIntercom from '@homebaseai/vue2-intercom';

Vue.use(VueIntercom);
```

```ts
new Vue({
  el: '#app',
  data() {
    return {
      userId: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };
  },
  mounted() {
    this.$intercom.boot({
      app_id: import.meta.env.VUE_APP_INTERCOM_TOKEN,
      user_id: this.userId,
      name: this.name,
      email: this.email,
    });
    this.$intercom.show();
  },
});
```
