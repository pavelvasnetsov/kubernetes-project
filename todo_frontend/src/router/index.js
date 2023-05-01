import Authorization from '@/pages/Authorization.vue';
import Registration from '@/pages/Registration.vue';
import Todos from '@/pages/Todos.vue';
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/auth',
        component: Authorization
    },
    {
        path: '/registration',
        component: Registration
    },
    {
        path: '/todos',
        component: Todos
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/auth'
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
});

export default router;