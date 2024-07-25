import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import Landing from '../views/Landing.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import TesterDashboard from '../views/TesterDashboard.vue'
import DevDashboard from '../views/DevDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/:cathAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/TesterDashboard/:username',
    name: 'TesterDashboard',
    component: TesterDashboard
  },
  {
    path: '/DevDashboard/:username',
    name: 'DevDashboard',
    component: DevDashboard
  },
  {
    path: '/AdminDashboard/:username',
    name: 'AdminDashboard',
    component: AdminDashboard
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
