//import Vue from 'vue'
//import app from '../App'
import Vuex from 'vuex'
import user from './user.js'
import merchant from './merchant.js'
import company from './company.js'
import admin from './admin.js'


/*
const data = {
    modules: {
        user,
        merchant,
        admin,
        company,
    }
}
*/
export default new Vuex.Store({
    modules: {
        user,
        merchant,
        admin,
        company,
    }
});