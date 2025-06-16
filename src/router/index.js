import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import aboutMovie from '@/components/aboutMovie.vue'
import FavoritiesView from '@/views/favoritiesView.vue'
import MoviesView from '@/views/moviesView.vue'
import FilmsView from '@/views/filmsView.vue'
import ShowsView from '@/views/ShowsView.vue'
import genresView from '@/views/genresView.vue'
import MoviesByGenreView from '@/views/MoviesByGenreView.vue'

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
    //  {
    //   path: '/films',
    //   name: 'films',
    //   component: FilmsView,
      
    // },
    {
      path: '/tvShows',
      name: 'tvShows',
      component: ShowsView,
    },
    {
      path: '/genres',
      name: 'genres',
      component: genresView,
    },
    {
      // Yeni rota tanımı
      path: '/genres/:genreId/:genreName', 
      name: 'moviesByGenre', 
      component: MoviesByGenreView, 
      props: true, // URL'deki parametreleri bileşene prop olarak geçirin
    },


    
  ],
})

export default router
