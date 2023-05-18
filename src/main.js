import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(ElementPlus);
