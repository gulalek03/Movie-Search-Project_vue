<template>
  <div class="h-full px-8 py-8 bg-black">
    
    <h1 class="text-3xl font-bold text-white mb-6">Genres</h1>

    <p v-if="isLoading" class="text-white text-lg">Loading...</p>

    <p v-else-if="error" class="text-red-500 text-lg">
      Türler yüklenirken bir hata oluştu: {{ error.message }}
    </p>
    

    <div v-else-if="genres.length" class="flex flex-wrap gap-4">
      <router-link
        v-for="genre in genres"
        :key="genre.id"
        :to="{ name: 'moviesByGenre', params: { genreId: genre.id, genreName: genre.name } }"
        class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 whitespace-nowrap"
      >
        {{ genre.name }}
      </router-link>
    </div>
    

    <p v-else class="text-white text-lg">Gösterilecek tür bulunamadı.</p>
  </div>
  <div>
    <img id="menuLogo" src="/frozen.jpeg" alt="Logo" class="w-full h-full">
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reaktif değişkenler
const genres = ref([]); // Türleri depolamak için
const isLoading = ref(true); 
const error = ref(null);    

// TMDb API yapılandırması (Kendi tokenınızı buraya yapıştırın!)
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74`, 
  },
};

// Bileşen yüklendiğinde türleri çeker
onMounted(async () => {
  try {
    // Film türleri endpoint'ini kullanıyoruz
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', config);
    genres.value = response.data.genres; // TMDb film türleri API'si 'genres' alanında döner
  } catch (err) {
    error.value = err; 
    console.error('Film türleri çekilirken hata oluştu:', err);
  } finally {
    isLoading.value = false; 
  }
});
</script>

<style scoped>
/* Bileşene özel stil tanımlamaları buraya gelebilir. */
</style>