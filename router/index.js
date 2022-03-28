import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
// import Router from "vue-router";
// import Ecs from "../src/components/door.vue"

Vue.use(VueRouter)
// Vue.use(Router)
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push(to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home'),
            },
            {
                path: '/test',
                name: 'test',
                component: () => import('../views/test'),
            }
        ]
        // },
        // {
        //     path: '/jirainfo',
        //     name: 'Ecs',
        //     component: () => import('../src/components/door.vue'),
    },
    // {
    //     path: '/cse',
    //     name: 'cse',
    //     component: () => import('../src/components/cse.vue'),
    // }
]

const router = new VueRouter({
    model: 'hash',
    // base: process.env.BASE_URL,
    routes,
})
export default router