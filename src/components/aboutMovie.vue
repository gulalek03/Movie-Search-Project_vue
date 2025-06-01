<template>

    <div>

        {{ route.params.id }}
        {{ selectedMovie }}

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
// const router = useRouter()
const selectedMovie = ref({})


const url = 'https://api.themoviedb.org/3/movie/550?language=en-US';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => { console.log(json); selectedMovie.value = json })
    .catch(err => console.error(err));
</script>