<template>
  <div class="flex items-center space-x-4">
    <button @click="toggleLike"
      class="px-5 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200"
      :class="isLiked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path v-if="isLiked" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
        <path v-else fill-rule="evenodd" d="M10 6.293l-1.172-1.172a4 4 0 10-5.656 5.656L10 17.657l6.828-6.829a4 4 0 10-5.656-5.656L10 6.293zM10 8.11l2.457-2.457a2 2 0 112.828 2.828L10 13.943 4.715 8.657a2 2 0 112.828-2.828L10 8.11z" clip-rule="evenodd"></path>
      </svg>
      <span>{{ isLiked ? 'Beğenildi' : 'Beğen' }}</span>
    </button>

    <button @click="toggleFavorite"
      class="px-5 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200"
      :class="isFavorite ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path v-if="isFavorite" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 k0-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        <path v-else fill-rule="evenodd" d="M10 2a1 1 0 01.9.623l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.098 2.623A1 1 0 0110 2zm0 3.328L9.305 7.1a1 1 0 00-.95.69h-3.462L3.927 8.72l2.8 2.034a1 1 0 00.364 1.118l-1.07 3.292 2.8-2.034a1 1 0 001.175 0l2.8 2.034-1.07-3.292a1 1 0 00.364-1.118l2.8-2.034-2.457-1.782a1 1 0 00-.95-.69H10z" clip-rule="evenodd"></path>
      </svg>
      <span>{{ isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
});

const isLiked = ref(false);
const isFavorite = ref(false);

// localStorage'dan filmin beğenme/favori durumunu kontrol eden fonksiyon
const checkLocalStorageStatus = (id) => {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

  isLiked.value = likedMovies.includes(id);
  isFavorite.value = favoriteMovies.includes(id);
};

// Beğenme butonuna tıklandığında çalışan fonksiyon
const toggleLike = () => {
  let likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
  const id = props.movieId;

  if (isLiked.value) {
    likedMovies = likedMovies.filter(movieId => movieId !== id);
  } else {
    likedMovies.push(id);
  }
  localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  isLiked.value = !isLiked.value;
};

// Favori butonuna tıklandığında çalışan fonksiyon
const toggleFavorite = () => {
  let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
  const id = props.movieId;

  if (isFavorite.value) {
    favoriteMovies = favoriteMovies.filter(movieId => movieId !== id);
  } else {
    favoriteMovies.push(id);
  }
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  isFavorite.value = !isFavorite.value;
};

// Bileşen yüklendiğinde ve movieId prop'u değiştiğinde durumu kontrol et
onMounted(() => {
  checkLocalStorageStatus(props.movieId);
});

watch(() => props.movieId, (newMovieId) => {
  checkLocalStorageStatus(newMovieId);
}, { immediate: true }); // immediate: true sayesinde ilk yüklemede de watch çalışır
</script>

<style scoped>
/* Eğer bu bileşene özgü stiliniz varsa buraya ekleyebilirsiniz */
</style>