import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import commonModule from "./modules/common"
import pageModule from "./modules/page"
import AdminModule from "./modules/Admin"

import getters from "./getter"


const store = new Vuex.Store({
    state: {},
    modules:{
        commonModule,
        pageModule,
        AdminModule
    },
    getters
})

export default store
