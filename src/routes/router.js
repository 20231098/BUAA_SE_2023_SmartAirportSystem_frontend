import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"

// import FlightPage from "@/views/FlightPage.vue"
import BuyTicketPage from "@/views/BuyTicketPage.vue"
import CompanyPage from "@/views/company/CompanyPage.vue"
import CompanyCheckFlight from "@/views/company/CompanyCheckFlight.vue"
import CompanyAddFlight from "@/views/company/companyAddFlight.vue"
import CompanyChangeFlight from "@/views/company/companyChangeFlight.vue"
import CompanyDeleteFlight from "@/views/company/companyDeleteFlight.vue"
import CompanyCheckTicket from "@/views/company/companyCheckTicket.vue"
import CompanyAddTicket from "@/views/company/companyAddTicket.vue"
import CompanyChangeTicket from "@/views/company/companyChangeTicket.vue"
import CompanyDeleteTicket from "@/views/company/companyDeleteTicket.vue"

import ParkPage from "@/views/ParkPage.vue"
import PayPage from "@/views/PayPage.vue"
import CustomerService from "@/views/CustomerService.vue"
import FAQ from "@/views/FAQ.vue"
import PriceAlert from '@/views/PriceAlert.vue';
import TicketStandby from '@/views/TicketStandby.vue';
import RepairPage from "@/views/RepairPage.vue"



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
        name: "ParkPage",
        path:'/park',
        component: ParkPage
    },

    {
        name: "PayPage",
        path:'/pay/:amount/:method',
        component: PayPage
    },

    {
        name: "CustomerService",
        path:'/customerService',
        component: CustomerService
    },

    {
        name: "FAQ",
        path:'/faq',
        component: FAQ
    },

    {
        name: "PriceAlert",
        path:'/priceAlert',
        component: PriceAlert
    },

    {
        name: "TicketStandby",
        path:'/standby',
        component: TicketStandby,
    },

    {
        name: "RepairPage",
        path:'/repair',
        component: RepairPage
    },

    // {
    //     name: "FlightPage",
    //     path: '/flight',
    //     component: FlightPage
    // },

    {
        name: "BuyTicketPage",
        path: '/buyTicket',
        component: BuyTicketPage
    },
    {
        name: "CompanyCheckFlight",
        path: '/company/checkflight',
        component: CompanyCheckFlight
    },
    
    {
        name: "CompanyAddFlight",
        path: '/company/addflight',
        component: CompanyAddFlight
    },

    {
        name: "CompanyChangeFlight",
        path: '/company/changeflight',
        component: CompanyChangeFlight
    },
    
    {
        name: "CompanyDeleteFlight",
        path: '/company/deleteflight',
        component: CompanyDeleteFlight
    },

    {
        name: "CompanyAddTicket",
        path: '/company/addticket',
        component: CompanyAddTicket
    },

    {
        name: "CompanyCheckTicket",
        path: '/company/checkticket',
        component: CompanyCheckTicket
    },

    {
        name: "CompanyChangeTicket",
        path: '/company/changeticket',
        component: CompanyChangeTicket
    },

    {
        name: "CompanyDeleteTicket",
        path: '/company/deleteticket',
        component: CompanyDeleteTicket
    },

    {
        name: "CompanyPage",
        path: '/company',
        component: CompanyPage,
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;