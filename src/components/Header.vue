<template>
  <div class="header">
    <div class="container header__container">
      <div class="header__logo">
        <router-link to="/">
          <img src="/img/logo.svg" alt="Logo VK Маруся" />
        </router-link>
      </div>
      <div class="header__wrapper">
        <div class="header__menu">
          <router-link to="/" class="header__link header__link_main">Главная</router-link>
          <router-link to="/genres" class="header__link">
            <span class="header__link-text">Жанры</span>
            <svg class="header__icon" width="24" height="24" viewBox="0 0 24 24">
              <use href="#icon-genres"></use>
            </svg>
          </router-link>
        </div>
        <div class="header__search">
          <input
            @input="searchMoviesByTitle"
            v-model="title"
            name="search"
            type="text"
            placeholder="Поиск"
            class="header__input"
            :class="{ header__input_active: isInputSearchActive }"
          />
          <button
            class="header__close"
            aria-label="Закрыть меню поиска"
            :class="{ header__close_active: isInputActive }"
            @click="clearSearchResults"
          ></button>
          <div class="header__results" v-if="searchResults && searchResults.length">
            <div class="header__list">
              <SearchMovie
                v-for="item in searchResults"
                :key="item.id"
                :movie="item"
                @clear-search="clearSearchResults"
              />
            </div>
            <swiper class="header__swiper" :breakpoints="swiperBreakpoints" :auto-height="false">
              <swiper-slide class="header__slide" v-for="item in searchResults" :key="item.id">
                <SearchMovie :movie="item" @clear-search="clearSearchResults" />
              </swiper-slide>
            </swiper>
          </div>
          <button class="header__btn" @click="openInputSearch">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <use href="#icon-search"></use>
            </svg>
          </button>
        </div>
        <div class="header__account">
          <router-link
            to="/account"
            class="header__button"
            v-if="user.userAuth && user.userProfile"
            >{{ user.userProfile.name }}</router-link
          >
          <button class="header__button" v-else @click="changeModalForm">
            <span class="header__link-text">Войти</span>
            <svg class="header__icon" width="24" height="24" viewBox="0 0 24 24">
              <use href="#icon-enter"></use>
            </svg>
          </button>
        </div>
        <LoginAccount
          v-if="account.isLoadingLoginAccount"
          @close-modal="changeModalForm"
          @create-modal="openModalFormRegistration"
        />
        <CreateAccount
          v-if="account.isLoadingCreateAccount"
          @close-modal="closeModalFormCreate"
          @open-login="openModalFormRegistration"
          @open-success="modalFormSuccess"
        />
        <SuccessAccount
          v-if="account.isLoadingSuccessAccount"
          @close-modal="modalFormSuccess"
          @open-login="openModalFormLogin"
        />
      </div>
    </div>
    <div class="header__overlay" :class="{ header__overlay_active: isOverlay }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import debounce from 'lodash.debounce'
import { useMovieStore } from '@/stores/movie'
import { useAccountStore } from '@/stores/account'
import SearchMovie from '@/components/SearchMovie.vue'
import LoginAccount from '@/components/LoginAccount.vue'
import CreateAccount from '@/components/CreateAccount.vue'
import SuccessAccount from '@/components/SuccessAccount.vue'
import { useUserStore } from '@/stores/user'
import type { Movie } from '@/types/film'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { SwiperOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'

const movies = useMovieStore()
const account = useAccountStore()
const user = useUserStore()
const title = ref<string>('')
const searchResults = ref<Movie[] | null>(null)
const isInputActive = ref<boolean>(false)
const isInputSearchActive = ref<boolean>(false)
const isOverlay = ref<boolean>(false)

const searchMoviesByTitle = debounce(async (): Promise<void> => {
  if (title.value.trim() !== '') {
    const response = await movies.searchMovies(title.value)
    searchResults.value = response && response.length > 5 ? response.slice(0, 5) : response
  } else {
    searchResults.value = []
  }
}, 300)

const clearSearchResults = (): void => {
  title.value = ''
  searchResults.value = []
  if (isInputSearchActive.value || isInputActive.value || isOverlay.value) {
    isInputSearchActive.value = false
    isInputActive.value = false
    isOverlay.value = false
  }
}

const changeModalForm = (): void => {
  account.changeFormLogin()
}

const openModalFormRegistration = (): void => {
  account.changeFormLogin()
  account.changeFormRegistration()
}

const closeModalFormCreate = (): void => {
  account.changeFormRegistration()
}

const modalFormSuccess = (): void => {
  account.changeFormSuccess()
}

const openModalFormLogin = (): void => {
  account.changeFormSuccess()
  account.changeFormLogin()
}

const openLoginModal = (): void => {
  account.changeFormLogin()
}

const openInputSearch = (): void => {
  isInputSearchActive.value = true
  isInputActive.value = true
  isOverlay.value = true
}

const swiperBreakpoints: SwiperOptions['breakpoints'] = {
  320: {
    slidesPerView: 1.5,
    spaceBetween: 16,
    slidesPerGroup: 1,
  },
  480: {
    slidesPerView: 1.8,
    spaceBetween: 16,
    slidesPerGroup: 1,
  },
  768: {
    slidesPerView: 3.5,
    spaceBetween: 16,
    slidesPerGroup: 2,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 16,
    slidesPerGroup: 2,
  },
}

const handleResize = (): void => {
  if (window.innerWidth > 1000) {
    isOverlay.value = false
    isInputSearchActive.value = false
    if (title.value.trim() === '') {
      isInputActive.value = false
    }
  } else if (window.innerWidth < 1000) {
    if (title.value.trim() !== '') {
      isInputActive.value = true
      isInputSearchActive.value = true
      isOverlay.value = true
    }
  }
}

defineExpose({
  openLoginModal,
})

onMounted((): void => {
  window.addEventListener('resize', handleResize)
})

watch(title, (): void => {
  if ((title.value.trim() !== '' && !isInputSearchActive.value) || isInputSearchActive.value) {
    isInputActive.value = true
  } else {
    isInputActive.value = false
  }
})

watch(
  searchResults,
  (newResults: Movie[] | null): void => {
    if (newResults && newResults.length) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
.header {
  padding-top: 24px;
  padding-bottom: 24px;

  @media (max-width: 1000px) {
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;

    @media (max-width: 360px) {
      gap: 50px;
    }
  }

  &__logo {
    max-width: 144px;
    width: 100%;
    height: 100%;
    cursor: pointer;

    @media (max-width: 1000px) {
      flex-shrink: 0;
      max-width: 80.5px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;

    @media (max-width: 1000px) {
      justify-content: flex-end;
      gap: 20px;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  &__link {
    display: block;
    font-size: 16px;
    font-size: 24px;
    line-height: 133%;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover {
        color: #b4a9ff;
      }
    }

    &:active {
      color: #786bc9;
    }

    &.router-link-active {
      border-bottom: 1.5px solid #dc5dfc;
    }

    &-text,
    &_main {
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }

  &__search {
    position: relative;
    flex-grow: 1;

    @media (max-width: 1000px) {
      position: static;
      flex-grow: 0;
    }
  }

  &__input {
    position: relative;
    display: block;
    border: 1px solid transparent;
    width: 100%;
    height: 100%;
    max-height: 48px;
    border-radius: 8px;
    padding: 12px 16px 12px 52px;
    font-size: 18px;
    line-height: 133%;
    color: #fff;
    background-color: #393b3c;
    background-image: url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.3591 16.6168L22.6418 20.8995L21.2276 22.3137L16.9449 18.031C15.405 19.263 13.4521 20 11.3281 20C6.36013 20 2.32812 15.968 2.32812 11C2.32812 6.032 6.36013 2 11.3281 2C16.2961 2 20.3281 6.032 20.3281 11C20.3281 13.124 19.5911 15.0769 18.3591 16.6168ZM16.3528 15.8748C17.5756 14.6146 18.3281 12.8956 18.3281 11C18.3281 7.1325 15.1956 4 11.3281 4C7.46062 4 4.32812 7.1325 4.32812 11C4.32812 14.8675 7.46062 18 11.3281 18C13.2237 18 14.9427 17.2475 16.2029 16.0247L16.3528 15.8748Z' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 16px 50%;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover {
        border-color: #b4a9ff;
      }
    }

    &:active {
      border-color: #786bc9;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 1000px) {
      position: absolute;
      right: 15px;
      top: 5px;
      width: calc(100vw - 37px);
      height: 56px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

      &_active {
        z-index: 10;
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
      }
    }
  }

  &__close {
    position: absolute;
    right: 21px;
    top: 50%;
    display: none;
    border: none;
    width: 12px;
    height: 12px;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    transform: translateY(-50%);

    &:focus {
      outline: none;
    }

    &:focus-visible {
      &::after,
      &::before {
        background-color: #b4a9ff;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        &::after,
        &::before {
          background-color: #b4a9ff;
        }
      }
    }

    &:active {
      &::after,
      &::before {
        background-color: #786bc9;
      }
    }

    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      transition: background-color 0.3s ease-in-out;

      @media (max-width: 1000px) {
        background-color: rgba(255, 255, 255);
      }
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }

    &_active {
      display: block;
    }

    @media (max-width: 1000px) {
      right: 30px;
      z-index: 10;
    }
  }

  &__button {
    margin-left: 40px;
    border: none;
    font-size: 16px;
    font-size: 24px;
    line-height: 133%;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    background-color: transparent;
    outline: none;
    transition: color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover {
        color: #b4a9ff;
      }
    }

    &:active {
      color: #786bc9;
    }

    &.router-link-active {
      border-bottom: 1.5px solid #dc5dfc;
    }

    @media (max-width: 1000px) {
      margin-left: 0;
    }

    @media (max-width: 360px) {
      font-size: 20px;
    }
  }

  &__results {
    position: absolute;
    right: 0;
    top: 59px;
    z-index: 10;
    border-radius: 8px;
    padding: 8px;
    max-width: 559px;
    width: 100%;
    overflow-y: auto;
    background-color: #393b3c;
    max-height: calc(100vh - 100px);

    @media (max-width: 1000px) {
      right: 15px;
      top: 60px;
      padding: 24px 20px;
      width: calc(100vw - 37px);
      max-height: calc(100vh - 80px);
      max-width: none;
    }
  }

  &__list {
    @media (max-width: 1000px) {
      display: none;
    }
  }

  &__icon {
    display: none;

    @media (max-width: 1000px) {
      display: block;
    }
  }

  &__btn {
    display: none;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    color: #fff;
    transition: color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover {
        color: #b4a9ff;
      }
    }

    &:active {
      color: #786bc9;
    }

    @media (max-width: 1000px) {
      display: block;
    }
  }

  &__swiper {
    display: none;

    @media (max-width: 1000px) {
      display: block;
    }
  }

  &__overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

    &_active {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }
  }
}
</style>