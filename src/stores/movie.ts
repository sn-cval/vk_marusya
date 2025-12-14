import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie } from '@/types/film'

export const useMovieStore = defineStore('movie', () => {
  const url: string = 'https://cinemaguide.skillbox.cc'
  const isLoadingTop = ref<boolean>(false)
  const isLoadingRandom = ref<boolean>(false)
  const isTrailerMovie = ref<boolean>(false)
  const isLoadingGenres = ref<boolean>(false)
  const isLoadingMovies = ref<boolean>(false)

  function changeTrailerMovie(): void {
    isTrailerMovie.value = !isTrailerMovie.value
  }

  async function getMovieRandom(): Promise<Movie | null> {
    try {
      isLoadingRandom.value = true

      const response: Response = await fetch(`${url}/movie/random`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as Movie
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      isLoadingRandom.value = false
    }
  }

  async function getMoviesTop(): Promise<Movie[] | null> {
    try {
      isLoadingTop.value = true

      const response: Response = await fetch(`${url}/movie/top10`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

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
      isLoadingTop.value = false
    }
  }

  async function getMoviesID(id: number): Promise<Movie | null> {
    try {
      const response: Response = await fetch(`${url}/movie/${id}`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as Movie
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function getListGenres(): Promise<string[] | null> {
    try {
      isLoadingGenres.value = true

      const response: Response = await fetch(`${url}/movie/genres`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as string[]
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      isLoadingGenres.value = false
    }
  }

  async function getMoviesByGenre(
    genre: string,
    count: number = 50,
    page: number = 0,
    silent: boolean = false,
  ): Promise<Movie[] | null> {
    try {
      if (!silent) isLoadingMovies.value = true

      const params = new URLSearchParams()
      if (genre) params.append('genre', genre)
      params.append('count', count.toString())
      params.append('page', page.toString())

      const response: Response = await fetch(`${url}/movie?${params}`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

        throw new Error(errorMessage)
      }

      try {
        const data = (await response.json()) as Movie[]
        if (!silent) isLoadingMovies.value = false
        return data
      } catch (error) {
        return null
      }
    } catch (error) {
      console.log(error)
      if (!silent) isLoadingMovies.value = false
      throw error
    }
  }

  async function searchMovies(title: string): Promise<Movie[] | null> {
    try {
      const params = new URLSearchParams()
      if (title) params.append('title', title)

      const response: Response = await fetch(`${url}/movie?${params}`, {
        method: 'GET',
      })

      if (!response.ok) {
        let errorMessage: string = `HTTP error! status: ${response.status}`

        try {
          const errorData = (await response.json()) as { message?: string }
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = (await response.text()) || errorMessage
        }

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
    }
  }

  return {
    getMovieRandom,
    getMoviesTop,
    isLoadingTop,
    isLoadingRandom,
    isLoadingGenres,
    isLoadingMovies,
    getMoviesID,
    isTrailerMovie,
    changeTrailerMovie,
    getListGenres,
    getMoviesByGenre,
    searchMovies,
  }
})
