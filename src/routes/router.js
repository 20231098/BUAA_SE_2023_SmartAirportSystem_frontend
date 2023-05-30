import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"
import FlightPage from "@/views/FlightPage.vue"
import TicketListPage from "@/views/TicketListPage.vue"

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

    {
        name: "RegisterPage",
        path:'/register',
        component: RegisterPage
    },

    {
        name: "UserPage",
        path:'/user',
        component: UserPage
    },

    {
        name: "FlightPage",
        path:'/flight',
        component: FlightPage
    },

    {
        name: "TicketListPage",
        path:'/ticketList',
        component: TicketListPage
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;