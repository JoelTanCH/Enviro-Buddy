import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import firebase from "firebase/app";
import "firebase/auth";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueRouter)
Vue.config.productionTip = false

const myRouter = new VueRouter({
    routes: Routescomp,
    mode: 'history',
})

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};


myRouter.beforeEach(async(to, from, next) => {
    const noAuth = to.matched.some(record => record.meta.noAuth);
    if (!noAuth && !await firebase.getCurrentUser()) {
        alert("Please Signup or Login First")
        next({ path: '/' });
    } else {

        next();
    }

})


new Vue({
    render: h => h(App),
    router: myRouter
}).$mount('#app')