import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth.store';

const Login = () => import("./components/Login.vue")
const Home = () => import("./components/Home.vue")

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        // { path: '/:pathMatch(.*)*', component: NotFound },  
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/home', component: Home },
    ]
});

router.beforeEach(async (to) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
