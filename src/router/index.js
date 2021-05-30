import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: { canShowFinishButton: true },
  },
  {
    path: '/dates',
    component: () => import('../views/Dates.vue'),
    meta: { canShowFinishButton: false },
  },
  {
    path: '/history',
    component: () => import('../views/History.vue'),
    meta: { canShowFinishButton: false },
  },
  {
    path: '/service/:id',
    component: () => import('../views/ServiceDetail.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/Detail.vue'),
      },
      {
        path: 'comments',
        component: () => import('../components/Comments.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
