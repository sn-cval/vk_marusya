<template>
  <Header ref="headerRef" />
  <router-view @open-modal-login="openModalLogin" />
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

interface HeaderExposed {
  openLoginModal: () => void
}

const headerRef = ref<HeaderExposed | null>(null)

const openModalLogin = (): void => {
  if (headerRef.value) {
    headerRef.value.openLoginModal()
  }
}
</script>


