import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router'
import { loadSprite } from './utils/load-sprite'

const app = createApp(App)

loadSprite()

app.use(createPinia())
app.use(router)

app.mount('#app')
