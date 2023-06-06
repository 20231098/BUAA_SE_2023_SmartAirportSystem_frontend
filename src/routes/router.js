import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"
import FlightPage from "@/views/FlightPage.vue"
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
import CompanySelfManage from "@/views/company/companySelfManage.vue"

import TouristHome from "@/views/tourist/touristHome.vue"
import TouristSelfInformation from "@/views/tourist/touristSelfInformation.vue"
import TouristTicketManage from "@/views/tourist/touristTicketManagement.vue"
import TouristOrderManage from "@/views/tourist/touristOrderManagement.vue"
import TouristPurchaseManage from "@/views/tourist/touristPurchaseManage.vue"
import TouristSelfManage from "@/views/tourist/touristSelfManagement.vue"

import MerchantHome from "@/views/merchant/merchantHome.vue"
import MerchantGoodsManage from "@/views/merchant/merchantGoodsManage.vue"
import MerchantSelfManage from "@/views/merchant/merchantSelfManage.vue"
import MerchantOrderManage from "@/views/merchant/merchantOrderManage.vue"

import AdminHome from "@/views/admin/adminHome.vue"
import AdminSelfManage from "@/views/admin/adminSelfManage.vue"
import AdminLuggageManage from "@/views/admin/adminLuggageManage.vue"

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
    },

    {
        name: "CompanySelfManage",
        path: '/company/selfmanage',
        component: CompanySelfManage,
    },

    {
        name: "TouristHome",
        path: '/tourist',
        component: TouristHome,
    },


    {
        name: "TouristSelfInformation",
        path: '/tourist/touristSelfInformation',
        component: TouristSelfInformation,
    },

    {
        name: "TouristTicketManage",
        path: '/tourist/ticketmanage',
        component: TouristTicketManage,
    },

    {
        name: "TouristOrderManage",
        path: '/tourist/ordermanage',
        component: TouristOrderManage,
    },

    {
        name: "TouristPurchaseManage",
        path: '/tourist/purchasemanage',
        component: TouristPurchaseManage,
    },

    {
        name: "TouristSelfManage",
        path: '/tourist/selfmanage',
        component: TouristSelfManage,
    },

    {
        name: "MerchantHome",
        path: '/merchant',
        component: MerchantHome,
    },

    {
        name: "MerchantGoodsManage",
        path: '/merchant/goodsmanage',
        component: MerchantGoodsManage,
    },

    {
        name: "MerchantSelfManage",
        path: '/merchant/selfmanage',
        component: MerchantSelfManage,
    },

    {
        name: "MerchantOrderManage",
        path: '/merchant/ordermanage',
        component: MerchantOrderManage,
    },

    {
        name: "AdminHome",
        path: '/admin',
        component: AdminHome,
    },

    {
        name: "AdminSelfManage",
        path: '/admin/selfmanage',
        component: AdminSelfManage,
    },

    {
        name: "AdminLuggageManage",
        path: '/admin/luggagemanage',
        component: AdminLuggageManage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;