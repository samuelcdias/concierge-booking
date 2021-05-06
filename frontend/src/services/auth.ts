export const TOKEN_KEY = "@Acesso-Token"
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => sessionStorage.getItem(TOKEN_KEY)

interface userData {
  id: number,
  name: string,
  username: string,
  admin: boolean,
  iat: Date, 
  exp: Date,
  token: string,
}

export const login = (token: userData ) => {
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  return '/home'
};