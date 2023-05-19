import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"

const routes =[
    {
        name: "HomePage",
        path: '/',
        component: HomePage
    },

    {
        name: "LoginPage",
        path:'/login',
        component: LoginPage
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;