export const createTokenManager = () => {
  let accessToken: string | null = null

  return {
    setAccessToken: (token: string) => {
      accessToken = token
    },

    getAccessToken: () => accessToken,

    clearAccessToken: () => {
      accessToken = null
    },
  }
}

export const tokenManager = createTokenManager()
