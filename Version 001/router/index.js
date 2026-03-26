import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import HomeView from '../views/homeView.vue';
import TopPostsView  from '../views/topPostsView.vue';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/',
        name: 'homeView',
        component: HomeView
    },
    {
        path: '/beitrag',
        name: 'beitrag',
        component: TopPostsView
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router