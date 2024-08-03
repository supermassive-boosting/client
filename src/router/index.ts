import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Hww from '../views/HWW.vue';
import Login from '../views/Login.vue';

const router = createRouter({
  linkActiveClass: 'uk-active',
  linkExactActiveClass: 'uk-active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hww',
      name: 'HWW',
      component: Hww,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

export default router;
