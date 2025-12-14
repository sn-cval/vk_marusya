import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const isLoadingLoginAccount = ref<boolean>(false)
  const isLoadingCreateAccount = ref<boolean>(false)
  const isLoadingSuccessAccount = ref<boolean>(false)

  function changeFormLogin(): void {
    isLoadingLoginAccount.value = !isLoadingLoginAccount.value
  }

  function changeFormRegistration(): void {
    isLoadingCreateAccount.value = !isLoadingCreateAccount.value
  }

  function changeFormSuccess(): void {
    isLoadingSuccessAccount.value = !isLoadingSuccessAccount.value
  }

  return {
    isLoadingLoginAccount,
    isLoadingCreateAccount,
    isLoadingSuccessAccount,
    changeFormLogin,
    changeFormRegistration,
    changeFormSuccess,
  }
})
