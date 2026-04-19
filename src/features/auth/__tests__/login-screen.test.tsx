import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

import Login from '@/app/(public)/login'

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

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn()
  }
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

jest.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    mutate: jest.fn(),
    isPending: false,
    error: null
  })
}))

describe('Login screen', () => {
  it('renders username input, password input and submit button', () => {
    render(<Login />)

    expect(screen.getByTestId('username-input')).toBeTruthy()
    expect(screen.getByTestId('password-input')).toBeTruthy()
    expect(screen.getByTestId('login-button')).toBeTruthy()
  })
})
