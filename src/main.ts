import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { initStores } from './stores'

const app = createApp(App)
const namespace = 'ele'
app.use(router)
initStores(app, { namespace: namespace }).then()

app.mount('#app')
