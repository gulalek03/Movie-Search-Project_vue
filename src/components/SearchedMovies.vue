<template>

    <div class="min-h-screen bg-black p-6 relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div v-for="(item, index) in movies" :key="index" class="mb-10 bg-gray-200 rounded-xl shadow transition-transform duration-300 transform hover:scale-110 hover:z-50 ">
                    <router-link :to="{
                        name: 'about',
                        params: { id: item.id }
                    }">


                        <!-- {{ movies }} -->
                        <div class="">
                            <img :src="getPoster(item)" alt="Poster"
                                class="w-[200px] h-[300px] object-cover mx-5 mt-3 " />
                            <div class="cursor-pointer hover:text-red-800 font-medium p-2 w-[200px] mx-3">
                                {{ item.original_title }}
                                ({{ item.release_date }})
                            </div>
                        </div>


                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const movies = ref([])

const searchQuery = ref('')

function getPoster(item) {
    return item.poster_path
        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        : '../public/images.webp';

}

const BASE_URL = 'https://api.themoviedb.org/3'

const getData = async () => {
    const API_KEY = "0b7e2c172711e7c548f9d138c43dc358"
    const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74"

    console.log(MY_API_TOKEN);

    const response = await axios.get(`${BASE_URL}/search/movie?query=${encodeURIComponent(route.query.search)}`, {
        params: { api_key: API_KEY },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
    })


    movies.value = response.data.results

}

onMounted(() => route.query.search, async () => {
    await getData();
})
watch(async () => {
    await getData();
})







</script>