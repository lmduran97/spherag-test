import { useMutation } from '@tanstack/react-query'

import { login } from '../api/login'
import { LoginRequest, LoginResponse } from '../types/auth.types'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login
  })
}
