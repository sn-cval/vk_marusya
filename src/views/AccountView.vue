<template>
  <div class="section-account">
    <div class="container">
      <h1 class="title section-account__title">Мой аккаунт</h1>
      <div class="section-account__tab">
        <router-link
          to="/account/favorites"
          class="section-account__link section-account__link_favorites"
        >
          <span class="section-account__text section-account__text_desktop">Избранные фильмы</span>
          <span class="section-account__text section-account__text_mobile">Избранное</span>
        </router-link>
        <router-link
          to="/account/profile"
          class="section-account__link section-account__link_profile"
        >
          <span class="section-account__text section-account__text_desktop"
            >Настройка аккаунта</span
          >
          <span class="section-account__text section-account__text_mobile">Настройки</span>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.section-account {
  padding: 64px 0 10px;
  overflow: hidden;

  @media (max-width: 1000px) {
    padding: 16px 0;
  }

  &__title {
    margin-bottom: 64px;

    @media (max-width: 650px) {
      margin-bottom: 40px;
    }
  }

  &__tab {
    display: flex;
    gap: 64px;
    margin-bottom: 64px;

    @media (max-width: 650px) {
      gap: 24px;
      margin-bottom: 40px;
    }
  }

  &__link {
    position: relative;
    display: block;
    padding-left: 32px;
    font-size: 24px;
    line-height: 133%;
    text-decoration: none;
    color: #fff;

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

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center;
      transform: translateY(-50%);
    }

    @media (max-width: 360px) {
      font-size: 20px;
    }

    &_favorites::before {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z' fill='white' /%3E%3C/svg%3E");
    }

    &_profile::before {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='21' viewBox='0 0 16 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z' fill='white' /%3E%3C/svg%3E");
    }
  }

  &__text {
    &_desktop {
      @media (max-width: 650px) {
        display: none;
      }
    }

    &_mobile {
      display: none;

      @media (max-width: 650px) {
        display: inline;
      }
    }
  }
}
</style>