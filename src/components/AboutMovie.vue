<template>
  <div class="section-about">
    <div class="container">
      <h2 class="title section-about__title">О фильме</h2>
      <dl class="section-about__table">
        <div class="section-about__item" v-if="movie.language">
          <dt class="section-about__name">Язык оригинала</dt>
          <dd class="section-about__desc">
            {{ getLanguageName(movie.language) }}
          </dd>
        </div>
        <div class="section-about__item" v-if="movie.budget">
          <dt class="section-about__name">Бюджет</dt>
          <dd class="section-about__desc">{{ movie.budget }} руб.</dd>
        </div>
        <div class="section-about__item" v-if="movie.revenue">
          <dt class="section-about__name">Выручка</dt>
          <dd class="section-about__desc">{{ movie.revenue }} руб.</dd>
        </div>
        <div class="section-about__item" v-if="movie.director">
          <dt class="section-about__name">Режиссёр</dt>
          <dd class="section-about__desc">{{ movie.director }}</dd>
        </div>
        <div class="section-about__item" v-if="movie.production">
          <dt class="section-about__name">Продакшен</dt>
          <dd class="section-about__desc">{{ movie.production }}</dd>
        </div>
        <div class="section-about__item" v-if="movie.awardsSummary">
          <dt class="section-about__name">Награды</dt>
          <dd class="section-about__desc">{{ movie.awardsSummary }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLanguageName } from '@/utils/get-language'
import type { Movie } from '@/types/film'

const props = defineProps<{
  movie: Movie
}>()
</script>

<style lang="scss">
.section-about {
  padding: 20px 0 120px;

  @media (max-width: 650px) {
    padding: 32px 0;
  }

  &__title {
    margin-bottom: 64px;

    @media (max-width: 650px) {
      margin-bottom: 40px;
    }
  }

  &__item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 24px;
    max-width: 500px;
    font-weight: 400;
    font-size: 18px;
    line-height: 133%;
    color: #fff;

    @media (max-width: 650px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4;
      margin-bottom: 12px;
    }
  }

  &__name {
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    margin-right: 5px;

    @media (max-width: 650px) {
      margin-right: 0;
      font-size: 14px;
      line-height: 143%;
      color: rgba(255, 255, 255, 0.5);
    }

    &::after {
      content: '..................................................................................................................';
      position: absolute;

      @media (max-width: 650px) {
        content: '';
      }
    }
  }

  &__desc {
    max-width: 150px;
    width: 100%;

    @media (max-width: 650px) {
      max-width: 100%;
    }
  }
}
</style>