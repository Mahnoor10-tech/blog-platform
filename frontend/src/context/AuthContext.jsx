import { useEffect, useMemo, useState } from 'react'
import { apiRequest, loginRequest } from '../api'
import { AuthContext } from './authContext'

const TOKEN_KEY = 'blog-platform-token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!token) return

    let active = true
    apiRequest('/users/me', { token })
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch((requestError) => {
        if (!active) return
        if (requestError.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY)
          setToken(null)
          setUser(null)
        } else {
          setAuthError(requestError.message)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  async function login(email, password) {
    const result = await loginRequest(email, password)
    const currentUser = await apiRequest('/users/me', {
      token: result.access_token,
    })
    sessionStorage.setItem(TOKEN_KEY, result.access_token)
    setToken(result.access_token)
    setUser(currentUser)
  }

  async function register(userData) {
    await apiRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    await login(userData.email, userData.password)
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setLoading(false)
  }

  const value = useMemo(
    () => ({ token, user, loading, authError, isAuthenticated: Boolean(user), login, logout, register }),
    [token, user, loading, authError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
