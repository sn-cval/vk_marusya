<template>
  <footer class="footer">
    <div class="container">
      <ul class="footer__list">
        <li class="footer__item">
          <a class="footer__link" href="https://vk.com/" target="_blank">
            <svg class="footer__icon footer__icon_vk" width="19" height="11" viewBox="0 0 19 11">
              <use href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="https://www.youtube.com/" target="_blank">
            <svg
              class="footer__icon footer__icon_youtube"
              width="16"
              height="12"
              viewBox="0 0 16 12"
            >
              <use href="#icon-youtube"></use>
            </svg>
          </a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="https://ok.ru/" target="_blank">
            <svg class="footer__icon footer__icon_ok" width="12" height="19" viewBox="0 0 12 19">
              <use href="#icon-ok"></use>
            </svg>
          </a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="https://web.telegram.org/k/" target="_blank">
            <svg
              class="footer__icon footer__icon_telegram"
              width="17"
              height="15"
              viewBox="0 0 17 15"
            >
              <use href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 40px 0;
  margin-top: auto;

  @media (max-width: 650px) {
    padding: 24px 0;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;

    @media (max-width: 650px) {
      justify-content: flex-start;
    }
  }

  &__item {
    width: 36px;
    height: 36px;

    @media (max-width: 650px) {
      width: 24px;
      height: 24px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: #b4a9ff;

      .footer__icon {
        color: #b4a9ff;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        border-color: #b4a9ff;

        .footer__icon {
          color: #b4a9ff;
        }
      }
    }

    &:active {
      border-color: #786bc9;

      .footer__icon {
        color: #786bc9;
      }
    }
  }

  &__icon {
    color: #fff;
    transition: color 0.3s ease-in-out;

    @media (max-width: 650px) {
      &_vk {
        width: 13px;
        height: 7px;
      }

      &_youtube {
        width: 11px;
        height: 8px;
      }

      &_ok {
        width: 8px;
        height: 12px;
      }

      &_telegram {
        width: 11px;
        height: 10px;
      }
    }
  }
}
</style>