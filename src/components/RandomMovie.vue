<template>
  <div class="section-random">
    <div class="loading" v-if="movies.isLoadingRandom"></div>
    <div class="container section-random__container" v-else>
      <div class="section-random__left">
        <div class="section-random__info">
          <span
            class="section-random__rating"
            :class="{
              'section-random__rating_green': movie.tmdbRating >= 7,
              'section-random__rating_orange': movie.tmdbRating >= 5 && movie.tmdbRating < 7,
              'section-random__rating_red': movie.tmdbRating < 5,
            }"
            >{{ movie.tmdbRating }}</span
          >
          <span class="section-random__year">{{ movie.releaseYear }}</span>
          <div class="section-randon__genres">
            <span class="section-random__genre" v-for="(genre, index) in movie.genres" :key="genre"
              >{{ genre + (index !== movie.genres.length - 1 ? ', ' : '') }}
            </span>
          </div>
          <span class="section-random__time">{{ getRunTime() }}</span>
        </div>
        <h1 class="section-random__title">{{ movie.title }}</h1>
        <p class="section-random__desc">{{ movie.plot }}</p>
        <div
          class="section-random__btns"
          :class="{ 'section-random__btns_row': showAdditionalStyle }"
        >
          <button
            v-if="movie.trailerUrl"
            class="btn section-random__video"
            @click="getTrailerMovie"
          >
            Трейлер
          </button>
          <router-link
            v-if="showAboutButton"
            :to="{ name: 'about', params: { id: String(movie.id) } }"
            class="btn section-random__about"
            >О фильме
          </router-link>
          <button
            class="btn section-random__favourite"
            aria-label="Добавить в избранное"
            @click="addFavouriteMovie"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="section-random__icon"
              v-if="!isFavouriteMovie"
            >
              <use href="#icon-favourite"></use>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" class="section-random__icon" v-else>
              <use href="#icon-favourite-active"></use>
            </svg>
          </button>
          <button
            v-if="showUpdateButton"
            class="btn section-random__update"
            aria-label="Обновить фильм"
            @click="getRandomMovie"
          ></button>
        </div>
      </div>
      <div class="section-random__right" v-if="movie.backdropUrl">
        <img class="section-random__img" :src="movie.backdropUrl" alt="Обложка фильма" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { useFavouriteStore } from '@/stores/favourite'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, watch } from 'vue'
import type { Movie } from '@/types/film'

interface Props {
  movie: Movie
  showAboutButton?: boolean
  showUpdateButton?: boolean
  showAdditionalStyle?: boolean
}

interface Emits {
  (e: 'get-random'): void
  (e: 'get-trailer'): void
  (e: 'open-modal-login'): void
}

const props = withDefaults(defineProps<Props>(), {
  showAboutButton: true,
  showUpdateButton: true,
  showAdditionalStyle: true,
})

const emit = defineEmits<Emits>()

const movies = useMovieStore()
const favourite = useFavouriteStore()
const user = useUserStore()

const isFavouriteMovie = ref<boolean>(false)

const getRandomMovie = async (): Promise<void> => {
  emit('get-random')
}

const getTrailerMovie = (): void => {
  emit('get-trailer')
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

const addFavouriteMovie = async (): Promise<void> => {
  if (user.userAuth) {
    try {
      isFavouriteMovie.value = !isFavouriteMovie.value
      if (isFavouriteMovie.value) {
        await favourite.addMovieFavourite(props.movie.id)
      } else {
        await favourite.removeMovieFavourite(props.movie)
      }
    } catch (error) {
      console.error('Ошибка при работе с избранным:', error)
      isFavouriteMovie.value = !isFavouriteMovie.value
    }
  } else {
    emit('open-modal-login')
  }
}

const getFavouriteMovie = async (): Promise<void> => {
  if (!user.userAuth) {
    isFavouriteMovie.value = false
    return
  }

  const response = await favourite.getMovieFavourite()
  if (response && response.length > 0) {
    isFavouriteMovie.value = response.some((item: Movie) => item.id === props.movie.id)
  } else {
    isFavouriteMovie.value = false
  }
}

onMounted((): void => {
  getFavouriteMovie()
})

watch(() => user.userAuth, getFavouriteMovie)
watch(() => props.movie.id, getFavouriteMovie)
</script>

<style lang="scss">
.section-random {
  padding: 32px 0 20px;

  @media (max-width: 1000px) {
    padding: 0 0 24px;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;

    @media (max-width: 1000px) {
      flex-direction: column-reverse;
      align-items: flex-start;
      gap: 24px;
    }
  }

  &__left {
    flex-basis: 50%;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  &__right {
    flex-basis: 50%;
    border-radius: 16px;
  }

  &__img {
    display: block;
    border-radius: 16px;
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 18px;
    line-height: 133%;
    color: rgba(255, 255, 255, 0.7);

    @media (max-width: 1000px) {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 143%;
    }
  }

  &__rating {
    padding: 4px 12px 4px 32px;
    border-radius: 16px;
    font-weight: 700;
    color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z' fill='white'/%3E%3C/svg%3E");
    background-position: 12px center;
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
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 48px;
    line-height: 117%;
    color: #fff;

    @media (max-width: 650px) {
      margin-bottom: 12px;
      font-size: 24px;
      line-height: 133%;
    }
  }

  &__desc {
    margin-bottom: 60px;
    font-weight: 400;
    font-size: 24px;
    line-height: 133%;
    color: rgba(255, 255, 255, 0.7);

    @media (max-width: 1000px) {
      margin-bottom: 32px;
      font-size: 18px;
      line-height: 133%;
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    &_row {
      flex-wrap: nowrap;
    }
  }

  &__video,
  &__about {
    border-radius: 28px;
    border: 1px solid transparent;
    padding: 16px 48px;
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    color: #fff;
    transition: background-color 0.3s ease-in-out;
  }

  &__video {
    background-color: #67a5eb;

    @media (max-width: 1000px) {
      flex-basis: 100%;
    }

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
  }

  &__about {
    background-color: #393b3c;

    @media (max-width: 1000px) {
      flex-grow: 1;
      padding: 16px 40px;
      text-align: center;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      background-color: #505152;
    }

    @media (any-hover: hover) {
      &:hover {
        background-color: #505152;
      }
    }

    &:active {
      background-color: #373838;
    }
  }

  &__favourite,
  &__update {
    display: block;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    width: 68px;
    height: 56px;
    background-color: #333;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 1px solid #333;
    }
  }

  &__update {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z' fill='white'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>