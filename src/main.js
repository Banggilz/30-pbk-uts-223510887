import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import router from './router';
import 'quasar/src/css/index.sass';
import App from './App.vue';

const app = createApp(App);

app.use(Quasar, { /* Quasar options */ });
app.use(router);
app.use(createPinia());

app.mount('#app');
