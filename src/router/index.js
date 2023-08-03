import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/fileup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/imgtest',
      name: 'imgtest',
      component: () => import('../views/ImgTest.vue')
    }
  ]
})

export default router
