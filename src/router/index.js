import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/fileup.vue';
import http from '@/http';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '盘络上传扩展',
        favicon: 'https://cdn-us.imgs.moe/2023/06/03/647a8b4c4d502.ico' // 设置页面 Favicon
      }
    },
    {
      path: '/imgtest',
      name: 'imgtest',
      component: () => import('../views/ImgTest.vue'),
      meta: {
        title: '图床对比-2023年图床大比拼',
        favicon: 'https://cdn-us.imgs.moe/2023/07/24/64be512ade53d.ico' // 设置页面 Favicon
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/dashboard/welcome.vue'),
      meta: {
        title: '欢迎访问图床对比',
        favicon: 'https://cdn-us.imgs.moe/2023/07/24/64be512ade53d.ico' // 设置页面 Favicon
      }
    },
    {
      path: '/login',
      name: 'login',
      // component: () => import('../views/dashboard/Login.vue'),
      component: () => import('../views/dashboard/welcome.vue'),
      meta: {
        title: '图床对比登录',
        favicon: 'https://cdn-us.imgs.moe/2023/07/24/64be512ade53d.ico' // 设置页面 Favicon
      }
    },
    {
      path: '/register',
      name: 'register',
      // component: () => import('../views/dashboard/Register.vue'),
      component: () => import('../views/dashboard/welcome.vue'),
      meta: {
        title: '图床对比注册',
        favicon: 'https://cdn-us.imgs.moe/2023/07/24/64be512ade53d.ico' // 设置页面 Favicon
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/dashboard.vue'),
      meta: { requiresAuth: true, title: '图床对比后台', favicon: 'https://cdn-us.imgs.moe/2023/07/24/64be512ade53d.ico' },
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/404.vue'),
      meta: {
        title: '404',
        favicon: 'https://cdn-us.imgs.moe/2023/06/03/647a8b4c4d502.ico' 
      }
    }
  ],
});

// 导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'; // 设置页面标题
  const favicon = document.querySelector('link[rel="icon"]');
  if (to.meta.favicon && favicon) {
    favicon.href = to.meta.favicon;
  }

  const isAuthenticated = localStorage.getItem('token'); // 假设你在登录成功后将token保存在LocalStorage
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (isAuthenticated) {

      http.get('/auth/verify-token', {
        headers: {
          Authorization: isAuthenticated,
        },
      })
        .then(response => {

          if (response.data.status) {
            next();
          } else {
            localStorage.clear();
            next('/login');
          }
        })
        .catch(error => {
          localStorage.clear();
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
