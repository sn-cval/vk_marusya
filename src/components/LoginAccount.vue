<template>
  <div class="modal modal-login">
    <div class="block modal-login__content">
      <button class="close modal-login__close" @click="closeModalForm"></button>
      <img class="logo modal-login__logo" src="/img/logo_modal.svg" alt="Logo VK Маруся" />
      <form class="form modal-login__form" @submit.prevent="handleSubmit">
        <div class="modal-login__block">
          <input
            class="input modal-login__input"
            :class="{ input_error: errors && errors.email }"
            v-model="user.email"
            type="text"
            name="email"
            placeholder="Электронная почта"
            autocomplete="email"
            @focusin="clearErrors('email')"
          />
          <svg
            class="modal-login__icon modal-login__icon_email"
            :class="{ 'modal-login__icon_error': errors && errors.email }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-email"></use>
          </svg>
          <span v-if="errors && errors.email" class="modal-login__error">{{ errors.email }}</span>
        </div>
        <div class="modal-login__block">
          <input
            class="input modal-login__input"
            :class="{ input_error: errors && errors.password }"
            v-model="user.password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="current-password"
            @focusin="clearErrors('password')"
          />
          <svg
            class="modal-login__icon modal-login__icon_password"
            :class="{ 'modal-login__icon_error': errors && errors.password }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-password"></use>
          </svg>
          <span v-if="errors && errors.password" class="modal-login__error">{{
            errors.password
          }}</span>
        </div>
        <button class="btn modal-login__btn">Войти</button>
        <span v-if="errors && errors.api" class="modal-login__error modal-login__error_api">{{
          errors.api
        }}</span>
      </form>
      <button class="btn modal-login__registration" @click="openModalRegistration">
        Регистрация
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validate } from '@/utils/validate'
import { useUserStore } from '@/stores/user'
import type { FormFields, ValidationErrors } from '@/types/form'
import type { LoginPayload } from '@/types/auth'

interface Emits {
  (e: 'close-modal'): void
  (e: 'create-modal'): void
}

const emit = defineEmits<Emits>()

const errors = ref<ValidationErrors>({})
const userStore = useUserStore()

const user = ref<LoginPayload>({
  email: '',
  password: '',
})

const closeModalForm = (): void => {
  emit('close-modal')
}

const openModalRegistration = (): void => {
  emit('create-modal')
}

const handleSubmit = async (): Promise<void> => {
  errors.value = {}

  const payload: LoginPayload = {
    email: user.value.email,
    password: user.value.password,
  }

  errors.value = validate(payload as FormFields)
  if (Object.keys(errors.value).length) {
    return
  }
  try {
    await userStore.loginUser(payload)

    const profile = await userStore.profileUser()
    if (profile) {
      emit('close-modal')
    } else {
      throw new Error('Не удалось загрузить профиль пользователя')
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error)

    const err = error as Error & { status?: number }

    userStore.userAuth = false
    userStore.userProfile = null

    if (err.status === 400) {
      errors.value.api = 'Неверный email или пароль'
    } else {
      errors.value.api = err.message || 'Произошла ошибка при входе'
    }
  }
}

const clearErrors = (field: keyof ValidationErrors): void => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<style lang="scss">
.modal-login {
  &__form {
    margin-bottom: 24px;
  }

  &__block {
    position: relative;
  }

  &__input {
    &:focus-visible + .modal-login__icon {
      opacity: 1;
      color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover + .modal-login__icon {
        opacity: 1;
        color: #b4a9ff;
      }
    }

    &:active + .modal-login__icon {
      opacity: 1;
      color: #786bc9;
    }
  }

  &__icon {
    position: absolute;
    left: 16px;
    top: 50%;
    color: #000;
    opacity: 0.4;
    transform: translateY(-50%);
    transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &_error {
      opacity: 1;
      color: #ff7575;
    }
  }

  &__error {
    position: absolute;
    left: 52px;
    top: 5px;
    font-size: 11px;
    color: #ff7575;
    transition: color 0.3s ease-in-out;

    &_api {
      top: -15px;
      left: 10px;
    }
  }

  &__btn {
    margin-top: 12px;
    border: 1px solid transparent;
    border-radius: 28px;
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
  }

  &__registration {
    display: block;
    margin: 0 auto;
    border: none;
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    color: #000;

    &:focus {
      outline: none;
    }
  }
}
</style>