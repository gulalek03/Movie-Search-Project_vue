<template>
  <div class="relative min-h-screen bg-cover bg-center text-white" :style="containerStyle">
    <div v-if="selectedMovie.title"
      class="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-5 flex flex-col md:flex-row items-start md:space-x-8">

      <div v-if="selectedMovie.poster_path" class="w-full md:w-1/3 flex-shrink-0 mb-8 md:mb-0">
        <img :src="`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`" :alt="selectedMovie.title + ' Poster'"
          class="rounded-lg shadow-lg w-full h-auto" />
      </div>
      <div v-else
        class="w-full md:w-1/3 flex-shrink-0 mb-8 md:mb-0 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-lg"
        style="height: 300px;">
        No Poster
      </div>

      <div class="flex-grow">
        <h1 class="text-5xl font-extrabold mb-6">{{ selectedMovie.title }}</h1>
        <p class="text-lg leading-relaxed mb-6 italic text-gray-300">
          {{ selectedMovie.tagline }}
        </p>
        <p class="text-lg leading-relaxed mb-6">{{ selectedMovie.overview }}</p>
        
        

        <div class="mt-6 text-sm text-gray-300 space-y-1">
          <div><span class="font-semibold text-white">Release Date:</span> {{ selectedMovie.release_date }}</div>
          <div><span class="font-semibold text-white">Rating:</span> {{ selectedMovie.vote_average?.toFixed(1) }} / 10
          </div>
          <div><span class="font-semibold text-white">Runtime:</span> {{ selectedMovie.runtime }} min</div>
          <div v-if="selectedMovie.genres && selectedMovie.genres.length">
            <span class="font-semibold text-white">Genres:</span>
            <ul class="inline-flex flex-wrap gap-2 ml-2">
              <li v-for="genre in selectedMovie.genres" :key="genre.id"
                class="bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                {{ genre.name }}
              </li>
            </ul>
          </div>
          <div v-if="selectedMovie.homepage">
            <span class="font-semibold text-white">Homepage:</span>
            <a :href="selectedMovie.homepage" target="_blank" class="text-blue-400 hover:underline ml-2">
              Visit Site
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="movieCast.length" class="mt-5 pb-20">
      <h2 class="text-3xl font-bold mb-6 ml-35">Cast</h2>
      <div class="flex flex-row flex-wrap justify-start space-x-6 pb-4 pl-33 space-y-6">
        <div v-for="actor in movieCast" :key="actor.id" class="text-center">
          <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`" :alt="actor.name"
            class="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mx-auto mb-2 border-2 border-gray-600" />
          <div v-else
            class="w-24 h-24 sm:w-28 sm:h-28 bg-gray-700 rounded-full mx-auto flex items-center justify-center text-gray-400 text-xs mb-2">
            Image Not Available
          </div>
          <p class="text-sm font-semibold">{{ actor.name }}</p>
          <p class="text-xs text-gray-400">{{ actor.character }}</p>
        </div>
      </div>
    </div>


    <div v-else class="relative z-10 flex justify-center items-center h-screen text-3xl font-semibold">
      Loading movie details...
    </div>
  </div>

</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedMovie = ref({});
const movieCast = ref([]);

const requestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74'
  }
};

const fetchMovie = async (movieId) => {
  if (!movieId) {
    console.warn("Film ID'si bulunamadı, film çekilemiyor.");
    selectedMovie.value = {};
    movieCast.value = [];
    return;
  }

  selectedMovie.value = {};
  movieCast.value = [];

  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  try {
    const [detailsResponse, creditsResponse] = await Promise.all([
      fetch(movieDetailsUrl, requestOptions),
      fetch(movieCreditsUrl, requestOptions)
    ]);

    if (!detailsResponse.ok) {
      throw new Error(`HTTP error! Film detayları alınamadı. Durum: ${detailsResponse.status}`);
    }
    if (!creditsResponse.ok) {
      throw new Error(`HTTP error! Oyuncu kadrosu alınamadı. Durum: ${creditsResponse.status}`);
    }

    const movieData = await detailsResponse.json();
    const creditsData = await creditsResponse.json();

    console.log("Alınan film detayları:", movieData);
    console.log("Alınan oyuncu kadrosu:", creditsData);

    selectedMovie.value = movieData;
    movieCast.value = creditsData.cast ? creditsData.cast.slice(0, 15) : [];

  } catch (error) {
    console.error("Film detayları veya oyuncu kadrosu alınırken hata oluştu:", error);
  }
};

const containerStyle = computed(() => {
  if (selectedMovie.value.backdrop_path) {
    // Siyah gradient overlay ile arka plan görseli
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w1280${selectedMovie.value.backdrop_path})`,
    };
  }
  return {
    backgroundColor: '#1a202c', // Tailwind'in varsayılan gray-900'ü (arka plan görseli yoksa)
  };
});

watchEffect(() => {
  if (route.params.id) {
    fetchMovie(route.params.id);
  }
});


</script>

<style scoped>

</style>
