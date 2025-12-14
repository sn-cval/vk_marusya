import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getErrorFromResponse } from '@/utils/get-error'
import type { Movie } from '@/types/film'
import type { GetUserPayload } from '@/types/auth'

type MovieIdentifier = Pick<Movie, 'id'>

export const useFavouriteStore = defineStore('favourite', () => {
  const url: string = 'https://cinemaguide.skillbox.cc'

  const isLoadingFavourite = ref<boolean>(false)

  async function getMovieFavourite(): Promise<Movie[] | null> {
    try {
      isLoadingFavourite.value = true

      const response: Response = await fetch(`${url}/favorites`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage: string = await getErrorFromResponse(response)
        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as Movie[]
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      isLoadingFavourite.value = false
    }
  }

  async function addMovieFavourite(id: number): Promise<GetUserPayload | null> {
    try {
      const response: Response = await fetch(`${url}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id: String(id),
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage: string = await getErrorFromResponse(response)
        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as GetUserPayload
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function removeMovieFavourite(item: MovieIdentifier): Promise<GetUserPayload | null> {
    try {
      const response: Response = await fetch(`${url}/favorites/${item.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessage: string = await getErrorFromResponse(response)
        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as GetUserPayload
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    isLoadingFavourite,
    getMovieFavourite,
    addMovieFavourite,
    removeMovieFavourite,
  }
})
