<template>
  <router-link
    class="card-best"
    :class="{ 'card-best__set': showStyle }"
    :to="{ name: 'about', params: { id: String(card.id) } }"
  >
    <span class="card-best__number" v-if="showNumber">{{ index + 1 }}</span>
    <div class="card-best__default" v-if="!card.posterUrl">
      <h3 class="card-best__title">{{ card.title }}</h3>
    </div>
    <img class="card-best__poster" v-else :src="card.posterUrl" :alt="card.title" />
  </router-link>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/film'

interface Props {
  card: Movie
  index: number
  showNumber?: boolean
  showStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showNumber: true,
  showStyle: false,
})
</script>

<style lang="scss">
.card-best {
  position: relative;
  flex-basis: calc((100% / 5) - 32px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1000px) {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    transform: scale(1.05);

    .card-best__close {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (any-hover: hover) {
    &:hover {
      transform: scale(1.05);

      .card-best__close {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__set {
    @media (max-width: 1000px) {
      align-items: flex-start;
      flex-basis: calc((100% / 3) - 32px);
      flex-grow: 0;
    }

    @media (max-width: 950px) {
      align-items: flex-start;
      flex-basis: calc((100% / 2) - 32px);
      flex-grow: 0;
    }
  }

  &__poster {
    display: block;
    border-radius: 16px;
    width: 100%;
    height: 100%;

    @media (max-width: 1000px) {
      min-height: 315px;
    }
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

    @media (max-width: 1000px) {
      top: -10px;
      left: -10px;
    }
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