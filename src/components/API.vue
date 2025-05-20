<!-- <template>
     <div class="movie-search">
    <input
      v-model="query"
      @keyup.enter="searchMovies"
      placeholder="Search movies..."
      class="input"
    />
    <button @click="searchMovies" class="button">Search</button>

    <ul v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} ({{ movie.release_date ? movie.release_date.slice(0, 4) : 'N/A' }})
      </li>
    </ul>

    <p v-else-if="searched">No results found.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const apiKey = '0b7e2c172711e7c548f9d138c43dc358';  // TMDb API anahtarınızı buraya koyun

const query = ref('');
const movies = ref([]);
const searched = ref(false);

async function searchMovies() {
  if (!query.value.trim()) return;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query.value)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    movies.value = data.results;
    searched.value = true;
  } catch (err) {
    console.error('API error:', err);
  }
}
</script>

<style scoped>
.movie-search {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.input {
  padding: 0.5rem;
  width: 70%;
  margin-right: 0.5rem;
}

.button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style> -->