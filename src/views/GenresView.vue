<template>
  <div class="section-genres">
    <div class="container">
      <h1 class="title section-genres__title">Жанры фильмов</h1>
      <div class="loading" v-if="movies.isLoadingGenres"></div>
      <div class="section-genres__content" v-else>
        <GenreMovies v-for="(item, index) in genres" :key="index" :genre="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenreMovies from '@/components/GenreMovies.vue'
import { useMovieStore } from '@/stores/movie'
import { ref, onMounted } from 'vue'

const genres = ref<string[]>([])
const movies = useMovieStore()

const loadMoviesGenres = async (): Promise<void> => {
  const response = await movies.getListGenres()
  genres.value = response ?? []
}

onMounted((): void => {
  loadMoviesGenres()
})
</script>

<style lang="scss">
.section-genres {
  padding: 64px 0 160px;

  @media (max-width: 650px) {
    padding: 16px 0 40px;
  }

  &__title {
    margin-bottom: 64px;

    @media (max-width: 650px) {
      margin-bottom: 40px;
    }
  }

  &__content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 64px;
    column-gap: 40px;

    @media (max-width: 650px) {
      flex-direction: column;
      row-gap: 24px;
    }
  }
}
</style>