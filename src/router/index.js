import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import Products from "../views/Products/Products.vue";
import store from "../store/index.js";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/app/dashboard' // or '/login' depending on your auth flow
        },
        {
            path: '/app',
            name: 'app',
            component: AppLayout,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    redirect: '/app/dashboard'
                },
                {
                    path: 'dashboard',
                    name: 'app.dashboard',
                    component: Dashboard
                },
                {
                    path: 'products',
                    name: 'app.products',
                    component: Products
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requiresGuest: true
            },
            component: Login,
            meta: {
                requiresGuest: true // Add this if you want to prevent authenticated users from accessing login
            }
        },
        {
            path: '/request-password',
            name: 'requestPassword',
            meta: {
                requiresGuest: true
            },
            component: RequestPassword
        },
        {
            path: '/reset-password/:token?', // Optional token parameter
            name: 'resetPassword',
            meta: {
                requiresGuest: true
            },
            component: ResetPassword
        },
        // Catch-all 404 route
        {
            path: '/:pathMatch(.*)',
            name: 'notfound',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'login' });
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({ name: 'app.dashboard' }); // Redirect authenticated users away from login
    } else {
        next();
    }
});

export default router;