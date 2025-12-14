<template>
  <div class="section-trailer">
    <div class="section-trailer__content">
      <div class="section-trailer__desc" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div v-if="loading" class="loading loading_gray"></div>

        <div
          v-if="isPaused && isHovered && !loading"
          class="section-trailer__play"
          @click="playVideo"
        >
          <img class="section-trailer__icon" src="/img/play-icon.svg" alt="Play video" />
        </div>

        <div v-if="isPaused && isHovered && !loading" class="section-trailer__name">
          <h2 class="section-trailer__title">{{ movie.title }}</h2>
        </div>
        <div
          class="section-trailer__video"
          :style="{ opacity: loading ? 0 : 1, pointerEvents: loading ? 'none' : 'auto' }"
        >
          <div id="youtube-player"></div>
        </div>
      </div>
      <button class="section-trailer__close" @click="closeTrailerMovie"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Movie } from '@/types/film'
import type { PlayerEvent, YouTubePlayerInstance, YTGlobal, PlayerOptions } from '@/types/video'

declare global {
  interface Window {
    YT?: YTGlobal
    onYouTubeIframeAPIReady?: () => void
  }
}

const props = defineProps<{
  movie: Movie
}>()

const emit = defineEmits<{
  (name: 'close-trailer'): void
}>()

const closeTrailerMovie = (): void => {
  emit('close-trailer')
}

const player = ref<YouTubePlayerInstance | null>(null)
const loading = ref<boolean>(true)
const isPaused = ref<boolean>(false)
const isHovered = ref<boolean>(false)

const extractVideoId = (url: string | null | undefined): string | null => {
  if (!url) return null
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^&]+)/,
    /youtube\.com\/embed\/([^&]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

const videoId = ref<string | null>(extractVideoId(props.movie.trailerUrl))

const playerVars: Record<string, number> = {
  autoplay: 1,
  controls: 0,
  modestbranding: 1,
  rel: 0,
  iv_load_policy: 3,
  fs: 0,
  playsinline: 1,
  disablekb: 1,
}

const initPlayer = (): void => {
  const yt = window.YT
  if (!yt || !yt.Player || !videoId.value) {
    console.error('YouTube API не загружена')
    return
  }

  try {
    const playerOptions: PlayerOptions = {
      width: '100%',
      height: '100%',
      videoId: videoId.value,
      playerVars,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    }
    player.value = new yt.Player('youtube-player', playerOptions)
  } catch (error) {
    console.error('Ошибка инициализации плеера:', error)
    loading.value = false
  }
}

const onPlayerReady = (event: PlayerEvent): void => {
  event.target.playVideo()
}

const onPlayerStateChange = (event: PlayerEvent): void => {
  const playerState = window.YT?.PlayerState
  if (!playerState) {
    return
  }

  const state = event.data

  switch (state) {
    case playerState.PLAYING:
      isPaused.value = false
      loading.value = false
      break
    case playerState.PAUSED:
      isPaused.value = true
      break
    case playerState.ENDED:
      isPaused.value = true
      break
  }
}

const onPlayerError = (event: { data: number }): void => {
  console.error('Ошибка плеера:', event.data)
  loading.value = false
}

const playVideo = (): void => {
  if (player.value?.playVideo) {
    player.value.playVideo()
    isPaused.value = false
  }
}

const onMouseEnter = (): void => {
  isHovered.value = true
}

const onMouseLeave = (): void => {
  isHovered.value = false
}

onMounted((): void => {
  if (window.YT && window.YT.Player && videoId.value) {
    initPlayer()
  } else {
    window.onYouTubeIframeAPIReady = initPlayer
  }
})
</script>

<style lang="scss">
.section-trailer {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  z-index: 999;
  overflow-y: auto;
  background-color: rgb(10, 11, 11, 0.9);

  &__content {
    position: relative;
    margin: auto;
    border: 1px solid rgba(255, 255, 255, 0.5);
    max-width: 960px;
    max-height: 540px;
    width: 100%;
    height: 100%;
    background-color: #393b3c;

    @media (max-width: 950px) {
      max-height: 450px;
      max-width: 663px;
    }

    @media (max-width: 450px) {
      max-height: 360px;
    }
  }

  &__desc {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__video {
    position: absolute;
    top: -180px;
    left: 0;
    height: calc(100% + 355px);
    width: 100%;
    transition: opacity 0.3s ease-in-out;

    @media (max-width: 950px) {
      top: -55px;
      height: calc(100% + 110px);
    }
  }

  &__name {
    position: absolute;
    left: 50%;
    bottom: 24px;
    padding: 24px 40px;
    width: calc(100% - 40px);
    z-index: 1;
    background-color: rgba(10, 11, 11, 0.5);
    transform: translateX(-50%);

    @media (max-width: 950px) {
      bottom: 0;
      width: 100%;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 133%;
    color: #fff;

    @media (max-width: 950px) {
      font-size: 18px;
    }
  }

  &__close {
    position: absolute;
    right: -72px;
    top: 0;
    width: 48px;
    height: 48px;
    border: 1px solid transparent;
    border-radius: 50%;
    outline: none;
    overflow-y: auto;
    cursor: pointer;
    background-color: #fff;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 20px;
      height: 2px;
      background-color: #000;
      transform-origin: center;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    @media (max-width: 1100px) {
      right: 16px;
      top: 16px;
      width: 32px;
      height: 32px;
    }
  }

  &__play {
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    width: 80px;
    height: 80px;
    z-index: 1;
    cursor: pointer;
    background-color: #fff;
    transform: translate(-50%, -50%);

    @media (max-width: 950px) {
      width: 64px;
      height: 64px;
    }
  }

  &__icon {
    width: 26px;
    height: 32px;
  }
}
</style>