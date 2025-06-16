import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import aboutMovie from '@/components/aboutMovie.vue'
import FavoritiesView from '@/views/favoritiesView.vue'
import MoviesView from '@/views/moviesView.vue'

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
      props: true,
    }, 
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritiesView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
      
    },


    
  ],
})

export default router
