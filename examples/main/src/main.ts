import { createApp } from 'vue'
import App from './App.vue'
import IntercomVue from 'vue-intercom';
import './assets/main.css'

const app = createApp(App);

app.use(IntercomVue);
app.mount('#app');
