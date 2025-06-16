<template>
  <div class="px-8 py-8 bg-black">
    <h1 class="text-3xl font-bold text-white mb-6">Popular TV Shows</h1>

    <p v-if="isLoading" class="text-white text-lg">Loading...</p>

    <p v-else-if="error" class="text-red-500 text-lg">
      TV Dizileri yüklenirken bir hata oluştu: {{ error.message }}
    </p>

    <div
      v-else-if="tvShows.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="show in tvShows" :key="show.id" class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          :src="getPosterUrl(show.poster_path)"
          :alt="show.name"
          class="w-full h-auto object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ show.name }}</h2>
          <p class="text-gray-400 text-sm">
            Release Date: {{ show.first_air_date }}
          </p>
          <router-link
            :to="{ name: 'about', params: { id: show.id } }" 
            class="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            More Details
          </router-link>
        </div>
      </div>
    </div>

    <p v-else class="text-white text-lg">Gösterilecek TV Dizisi bulunamadı.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reaktif değişkenler
const tvShows = ref([]); // TV dizilerini depolamak için
const isLoading = ref(true); 
const error = ref(null);    

// TMDb API yapılandırması (Kendi tokenınızı buraya yapıştırın!)
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74`, 
  },
};

// Poster URL'sini oluşturan yardımcı fonksiyon
const getPosterUrl = (posterPath) => { 
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
  return 'https://via.placeholder.com/500x750?text=Poster+Yok'; 
};

// Bileşen yüklendiğinde TV dizilerini çeker
onMounted(async () => {
  try {
    // Popüler TV Dizileri endpoint'ini kullanıyoruz
    const response = await axios.get('https://api.themoviedb.org/3/tv/popular', config);
    tvShows.value = response.data.results;
  } catch (err) {
    error.value = err; 
    console.error('Popüler TV dizileri çekilirken hata oluştu:', err);
  } finally {
    isLoading.value = false; 
  }
});
</script>

<style scoped>
/* Bileşene özel stil tanımlamaları buraya gelebilir. */
</style>