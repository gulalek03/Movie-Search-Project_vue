
<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center">Favorite movies</h1>

      <div v-if="isLoading" class="text-center text-xl text-gray-400 py-10">
        Favorite movies are loading...
      </div>

      <div v-else-if="favoriteMovies.length === 0" class="text-center text-xl text-gray-500 py-10">
        No favorite movies found yet <br> You can add your favorite movies to your favorites list!
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="movie in favoriteMovies" :key="movie.id"
          class="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <router-link :to="{ name: 'about', params: { id: movie.id } }" class="block">
            <img :src="getPoster(movie)" :alt="movie.title + ' Poster'"
              class="w-full h-72 object-cover" />
            <div class="p-4">
              <h2 class="text-lg font-semibold truncate">{{ movie.title }}</h2>
              <p v-if="movie.release_date" class="text-sm text-gray-400 mt-1">
                ({{ movie.release_date.substring(0, 4) }})
              </p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-sm text-yellow-400 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                  {{ movie.vote_average?.toFixed(1) }}
                </span>
                <button @click.prevent="removeFavorite(movie.id)"
                  class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200">
                  Remove from favorities
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const favoriteMovies = ref([]);
const isLoading = ref(true);

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "0b7e2c172711e7c548f9d138c43dc358"; // Kendi API anahtarınızı kullanın
const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDBhZTYzZmNlNzUzNDVhNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74"; // Kendi API token'ınızı kullanın

// Film posteri URL'sini oluşturan yardımcı fonksiyon
function getPoster(movie) {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : '/images.webp'; // Poster yoksa varsayılan resim
}

// Favori filmlerin detaylarını localStorage'dan alıp TMDB API'sinden çeken fonksiyon

  isLoading.value = false
  favoriteMovies.value = []; // Önceki filmleri temizle

 const favoriteMovie = JSON.parse(localStorage.getItem('favoriteMovies'));
if(favoriteMovie){
  favoriteMovies.value=favoriteMovie
}
  

  

// Favoriden film kaldıran fonksiyon
const removeFavorite = (movieIdToRemove) => {
  let favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
  favoriteMovieIds = favoriteMovieIds.filter(id => id !== movieIdToRemove);
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds));

  // UI'dan da kaldır
  favoriteMovies.value = favoriteMovies.value.filter(movie => movie.id !== movieIdToRemove);
};

// Bileşen yüklendiğinde favori filmleri çek
onMounted(() => {
  // fetchFavoriteMovies();

  // Favori durumu değiştiğinde bu sayfayı otomatik güncellemek için basit bir çözüm
  // Gerçek uygulamalarda EventBus veya Vuex/Pinia gibi state yönetimleri daha iyi olabilir
  window.addEventListener('storage', (event) => {
    if (event.key === 'favoriteMovies') {
      // fetchFavoriteMovies(); // localStorage değişince filmleri yeniden çek
    }
  });
});
</script>

<style scoped>
/* Eğer bu bileşene özgü stiliniz varsa buraya ekleyebilirsiniz */
</style>