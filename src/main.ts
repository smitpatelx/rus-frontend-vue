import './style/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Notifications from '@kyvg/vue3-notification';
import velocity from 'velocity-animate';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(Notifications, {
  velocity,
});

app.mount('#vueApp');
