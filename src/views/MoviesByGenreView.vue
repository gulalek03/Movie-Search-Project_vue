<template>
  <div class="bg-black px-8 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">
      "{{ genreName }}" Films
    </h1>

    <p v-if="isLoading" class="text-white text-lg">Loading Films...</p>

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

    <p v-else class="text-white text-lg">No films available in this category.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'; // watch'u import ettik
import axios from 'axios';
import { useRoute } from 'vue-router'; // useRoute'u import ettik

// Props'ları tanımla
const props = defineProps({
  genreId: {
    type: [String, Number],
    required: true,
  },
  genreName: {
    type: String,
    required: true,
  },
});

// Reaktif değişkenler
const movies = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Vue Router'dan mevcut rota bilgilerini almak için
const route = useRoute();

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
  return 'https://via.placeholder.com/500x750?text=Poster+Yok';
};

// Filmleri API'den çeken fonksiyon
const fetchMoviesByGenre = async (id) => {
  isLoading.value = true;
  error.value = null;
  try {
    // TMDb'de belirli bir türe ait filmleri "discover" endpoint'i ile çekiyoruz.
    // 'with_genres' parametresi ile tür ID'sini belirtiriz.
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
      config
    );
    movies.value = response.data.results;
  } catch (err) {
    error.value = err;
    console.error(`Film türü (${id}) çekilirken hata oluştu:`, err);
  } finally {
    isLoading.value = false;
  }
};

// Bileşen ilk yüklendiğinde filmleri çeker
onMounted(() => {
  fetchMoviesByGenre(props.genreId);
});

// Eğer URL'deki genreId değişirse (örneğin aynı sayfada farklı bir türe tıklanırsa),
// filmleri yeniden çekmek için watch kullanırız.
watch(
  () => props.genreId,
  (newGenreId) => {
    fetchMoviesByGenre(newGenreId);
  }
);
</script>

<style scoped>
/* Bileşene özel stil tanımlamaları buraya gelebilir. */
</style>