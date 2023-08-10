import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/fileup.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/imgtest',
      name: 'imgtest',
      component: () => import('../views/ImgTest.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/dashboard/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/dashboard/Register.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/dashboard.vue'),
      meta: { requiresAuth: true }, // 设置需要登录验证
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/404.vue'),
    }
  ],
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // 假设你在登录成功后将token保存在LocalStorage
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (isAuthenticated) {
      // next();
      fetch("http://localhost:3199/auth/verify-token", {
        method: 'GET',
        headers: {
          Authorization: isAuthenticated,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            next();
          } else {
            localStorage.removeItem('token');
            next('/login');
          }
        })
        .catch((error) => {
          localStorage.removeItem('token');
          next('/login');
          console.error(error);
        });
    } else {
      next('/login');
    }
  } else {
    // 不需要登录验证的页面，放行
    next();
  }
});

// 添加自动跳转逻辑
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.name === 'login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
