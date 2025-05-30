import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n.js';
import './assets/main.css';
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'


createApp(App).use(i18n).use(Vue3VideoPlayer, {
    lang: "en"
}).mount('#app');