<template>
  <div class="">
    <nav
      class="absolute top-0 left-0 w-full z-50 bg-blur-sm  text-white h-[80px] flex items-center justify-between shadow-lg">
      <!-- Arka plan karartması -->
      <div v-if="menuOpen" class="fixed inset-0 bg-opacity-30 z-20 backdrop-blur-sm" @click="toggleMenu"></div>

      <!-- Menü Toggler (hamburger buton) -->
      <div class="p-4">
        <button @click="toggleMenu" class="text-white hover:text-red-700 ">
          <!-- Hamburger ikonu -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Açılır Menü -->
      <div v-if="menuOpen" class="fixed top-0 left-0 w-[150px] h-[250px] bg-gray-800 z-30 shadow-lg p-6 flex flex-col">
        <ul class="py-1">
          <li>
            <router-link :to="{ name: 'movies' }"><a href="#" class="block px-4 py-2 hover:bg-gray-700">Movies</a>
            </router-link>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-700">Films</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-700">TV Shows</a>
          </li>
          <li>
            <router-link :to="{ name: 'favorite' }"><a href="#"
                class="block px-4 py-2 hover:bg-gray-700">Favorites</a></router-link>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-700">Genres</a>
          </li>
        </ul>




      </div>
      <!-- Logo -->
      <div class="relative flex mb-4">

        <!-- <div
          v-if="isDropdownOpen"
          class="absolute top-full right-full mt-2 mr-2 bg-gray-800 text-white rounded-md shadow-lg z-10"
          ref="dropdownMenuRef" 
          >
        </div> -->
        <img id="menuLogo" src="/image.svg" alt="Logo" class="w-[96px] h-[42px] ">
      </div>

      <div class="relative flex justify-center items-center h-[50px]">
        <form action="" @submit.prevent="searchToText">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-white"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search" class="border-2 pl-10 rounded-xl py-1" v-model="searchText" />


          <button type="submit"></button>
        </form>

      </div>

      <!-- Buttons -->
      <div class="space-x-4 mr-[100px] py-5 flex">

        <button
          class="hover:bg-white/20 hover:backdrop-blur-sm cursor-pointer w-[97px] h-[44px] px-4 py-2 bg-transparent border border-white rounded-xl transition">
          Log In
        </button>
        <button
          class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-red-700  cursor-pointer px-4 py-2 w-[108px] h-[44px] rounded-xl hover:bg-red-800 transition">
          Sign Up
        </button>
      </div>
    </nav>



    <div class="relative flex justify-center w-full bg-black">
      <img src="/back.webp" alt="back photo" class="w-full h-[750px]">
    </div>


  </div>

  <div
    class="absolute left-[100px] bottom-[120px] text-white text-[56px] w-[672px] h-[144px] font-semibold leading-[1.25]">
    Every color, every sound, everyone is in GAİN
  </div>

  <!-- {{ result.results }} -->
  <div class="flex flex-wrap gap-10">
    <img class="w-25 h-25" v-for="movie in result.results" :key="movie.id"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
  </div>
</template>

<style scoped></style>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const searchText = ref("");
const result = ref("")
const router = useRouter()
const route = useRoute()
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdlMmMxNzI3MTFlN2M1NDhmOWQxMzhjNDNkYzM1OCIsIm5iZiI6MTc0NzU4MDkzOC44ODUsInN1YiI6IjY4MjlmODBhZTYzZmNlNzUzNDViNTVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IM9y5B-3XHZXuH3Y_K2d57pkO6N8HB7fAa8ezEWyv74`
  }
}

const searchToText = () => {
  router.push({ path: '/', query: { 'search': searchText.value } })
}

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchText.value}`, config)
    result.value = response.data // diňe .data gerek
  } catch (error) {
    console.error("API request failed:", error)
  }
  searchText.value = route.query.search
  // router.push('/')
})








const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}




</script>