import Vue from 'vue'
import App from './App.vue'
import VueIntercom from 'vue-intercom';

Vue.config.productionTip = false
Vue.use(VueIntercom, { appId: 'ek4vlzfz' });

const app = new Vue({
  render: h => h(App),
});

app.$mount('#app')
