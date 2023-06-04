import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"
import FlightPage from "@/views/FlightPage.vue"
import BuyTicketPage from "@/views/BuyTicketPage.vue"
import AddFlightPage from "@/views/AddFlightPage.vue"

const routes = [
    {
        name: "HomePage",
        path: '/',
        component: HomePage
    },

    {
        name: "LoginPage",
        path: '/login',
        component: LoginPage
    },

    {
        name: "RegisterPage",
        path: '/register',
        component: RegisterPage
    },

    {
        name: "UserPage",
        path: '/user',
        component: UserPage
    },

    {
        name: "FlightPage",
        path: '/flight',
        component: FlightPage
    },

    {
        name: "BuyTicketPage",
        path: '/buyTicket',
        component: BuyTicketPage
    },

    {
        name: 'AddFlightPage',
        path: '/addFlight',
        component: AddFlightPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;