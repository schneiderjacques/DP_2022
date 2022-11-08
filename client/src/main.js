import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'

import router from "@/router";




const app = createApp(App)
    .use(router)
app.config.globalProperties.$user = null;


app.mount('#app')


