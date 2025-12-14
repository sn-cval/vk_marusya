<template>
  <div class="modal modal-success">
    <div class="block modal-success__content">
      <button class="close modal-success__close" @click="closeModalSuccess"></button>
      <img class="logo modal-success__logo" src="/img/logo_modal.svg" alt="Logo VK Маруся" />
      <h2 class="modal-success__title">Регистрация завершена</h2>
      <p class="modal-success__desc">Используйте вашу электронную почту для входа</p>
      <button class="btn modal-success__btn" @click="openModalLogin">Войти</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'close-modal'): void
  (e: 'open-login'): void
}

const emit = defineEmits<Emits>()

const closeModalSuccess = (): void => {
  emit('close-modal')
}

const openModalLogin = (): void => {
  emit('open-login')
}
</script>

<style lang="scss">
.modal-success {
  &__title {
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;
    text-align: center;
    color: #000;
  }

  &__desc {
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 133%;
    text-align: center;
    color: #000;
  }

  &__btn {
    display: block;
    border: 1px solid transparent;
    border-radius: 28px;
    padding: 16px 48px;
    width: 100%;
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
  }
}
</style>