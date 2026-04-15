export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: {
    token: string
    expiration: string
  }
  refreshToken: {
    token: string
    expiration: string
  }
}
