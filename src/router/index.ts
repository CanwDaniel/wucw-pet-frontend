import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/utils/auth';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AboutView from '../views/AboutView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import { getUserInfo } from '@/utils/auth';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { requiresAuth: false },
    },
  ],
});

export const addSettingRoute = () => {
  const existed = getUserInfo()?.userid || null;
  if (existed) {
    const { roles } = getUserInfo();
    if (roles.includes('管理员')) {
      router.addRoute({
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: { requiresAuth: true },
      });
    }
  }
};

// 路由守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false;

  if (requiresAuth && !isLoggedIn()) {
    // 需要登录但未登录，跳转到登录页
    next('/login');
  } else if (to.path === '/login' && isLoggedIn()) {
    // 已登录用户访问登录页，跳转到首页
    next('/');
  } else {
    next();
  }
});

export default router;
