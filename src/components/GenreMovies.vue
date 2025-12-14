<template>
  <router-link class="card-genre" :to="{ name: 'movies', query: { genre: genre } }">
    <img class="card-genre__image" v-if="getGenreMovies(genre)" :src="`/img/${genre}.jpg`" alt="" />
    <img class="card-genre__image" v-else src="/img/other.jpg" alt="" />
    <h2 class="card-genre__title">{{ getGenreMovies(genre) }}</h2>
  </router-link>
</template>

<script setup lang="ts">
import { getGenreMovies } from '@/utils/get-genre'

const props = defineProps<{
  genre: string
}>()
</script>

<style lang="scss">
.card-genre {
  flex-basis: calc((100% / 4) - 30px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  text-decoration: none;
  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
  background-color: #0a0b0b;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 950px) {
    flex-basis: calc((100% / 2) - 30px);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    transform: scale(1.05);
  }

  @media (any-hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }

  &__title {
    padding: 22px 0 30px;
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;
    text-align: center;
    color: #fff;
  }

  &__image {
    border-radius: 24px 24px 0 0;

    @media (max-width: 650px) {
      max-height: 220px;
      object-fit: cover;
    }
  }
}
</style>