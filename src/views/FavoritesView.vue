<template>
  <div class="loading" v-if="favourite.isLoadingFavourite"></div>
  <div v-else>
    <div class="favorites__list">
      <FavoriteMovies
        v-for="item in favouriteMovies"
        :key="item.id"
        :card="item"
        @delete-card="deleteMovie"
      />
    </div>
    <swiper class="favorites__swiper" :breakpoints="swiperBreakpoints" :auto-height="false">
      <swiper-slide class="favorites__slide" v-for="item in favouriteMovies" :key="item.id">
        <FavoriteMovies :card="item" @delete-card="deleteMovie" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import FavoriteMovies from '@/components/FavoriteMovies.vue'
import { useFavouriteStore } from '@/stores/favourite'
import { ref, onMounted } from 'vue'
import type { Movie } from '@/types/film'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { SwiperOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'

const favourite = useFavouriteStore()
const favouriteMovies = ref<Movie[]>([])

const loadFavouriteMovie = async (): Promise<void> => {
  const response = await favourite.getMovieFavourite()
  if (response) {
    favouriteMovies.value = response ?? []
  }
}

const deleteMovie = async (card: Movie): Promise<void> => {
  await favourite.removeMovieFavourite(card)
  loadFavouriteMovie()
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
  loadFavouriteMovie()
})
</script>

<style lang="scss">
.favorites {
  &__list {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    row-gap: 64px;
    column-gap: 40px;

    @media (max-width: 1000px) {
      display: none;
    }
  }

  &__swiper {
    display: none;
    overflow: visible;

    @media (max-width: 1000px) {
      display: block;
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
</style>