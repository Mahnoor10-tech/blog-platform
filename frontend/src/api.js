const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'

export async function apiRequest(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (response.status === 204) return null

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const detail = body?.detail
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg).join(', ')
      : detail || `Request failed (${response.status})`
    const error = new Error(message)
    error.status = response.status
    throw error
  }
  return body
}

export function loginRequest(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  })
}
