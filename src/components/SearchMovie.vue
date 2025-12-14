<template>
  <router-link
    class="search__content"
    :to="{ name: 'about', params: { id: String(movie.id) } }"
    @click="clearSearch"
  >
    <div class="search__left">
      <img class="search__img" v-if="movie.posterUrl" :src="movie.posterUrl" alt="Обложка фильма" />
    </div>
    <div class="search__right">
      <div class="search__info">
        <span
          class="search__rating"
          :class="{
            search__rating_green: movie.tmdbRating >= 7,
            search__rating_orange: movie.tmdbRating >= 5 && movie.tmdbRating < 7,
            search__rating_red: movie.tmdbRating < 5,
          }"
          >{{ movie.tmdbRating }}</span
        >
        <span class="search__year">{{ movie.releaseYear }}</span>
        <div class="section-randon__genres">
          <span class="search__genre" v-for="(genre, index) in movie.genres" :key="genre"
            >{{ genre + (index !== movie.genres.length - 1 ? ', ' : '') }}
          </span>
        </div>
        <span class="search__time">{{ getRunTime() }}</span>
      </div>
      <h2 class="search__title">{{ movie.title }}</h2>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/film'

const props = defineProps<{
  movie: Movie
}>()

const emit = defineEmits<{
  (name: 'clear-search'): void
}>()

const clearSearch = (): void => {
  emit('clear-search')
}

const getRunTime = (): string => {
  if (!props.movie?.runtime) return 'Не указано'

  if (props.movie.runtime < 60) {
    return `${props.movie.runtime} мин`
  } else {
    const hours: number = Math.floor(props.movie.runtime / 60)
    const minutes: number = props.movie.runtime % 60
    return `${hours} ч ${minutes} мин`
  }
}
</script>

<style lang="scss">
.search {
  &__content {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    text-decoration: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: rgba(255, 255, 255, 0.5);
    }

    @media (any-hover: hover) {
      &:hover {
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    &:active {
      border-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
    }
  }

  &__left {
    flex-shrink: 0;
    flex-basis: 40px;

    @media (max-width: 1000px) {
      max-width: 70%;
    }
  }

  &__right {
    flex-grow: 1;
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: rgba(255, 255, 255, 0.7);
  }

  &__rating {
    padding: 2px 8px 2px 22px;
    border-radius: 12px;
    font-weight: 700;
    line-height: 133%;
    color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_513_1503)'%3E%3Cpath d='M5.00041 7.60837L2.06148 9.25346L2.71786 5.95L0.245117 3.66329L3.58972 3.26673L5.00041 0.208374L6.41108 3.26673L9.75566 3.66329L7.28295 5.95L7.93933 9.25346L5.00041 7.60837Z' fill='white' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_513_1503'%3E%3Crect width='10' height='10' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    background-position: 8px center;
    background-repeat: no-repeat;

    &_green {
      background-color: #308e21;
    }

    &_orange {
      background-color: #a59400;
    }

    &_red {
      background-color: #c82020;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    color: #fff;
  }
}
</style>