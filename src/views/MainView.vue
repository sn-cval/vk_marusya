<template>
  <RandomMovie
    v-if="movieRandom"
    :movie="currentRandomMovie"
    :show-additional-style="false"
    @get-random="loadRandomMovie"
    @get-trailer="loadTrailerMovie"
    @open-modal-login="openModalLogin"
  />
  <div class="section-best">
    <div class="container">
      <h2 class="title section-best__title">Топ 10 фильмов</h2>
      <div class="loading" v-if="movies.isLoadingTop"></div>
      <div v-else>
        <div class="section-best__desc">
          <TopMovies
            v-for="(item, index) in moviesTop"
            :key="item.id"
            :index="index"
            :card="item"
          />
        </div>
        <swiper class="section-best__swiper" :breakpoints="swiperBreakpoints" :auto-height="false">
          <swiper-slide
            class="section-best__slide"
            v-for="(item, index) in moviesTop"
            :key="item.id"
          >
            <TopMovies :index="index" :card="item" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <TrailerMovie
    v-if="movies.isTrailerMovie && movieRandom"
    :movie="currentRandomMovie"
    @close-trailer="closeModalTrailer"
  />
</template>

<script setup lang="ts">
import RandomMovie from '@/components/RandomMovie.vue'
import TopMovies from '@/components/TopMovies.vue'
import TrailerMovie from '@/components/TrailerMovie.vue'
import type { Movie } from '@/types/film'

import { useMovieStore } from '@/stores/movie'
import { ref, onMounted, computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { SwiperOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'

const emit = defineEmits<{
  (name: 'open-modal-login'): void
}>()

const movies = useMovieStore()
const moviesTop = ref<Movie[]>([])
const movieRandom = ref<Movie | null>(null)

const currentRandomMovie = computed<Movie>(() => {
  if (!movieRandom.value) {
    throw new Error('Random movie is not loaded yet')
  }
  return movieRandom.value
})

const loadMoviesTop = async (): Promise<void> => {
  const response = await movies.getMoviesTop()
  moviesTop.value = response ?? []
}

const loadRandomMovie = async (): Promise<void> => {
  const response = await movies.getMovieRandom()
  movieRandom.value = response
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

const swiperBreakpoints: SwiperOptions['breakpoints'] = {
  320: {
    slidesPerView: 1.5,
    spaceBetween: 40,
    slidesPerGroup: 1,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 40,
    slidesPerGroup: 1,
  },
  550: {
    slidesPerView: 2.5,
    spaceBetween: 40,
    slidesPerGroup: 1,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 40,
    slidesPerGroup: 2,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 40,
    slidesPerGroup: 2,
  },
}

onMounted((): void => {
  loadRandomMovie()
  loadMoviesTop()
})
</script>

<style lang="scss">
.section-best {
  padding: 20px 0 120px;

  @media (max-width: 1000px) {
    padding: 32px 0;
    overflow: hidden;
  }

  &__title {
    font-size: 40px;
    margin-bottom: 64px;

    @media (max-width: 650px) {
      margin-bottom: 40px;
      font-size: 24px;
    }
  }

  &__desc {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 64px;
    column-gap: 40px;

    @media (max-width: 1000px) {
      display: none;
    }
  }

  &__swiper {
    display: none;

    @media (max-width: 1000px) {
      display: block;
      overflow: visible;
    }

    :deep(.swiper-wrapper) {
      align-items: stretch;
    }
  }

  &__slide {
    height: auto;
    display: flex;
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>