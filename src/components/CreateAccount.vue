<template>
  <div class="modal modal-create">
    <div class="block modal-create__content">
      <button class="close modal-create__close" @click="closeModalForm"></button>
      <img class="logo modal-create__logo" src="/img/logo_modal.svg" alt="Logo VK Маруся" />
      <h2 class="modal-create__title">Регистрация</h2>
      <form class="form modal-create__form" @submit.prevent="handleSubmit">
        <div class="modal-create__block">
          <input
            class="input modal-create__input"
            :class="{ input_error: errors && errors.email }"
            v-model="user.email"
            type="text"
            name="email"
            placeholder="Электронная почта"
            autocomplete="email"
            @focusin="clearErrors('email')"
          />
          <svg
            class="modal-create__icon modal-create__icon_email"
            :class="{ 'modal-create__icon_error': errors && errors.email }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-email"></use>
          </svg>
          <span v-if="errors && errors.email" class="modal-create__error">{{ errors.email }}</span>
        </div>
        <div class="modal-create__block">
          <input
            class="input modal-create__input"
            :class="{ input_error: errors && errors.name }"
            v-model="user.name"
            type="text"
            name="name"
            placeholder="Имя"
            autocomplete="given-name"
            @focusin="clearErrors('name')"
          />
          <svg
            class="modal-create__icon modal-create__icon_name"
            :class="{ 'modal-create__icon_error': errors && errors.name }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-name"></use>
          </svg>
          <span v-if="errors && errors.name" class="modal-create__error">{{ errors.name }}</span>
        </div>
        <div class="modal-create__block">
          <input
            class="input modal-create__input"
            :class="{ input_error: errors && errors.surname }"
            v-model="user.surname"
            type="text"
            name="surname"
            placeholder="Фамилия"
            autocomplete="family-name"
            @focusin="clearErrors('surname')"
          />
          <svg
            class="modal-create__icon modal-create__icon_surname"
            :class="{ 'modal-create__icon_error': errors && errors.surname }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-name"></use>
          </svg>
          <span v-if="errors && errors.surname" class="modal-create__error">{{
            errors.surname
          }}</span>
        </div>
        <div class="modal-create__block">
          <input
            class="input modal-create__input"
            :class="{ input_error: errors && errors.password }"
            v-model="user.password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="new-password"
            @focusin="clearErrors('password')"
          />
          <svg
            class="modal-create__icon modal-create__icon_password"
            :class="{ 'modal-create__icon_error': errors && errors.password }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-password"></use>
          </svg>
          <span v-if="errors && errors.password" class="modal-create__error">{{
            errors.password
          }}</span>
        </div>
        <div class="modal-create__block">
          <input
            class="input modal-create__input"
            :class="{ input_error: errors && errors.parole }"
            v-model="user.parole"
            type="password"
            name="parole"
            placeholder="Подтвердите пароль"
            autocomplete="new-password"
            @focusin="clearErrors('parole')"
          />
          <svg
            class="modal-create__icon modal-create__icon_parole"
            :class="{ 'modal-create__icon_error': errors && errors.parole }"
            width="24"
            height="25"
            viewBox="0 0 24 25"
          >
            <use href="#icon-password"></use>
          </svg>
          <span v-if="errors && errors.parole" class="modal-create__error">{{
            errors.parole
          }}</span>
        </div>
        <button class="btn modal-create__btn">Создать аккаунт</button>
        <span v-if="errors && errors.api" class="modal-create__error modal-create__error_api">{{
          errors.api
        }}</span>
      </form>
      <button class="btn modal-create__login" @click="openModalLogin">У меня есть пароль</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validate } from '@/utils/validate'
import { useUserStore } from '@/stores/user'
import type { FormFields, ValidationErrors } from '@/types/form'
import type { RegisterPayload } from '@/types/auth'

interface Emits {
  (e: 'close-modal'): void
  (e: 'open-login'): void
  (e: 'open-success'): void
}

const emit = defineEmits<Emits>()

const userStore = useUserStore()
const errors = ref<ValidationErrors>({})
const user = ref<FormFields>({
  email: '',
  name: '',
  surname: '',
  password: '',
  parole: '',
})

const closeModalForm = (): void => {
  emit('close-modal')
}

const openModalLogin = (): void => {
  emit('open-login')
}

const handleSubmit = async (): Promise<void> => {
  errors.value = {}

  const payload: FormFields = {
    email: user.value.email,
    name: user.value.name,
    surname: user.value.surname,
    password: user.value.password,
    parole: user.value.parole,
  }

  errors.value = validate(payload)

  if (Object.keys(errors.value).length) {
    return
  }

  try {
    await userStore.createUser({
      email: user.value.email,
      password: user.value.password,
      name: user.value.name,
      surname: user.value.surname,
    } as RegisterPayload)

    emit('close-modal')
    emit('open-success')
  } catch (error) {
    const err = error as Error & { status?: number }
    const message = err.message || 'Произошла ошибка'
    errors.value.api = err.status === 409 ? 'Такой email уже зарегистрирован' : message
  }
}

const clearErrors = (field: keyof ValidationErrors): void => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<style lang="scss">
.modal-create {
  &__title {
    margin-bottom: 24px;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;
    color: #000;
  }

  &__form {
    margin-bottom: 24px;
  }

  &__block {
    position: relative;
  }

  &__input {
    &:focus-visible + .modal-create__icon {
      opacity: 1;
      color: #b4a9ff;
    }

    @media (any-hover: hover) {
      &:hover + .modal-create__icon {
        opacity: 1;
        color: #b4a9ff;
      }
    }

    &:active + .modal-create__icon {
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

  &__login {
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