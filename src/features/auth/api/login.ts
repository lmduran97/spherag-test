import { LoginRequest, LoginResponse } from '../types/auth.types'

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('https://api.spherag.com/Authentication/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    let errorMessage = 'Error al iniciar sesión'

    try {
      const errorData = await response.json()
      console.log(errorData)
      errorMessage = errorData.message || errorMessage
    } catch {
      // We couldn't parse the error response, so we'll use the default error message
    }

    throw new Error(errorMessage)
  }

  return response.json()
}
