<template>
  <div class="section-movies">
    <div class="container">
      <router-link class="title section-movies__title" to="/genres">{{
        getGenreMovies(genre)
      }}</router-link>
      <div class="loading" v-show="movies.isLoadingMovies"></div>
      <div class="section-movies__desc">
        <TopMovies
          v-for="(item, index) in moviesGenre"
          :key="item.id"
          :index="index"
          :card="item"
          :show-number="false"
          :show-style="true"
        />
      </div>
      <button
        type="button"
        class="btn section-movies__btn"
        v-if="hasMore"
        :disabled="isLoadingMore"
        @click="loadMore"
      >
        Показать ещё
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getGenreMovies } from '@/utils/get-genre'
import { useMovieStore } from '@/stores/movie'
import { onMounted, ref } from 'vue'
import TopMovies from '@/components/TopMovies.vue'
import type { Movie } from '@/types/film'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const movies = useMovieStore()
const arrayMovies = ref<Movie[]>([])
const moviesGenre = ref<Movie[]>([])
const hasMore = ref<boolean>(false)
const isLoadingMore = ref<boolean>(false)
const currentPage = ref<number>(0)
const initialBatchSize: number = 50
const chunkSize: number = 10
const canRequestNextBatch = ref<boolean>(true)

const route: RouteLocationNormalizedLoaded = useRoute()
const genre: string = String(route.query.genre || '')

const updateHasMore = (): void => {
  hasMore.value = arrayMovies.value.length > 0 || canRequestNextBatch.value
}

const appendChunk = (replace = false): boolean => {
  if (!arrayMovies.value.length) {
    return false
  }

  const portion = arrayMovies.value.splice(0, chunkSize)
  moviesGenre.value = replace ? portion : moviesGenre.value.concat(portion)

  return portion.length > 0
}

const fetchBatch = async (): Promise<void> => {
  const response = await movies.getMoviesByGenre(genre, initialBatchSize, currentPage.value)
  arrayMovies.value = response || []
  canRequestNextBatch.value = !!response && response.length === initialBatchSize
}

const loadInital = async (): Promise<void> => {
  currentPage.value = 0
  moviesGenre.value = []

  await fetchBatch()
  appendChunk(true)
  updateHasMore()
}

const loadMore = async (): Promise<void> => {
  if (isLoadingMore.value) {
    return
  }

  isLoadingMore.value = true

  try {
    if (appendChunk()) {
      return
    }

    if (!canRequestNextBatch.value) {
      return
    }

    currentPage.value += 1
    await fetchBatch()
    appendChunk()
  } finally {
    updateHasMore()
    isLoadingMore.value = false
  }
}

onMounted((): void => {
  loadInital()
})
</script>

<style lang="scss">
.section-movies {
  padding: 64px 0 160px;

  @media (max-width: 950px) {
    padding: 16px 0 40px;
  }

  &__title {
    display: inline-block;
    margin-bottom: 64px;
    padding-left: 56px;
    text-decoration: none;
    background-repeat: no-repeat;
    background-position: 13px 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='22' viewBox='0 0 14 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z' fill='white' /%3E%3C/svg%3E");

    @media (max-width: 650px) {
      margin-bottom: 40px;
      padding-left: 40px;
      background-position: 13px 9px;
      background-image: url("data:image/svg+xml,%3Csvg width='11' height='17' viewBox='0 0 11 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.7712 8.48531L10.3709 15.0849L8.48533 16.9705L0 8.48531L8.48533 0L10.3709 1.88561L3.7712 8.48531Z' fill='white' /%3E%3C/svg%3E");
    }
  }

  &__desc {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 64px 40px;
    margin-bottom: 64px;

    @media (max-width: 650px) {
      flex-direction: column;
      gap: 24px;
    }
  }

  &__btn {
    display: block;
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 28px;
    padding: 16px 48px;
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    color: #fff;
    background-color: #67a5eb;
    transition: background-color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      background-color: #4b97ee;
    }

    @media (any-hover: hover) {
      &:hover {
        background-color: #4b97ee;
      }
    }

    &:active {
      background-color: #217de6;
    }

    @media (max-width: 650px) {
      width: 100%;
    }
  }
}
</style>
