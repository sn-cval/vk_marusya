<template>
  <div class="card-favorites">
    <button class="btn close card-favorites__close" @click="deleteFavoriteMovie"></button>
    <router-link
      class="card-favorites__link"
      :to="{ name: 'about', params: { id: String(card.id) } }"
    >
      <div class="card-favorites__default" v-if="!card.posterUrl">
        <h3 class="card-favorites__title">{{ card.title }}</h3>
      </div>
      <img class="card-favorites__poster" v-else :src="card.posterUrl" :alt="card.title" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/film'

const props = defineProps<{
  card: Movie
}>()

const emit = defineEmits<{
  (name: 'delete-card', card: Movie): void
}>()

const deleteFavoriteMovie = (): void => {
  const data: Movie = Object.assign({}, props.card)
  emit('delete-card', data)
}
</script>

<style lang="scss">
.card-favorites {
  position: relative;
  flex-basis: calc((100% / 5) - 32px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  min-height: 300px;
  transition: transform 0.3s ease-in-out;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    transform: scale(1.05);

    .card-favorites__close {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (any-hover: hover) {
    &:hover {
      transform: scale(1.05);

      .card-favorites__close {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  @media (max-width: 1100px) {
    flex-basis: calc((100% / 3) - 32px);
  }

  @media (max-width: 1000px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__link {
    height: 100%;
  }

  &__poster {
    display: block;
    border-radius: 16px;
    width: 100%;
    height: 100%;
  }

  &__number {
    position: absolute;
    left: -15px;
    top: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 62px;
    height: 48px;
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;
    color: #6a5dc2;
    background-color: #fff;
  }

  &__default {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__title {
    text-align: center;
    color: #fff;
  }

  &__close {
    right: -20px;
    top: -20px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border: 1px solid #000;
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>