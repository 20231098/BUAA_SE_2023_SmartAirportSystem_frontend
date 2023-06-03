import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'



const app = createApp(App)
app.use(router)
/* 将 axios 挂载到全局，今后，每个组件中，
都可以直接通过this.$http 代替 axios 发起 Ajax 请求 */
app.config.globalProperties.$http = axios
/* 配置请求的根路径 */
axios.defaults.baseURL='http://10.192.70.72:8080'

app.mount('#app')
app.use(ElementPlus)
