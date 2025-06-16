<template>
  <div class="container mx-auto p-4 text-white">
    <h1 class="text-3xl font-bold mb-6">{{ pageTitle }}</h1>

    <div v-if="loading" class="text-gray-300">Veriler yükleniyor...</div>
    <div v-else-if="error" class="text-red-500">Hata: {{ error.message }}</div>
    <div v-else>
      <div v-if="items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in items" :key="item.id || item.name" class="bg-gray-800 rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-2">{{ item.title || item.name }}</h2>
          <p class="text-gray-400 text-sm">{{ item.overview || item.description }}</p>
          <img v-if="item.poster_path" :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`" alt="Poster" class="mt-3 rounded-md w-full h-auto object-cover">
          </div>
      </div>
      <div v-else class="text-gray-300">Bu kategori için henüz veri bulunmuyor.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router'; // useRoute hook'unu Composition API ile kullanmak için

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

const items = ref([]);
const loading = ref(true);
const error = ref(null);

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0b7e2c172711e7c548f9d138c43dc358'; // Buraya kendi TMDB API anahtarınızı girin

const pageTitle = computed(() => {
  switch (props.type) {
    case 'movies': return 'Popüler Filmler';
    case 'films': return 'Filmler (Popüler)'; // Eğer 'films' için farklı bir API çağrısı varsa burayı düzenleyin
    case 'tv-shows': return 'Popüler TV Şovları';
    case 'genres': return 'Film Türleri';
    default: return 'Kategori';
  }
});

const fetchCategoryData = async (categoryType) => {
  loading.value = true;
  error.value = null;
  items.value = [];

  let endpoint = '';
  switch (categoryType) {
    case 'movies':
    case 'films':
      endpoint = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR`;
      break;
    case 'tv-shows':
      endpoint = `${API_BASE_URL}/tv/popular?api_key=${API_KEY}&language=tr-TR`;
      break;
    case 'genres':
      endpoint = `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=tr-TR`;
      break;
    default:
      error.value = new Error('Bilinmeyen kategori tipi.');
      loading.value = false;
      return;
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP hatası! Durum: ${response.status}`);
    }
    const data = await response.json();
    // TMDB API yanıtına göre 'results' veya 'genres' alanını kullanın
    items.value = data.results || data.genres;
  } catch (err) {
    error.value = err;
    console.error("API çekme hatası:", err);
  } finally {
    loading.value = false;
  }
};

// props.type değiştiğinde API'yi tekrar çağır
watch(() => props.type, (newType) => {
  fetchCategoryData(newType);
}, { immediate: true }); // Bileşen ilk yüklendiğinde de çalıştır
</script>

<style scoped>
/* Tailwind CSS sınıflarınız zaten var, ek stil gerekirse buraya ekleyin */
</style>