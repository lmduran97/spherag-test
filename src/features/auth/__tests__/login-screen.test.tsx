import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'

import Login from '@/app/(public)/login'
import { LoginRequest, LoginResponse } from '../types/auth.types'

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    __esModule: true,
    Feather: ({ name }: { name: string }) => <Text>{name}</Text>
  }
})

jest.mock('@expo/vector-icons/AntDesign', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    __esModule: true,
    default: ({ name }: { name: string }) => <Text>{name}</Text>
  }
})

const mockReplace = jest.fn()
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace
  })
}))

const mockSetToken = jest.fn()
const mockResetToken = jest.fn()
const mockSetHasHydrated = jest.fn()
jest.mock('../store/auth.store', () => ({
  useAuthStore: jest.fn(() => ({
    token: null,
    hasHydrated: true,
    setToken: mockSetToken,
    resetToken: mockResetToken,
    setHasHydrated: mockSetHasHydrated
  }))
}))

type MutateOptions = {
  onSuccess?: (data: LoginResponse) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
}
const mockMutate = jest.fn(
  (_variables: LoginRequest, options?: MutateOptions) => {
    options?.onSuccess?.({
      accessToken: {
        token: 'fake-token',
        expiration: '2026-04-21T10:18:29Z'
      },
      refreshToken: {
        token: 'refresh-fake-token',
        expiration: '2026-04-21T10:18:29Z'
      }
    })
  }
)
jest.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: false,
    error: null
  })
}))

describe('Login screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders username input, password input and submit button', () => {
    render(<Login />)

    expect(screen.getByTestId('username-input')).toBeTruthy()
    expect(screen.getByTestId('password-input')).toBeTruthy()
    expect(screen.getByTestId('login-button')).toBeTruthy()
  })

  it('check button is not disabled if both fields have at least one character', () => {
    render(<Login />)

    const usernameInput = screen.getByTestId('username-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('login-button')

    expect(loginButton).toBeDisabled()

    fireEvent.changeText(usernameInput, 'user')
    fireEvent.changeText(passwordInput, 'password')

    expect(loginButton).toBeEnabled()
  })

  it('check password is visible if toggle show password is pressed', () => {
    render(<Login />)

    const passwordInput = screen.getByTestId('password-input')
    const toggleShowPasswordButton = screen.getByTestId(
      'toggle-show-password-button'
    )

    expect(passwordInput.props.secureTextEntry).toBe(true)
    fireEvent.press(toggleShowPasswordButton)
    expect(passwordInput.props.secureTextEntry).toBe(false)
  })

  it('calls mutate with credentials and handle login with navigation', async () => {
    render(<Login />)

    const usernameInput = screen.getByTestId('username-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('login-button')

    fireEvent.changeText(usernameInput, 'user')
    fireEvent.changeText(passwordInput, 'password')

    fireEvent.press(loginButton)

    expect(mockMutate).toHaveBeenCalledWith(
      {
        username: 'user',
        password: 'password'
      },
      expect.objectContaining({
        onSuccess: expect.any(Function)
      })
    )

    expect(mockSetToken).toHaveBeenCalledWith('fake-token')
  })
})
