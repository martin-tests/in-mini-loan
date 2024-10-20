import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/application-feedback',
      name: 'DecisionNegative',
      component: () => import('@/views/DecisionNegative.vue')
    },
    {
      path: '/application-progress',
      name: 'DecisionPositive',
      component: () => import('@/views/DecisionPositive.vue')
    }
  ]
})

export default router
