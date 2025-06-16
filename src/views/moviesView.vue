<template>
  <div class=" px-8 py-8 bg-black">
    <h1 class="text-3xl font-bold text-white mb-6">Popular films</h1>

    <p v-if="isLoading" class="text-white text-lg">Films are loading... <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin mt-2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg></p>

    <p v-else-if="error" class="text-red-500 text-lg">
      Filmler yüklenirken bir hata oluştu: {{ error.message }}
    </p>

    <div
      v-else-if="movies.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="movie in movies" :key="movie.id" class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          :src="getMoviePosterUrl(movie.poster_path)"
          :alt="movie.title"
          class="w-full h-auto object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ movie.title }}</h2>
          <p class="text-gray-400 text-sm">
            Release Date: {{ movie.release_date }}
          </p>
          <router-link
            :to="{ name: 'about', params: { id: movie.id } }"
            class="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
           More Details
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
const movies = ref([]);
const isLoading = ref(true); // Yükleme durumunu izler
const error = ref(null);    // Hata durumunu izler

// TMDb API yapılandırması (Kendi tokenınızı buraya yapıştırın!)
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74`, 
  },
};

// Film poster URL'sini oluşturan yardımcı fonksiyon
const getMoviePosterUrl = (posterPath) => {
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
  // Poster yoksa yer tutucu bir resim döndürebilirsiniz
  return 'https://via.placeholder.com/500x750?text=Poster+Yok'; 
};

// Bileşen yüklendiğinde filmleri çeker
onMounted(async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', config);
    movies.value = response.data.results;
  } catch (err) {
    error.value = err; // Hatayı kaydet
    console.error('Popüler filmler çekilirken hata oluştu:', err);
  } finally {
    isLoading.value = false; // Yükleme tamamlandı
  }
});
</script>

<style scoped>

</style>