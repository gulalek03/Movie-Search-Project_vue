<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">Filmler</h1>

    <p v-if="isLoading" class="text-white text-lg">Filmler yükleniyor...</p>

    <p v-else-if="error" class="text-red-500 text-lg">
      Filmler yüklenirken bir hata oluştu: {{ error.message }}
    </p>

    <div
      v-else-if="films.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="film in films" :key="film.id" class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          :src="getFilmPosterUrl(film.poster_path)"
          :alt="film.title"
          class="w-full h-auto object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ film.title }}</h2>
          <p class="text-gray-400 text-sm">
            Çıkış Tarihi: {{ film.release_date }}
          </p>
          <router-link
            :to="{ name: 'about', params: { id: film.id } }"
            class="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Detayları Gör
          </router-link>
        </div>
      </div>
    </div>

    <p v-else class="text-white text-lg">Gösterilecek film bulunamadı.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reaktif değişkenler
const films = ref([]); // Filmleri depolamak için 'movies' yerine 'films' kullandık
const isLoading = ref(true); 
const error = ref(null);    

// TMDb API yapılandırması (Kendi tokenınızı buraya yapıştırın!)
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74`, 
  },
};

// Film poster URL'sini oluşturan yardımcı fonksiyon
const getFilmPosterUrl = (posterPath) => { // Fonksiyon adını da 'getFilmPosterUrl' olarak değiştirdik
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
  return 'https://via.placeholder.com/500x750?text=Poster+Yok'; 
};

// Bileşen yüklendiğinde filmleri çeker
onMounted(async () => {
  try {
    // Burada farklı bir API endpoint'i kullanabiliriz.
    // 'now_playing' (şu anda gösterimde olanlar), 'upcoming' (gelecek filmler) veya
    // belirli bir kategoriye ait 'discover' sorgusu gibi.
    // Örnek olarak şu anda gösterimde olanları çekelim:
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', config);
    films.value = response.data.results;
  } catch (err) {
    error.value = err; 
    console.error('Filmler çekilirken hata oluştu:', err);
  } finally {
    isLoading.value = false; 
  }
});
</script>

<style scoped>
/* Bileşene özel stil tanımlamaları buraya gelebilir. */
</style>