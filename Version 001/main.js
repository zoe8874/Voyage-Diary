


import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

import router from './router'

import de from './sprachen/de.json'
import en from './sprachen/en.json'



const i18n = createI18n({
    locale: 'de', // Standard-Sprache
    messages: {
        de,
        en
    }
})



createApp(App)
    .use(i18n)
    .use(router)
    .mount('#app')

