interface ErrorResponseData {
  '*result*'?: boolean
  error?: string
  message?: string
  errors?: string[]
}

export async function getErrorFromResponse(response: Response): Promise<string> {
  let responseText: string = ''
  try {
    responseText = await response.text()
  } catch {
    responseText = ''
  }

  if (!responseText) {
    return `Ошибка сервера: код ${response.status}`
  }

  try {
    const responseData = JSON.parse(responseText) as ErrorResponseData

    if (responseData['*result*'] === false) {
      return 'Неверный email или пароль'
    }

    if (responseData.error && typeof responseData.error === 'string') {
      return responseData.error
    }

    if (responseData.message && typeof responseData.message === 'string') {
      return responseData.message
    }

    if (Array.isArray(responseData.errors)) {
      return responseData.errors.join(', ')
    }

    return responseText
  } catch {
    return responseText
  }
}
