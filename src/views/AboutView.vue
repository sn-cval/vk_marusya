<template>
  <RandomMovie
    v-if="movieID"
    :movie="currentMovie"
    :show-update-button="false"
    :show-about-button="false"
    @get-trailer="loadTrailerMovie"
    @open-modal-login="openModalLogin"
  />
  <AboutMovie v-if="movieID" :movie="currentMovie" />
  <TrailerMovie
    v-if="movies.isTrailerMovie && movieID"
    :movie="currentMovie"
    @close-trailer="closeModalTrailer"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movie'
import RandomMovie from '@/components/RandomMovie.vue'
import AboutMovie from '@/components/AboutMovie.vue'
import TrailerMovie from '@/components/TrailerMovie.vue'
import type { Movie } from '@/types/film'

const props = defineProps<{
  id: number
}>()

const emit = defineEmits<{
  (name: 'open-modal-login'): void
}>()

const movies = useMovieStore()
const movieID = ref<Movie | null>(null)

const currentMovie = computed<Movie>(() => {
  if (!movieID.value) {
    throw new Error('Movie is not loaded yet')
  }
  return movieID.value
})

const loadMovieID = async (): Promise<void> => {
  const response = await movies.getMoviesID(props.id)
  movieID.value = response
}

const loadTrailerMovie = (): void => {
  movies.changeTrailerMovie()
}

const closeModalTrailer = (): void => {
  movies.changeTrailerMovie()
}

const openModalLogin = (): void => {
  emit('open-modal-login')
}

onMounted((): void => {
  loadMovieID()
})

watch(() => props.id, loadMovieID)
</script>

<style lang="scss">
</style>