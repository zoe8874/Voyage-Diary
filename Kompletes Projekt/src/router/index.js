import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import HomeView from '../views/homeView.vue';
import TopPostsView  from '../views/topPostsView.vue';
import AddPostView from '@/views/addPostView.vue';
import ProfileView from "@/views/profileView.vue";
import browseView from "@/views/browseView.vue";
import RegistrationView from "@/views/registrationView.vue";
import editProfileView from "@/views/editProfileView.vue";


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
    },
    {
        path: '/topPosts',
        name: 'topPosts',
        component: TopPostsView
    },
    {
        path: '/browse',
        name: 'browse',
        component: browseView
    },
    {
        path: '/addPost',
        name: 'addPost',
        component: AddPostView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView
    },
    {
        path: '/editProfile',
        name: 'editProfile',
        component: editProfileView
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router