export interface GetUserPayload {
  favorites: string[]
  surname: string
  name: string
  email: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
  surname: string
}

export interface AuthResultResponse {
  result: boolean
}

export interface AuthErrorResponse {
  error: string
}
