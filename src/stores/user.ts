import { defineStore } from 'pinia'
import { getErrorFromResponse } from '@/utils/get-error'
import { ref } from 'vue'
import type {
  GetUserPayload,
  LoginPayload,
  RegisterPayload,
  AuthResultResponse,
} from '@/types/auth'

export const useUserStore = defineStore('user', () => {
  const url: string = 'https://cinemaguide.skillbox.cc'
  const userAuth = ref<boolean>(false)
  const userProfile = ref<GetUserPayload | null>(null)

  async function loginUser(payload: LoginPayload): Promise<AuthResultResponse | null> {
    try {
      const response: Response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage = await getErrorFromResponse(response)
        const err = new Error(errorMessage) as Error & { status?: number }
        err.status = response.status
        throw err
      }

      try {
        const data = (await response.json()) as AuthResultResponse
        userAuth.value = true
        console.log(data)
        return data
      } catch {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function profileUser(): Promise<GetUserPayload | null> {
    try {
      const response: Response = await fetch(`${url}/profile`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage = await getErrorFromResponse(response)
        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as GetUserPayload
        userProfile.value = data
        return data
      } catch {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function logoutUser(): Promise<AuthResultResponse> {
    try {
      const response: Response = await fetch(`${url}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage = await getErrorFromResponse(response)
        throw new Error(errorMessage)
      }

      if (response.status === 204) {
        userAuth.value = false
        userProfile.value = null
        return { result: true }
      }

      try {
        const data = (await response.json()) as AuthResultResponse
        userAuth.value = false
        userProfile.value = null
        return data ?? { result: true }
      } catch {
        userAuth.value = false
        userProfile.value = null
        return { result: true }
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function createUser(payload: RegisterPayload): Promise<AuthResultResponse | null> {
    try {
      const response: Response = await fetch(`${url}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          email: payload.email,
          password: payload.password,
          name: payload.name,
          surname: payload.surname,
        }),
      })

      if (!response.ok) {
        const errorMessage = await getErrorFromResponse(response)
        const err = new Error(errorMessage) as Error & { status?: number }
        err.status = response.status
        throw err
      }

      try {
        const data = (await response.json()) as AuthResultResponse
        return data
      } catch {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    userAuth,
    userProfile,
    loginUser,
    profileUser,
    logoutUser,
    createUser,
  }
})
