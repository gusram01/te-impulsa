import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/dates',
    component: () => import('../views/Dates.vue'),
  },
  {
    path: '/service/:id',
    component: () => import('../views/ServiceDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
