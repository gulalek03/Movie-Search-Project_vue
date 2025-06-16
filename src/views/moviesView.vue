<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Film Değişiklikleri</h1>
    <ul v-if="changes.length">
      <li v-for="change in changes" :key="change.id" class="mb-2">
        Film ID: {{ change.id }}
      </li>
    </ul>
    <p v-else>Yükleniyor...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const changes = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/changes?page=1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74' 
      }
    })

    const data = await response.json()
    changes.value = data.results || []
    console.log(data)
  } catch (error) {
    console.error('API hatası:', error)
  }
})
</script>
