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
                <router-link :to="{ name: 'moviesByGenre', params: { genreId: genre.id, genreName: genre.name } }"
                  class="text-white hover:text-red-400 transition-colors duration-200">
                {{ genre.name }}</router-link>
              </li>
            </ul>
          </div>
          <div v-if="selectedMovie.homepage">
            <span class="font-semibold text-white">Homepage:</span>

            <a :href="selectedMovie.homepage" target="_blank" class="text-blue-400 hover:underline ml-2">
              Visit Site
            </a>
          </div>
          <button @click="toggleFavorite"
            class="px-5 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200 mt-5"
            :class="isFavorite ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 ' : 'bg-gray-700 hover:bg-gray-600'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path v-if="isFavorite"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z">
              </path>
              <path v-else fill-rule="evenodd"
                d="M10 2a1 1 0 01.9.623l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.098 2.623A1 1 0 0110 2zm0 3.328L9.305 7.1a1 1 0 00-.95.69h-3.462L3.927 8.72l2.8 2.034a1 1 0 00.364 1.118l-1.07 3.292 2.8-2.034a1 1 0 001.175 0l2.8 2.034-1.07-3.292a1 1 0 00.364-1.118l2.8-2.034-2.457-1.782a1 1 0 00-.95-.69H10z"
                clip-rule="evenodd"></path>
            </svg>
            <span>{{ isFavorite ? 'Remove' : 'Add to favorities' }}</span>
          </button>
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
      Loading...
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin mt-2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const selectedMovie = ref({});
const movieCast = ref([]);
const favoriteMovies = ref([])
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

    const local = JSON.parse(localStorage.getItem('favoriteMovies'));
    if (local.length > 0) {
      favoriteMovies.value = [...local]
    }

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
  console.log(route.params.id, 'sss');

  if (route.params.id) {
    fetchMovie(route.params.id);
  }
});


onMounted(() => {

})

// // Eğer ayrı bir bileşenseniz, prop'u tanımlayın
// const props = defineProps({
//   movieId: {
//     type: Number,
//     required: true
//   }
// });


// Favori durumunu localStorage'dan kontrol eden fonksiyon


// Butona tıklandığında çağrılan fonksiyon
const toggleFavorite = () => {
  // Mevcut favori filmler listesini al
  console.log('toggke', selectedMovie.value);

  const id = route.params.id; // Veya MovieDetail.vue içindeyseniz selectedMovie.value.id
  const index = favoriteMovies.value.findIndex(movi => movi.id === selectedMovie.value.id)


  if (index === -1) {
    // Eğer zaten favoride ise, listeden kaldır
    favoriteMovies.value.push(selectedMovie.value);
  } else {
    // Eğer favoride değilse, listeye ekle

    const spliced = favoriteMovies.value.splice(index, 1);
    console.log(spliced[0].id, 'togg');

  }

  // Güncellenmiş listeyi localStorage'a geri kaydet
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies.value));

  // isFavorite durumunu tersine çevir (UI'ı güncellemek için)
};

// Bileşen yüklendiğinde ve movieId değiştiğinde durumu kontrol et
const isFavorite = computed(() => favoriteMovies.value.find((e) => selectedMovie.value.id == e.id))

</script>

<style scoped></style>
