import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import './assets/css/all.min.css';
import './assets/css/style.css';
import './assets/js/uikit.min.js';

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.mount('#app');
