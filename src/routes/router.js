import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"

const routes =[
    {
        path:'/login',
        component: LoginPage
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;