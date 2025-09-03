import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { addSettingRoute } from '@/router/index';

import 'amfe-flexible';
import '@/utils/rem.js';

import '@/assets/base.scss';

import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

addSettingRoute();

app.use(createPinia());
app.use(router);

app.mount('#app');
