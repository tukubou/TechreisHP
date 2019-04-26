import 'bootstrap'
import * as $ from 'jquery';
import Vue from 'vue'
import VueX from 'vuex'
import axios from 'axios';
Vue.prototype.$http = axios;

import BootstrapVue from 'bootstrap-vue'
import VueRouter from "vue-router"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Component
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

import Home from "./components/Home.vue"
import Firefly from "./components/Firefly/Firefly.vue"
import Profile from "./components/Profile.vue"
import Hobbies from "./components/Hobbies.vue"
import Drone from "./components/Drone.vue"
import ODM from "./components/ODM.vue"
import Contact from "./components/Contact.vue"

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueX);
// 『イベントバス』のためのインスタンス
Vue.component("vue-header", Header);
Vue.component("vue-footer", Footer);

/**
 * storeオブジェクト
 * messageを保持
 * messageの値を書き換える以下の2つのメソッドも用意
 * changeMessage()
 * resetMessage()
 */
const store = new VueX.Store({
    state: {
      message: 'homeMessage',
      isShowModal :false,
      curPage: 'home'
    }
});

const router = new VueRouter({
    // mode: "history",
    routes: [
        { path: "/", component: Home },
        { path: "/home", component: Home },
        { path: "/profile", component: Profile },
        { path: "/hobbies", component: Hobbies },
        { path: "/drone", component: Drone },
        { path: "/odm", component: ODM },
        { path: "/firefly", component: Firefly },
        { path: "/contact", component: Contact },
    ]
});

new Vue({
    router,
    store,
    el: '#app'
});