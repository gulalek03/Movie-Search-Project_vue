import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import aboutMovie from '@/components/aboutMovie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/aboutMovie/:id?',
      name: 'about',
      component: aboutMovie,
    }
    
  ],
})

export default router
