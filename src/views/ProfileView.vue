<template>
  <div class="profile">
    <div class="profile__desc" v-if="user.userProfile">
      <div class="profile__item">
        <div class="profile__left profile__left_name">{{ getInitialsProfile }}</div>
        <div class="profile__right">
          <span class="profile__title">Имя Фамилия</span>
          <span class="profile__content">{{
            user.userProfile.name + ' ' + user.userProfile.surname
          }}</span>
        </div>
      </div>
      <div class="profile__item">
        <div class="profile__left profile__left_email"></div>
        <div class="profile__right">
          <span class="profile__title">Электронная почта</span>
          <span class="profile__content">{{ user.userProfile.email }}</span>
        </div>
      </div>
    </div>
    <button class="btn profile__btn" @click="logoutProfile">Выйти из аккаунта</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { Router } from 'vue-router'

const router: Router = useRouter()
const user = useUserStore()

const getInitialsProfile = computed<string>(() => {
  if (!user.userProfile) {
    return ''
  }

  const nameInitial = user.userProfile.name?.substring(0, 1) ?? ''
  const surnameInitial = user.userProfile.surname?.substring(0, 1) ?? ''

  return `${nameInitial}${surnameInitial}`.trim()
})

const loadProfileUser = async (): Promise<void> => {
  await user.profileUser()
}

const logoutProfile = async (): Promise<void> => {
  try {
    await user.logoutUser()
    if (!user.userAuth) {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
    user.userAuth = false
    user.userProfile = null
    router.push('/')
  }
}

onMounted((): void => {
  loadProfileUser()
})
</script>

<style lang="scss">
.profile {
  &__desc {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 64px;

    @media (max-width: 650px) {
      margin-bottom: 40px;
    }
  }

  &__item {
    display: flex;
    gap: 16px;
  }

  &__left {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.5);

    @media (max-width: 950px) {
      width: 48px;
      height: 48px;
    }

    &_email {
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z' fill='white' /%3E%3C/svg%3E");
    }

    &_name {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 24px;
      line-height: 133%;
      color: #fff;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: #fff;
  }

  &__title {
    font-size: 18px;
    line-height: 133%;

    @media (max-width: 650px) {
      font-size: 14px;
      line-height: 143%;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__content {
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;

    @media (max-width: 650px) {
      font-size: 18px;
    }
  }

  &__btn {
    border-radius: 28px;
    border: 1px solid transparent;
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