import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function AuthPage({ mode }) {
  const registering = mode === 'register'
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (registering && form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setBusy(true)
    try {
      if (registering) {
        await register({ email: form.email, username: form.username, password: form.password })
      } else {
        await login(form.email, form.password)
      }
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <p className="eyebrow">{registering ? 'Join the community' : 'Welcome back'}</p>
        <h1>{registering ? 'Create your account' : 'Sign in'}</h1>
        <p className="form-intro">{registering ? 'Start sharing your stories today.' : 'Pick up where you left off.'}</p>
        {error && <p className="error-banner" role="alert">{error}</p>}
        <form className="form-stack" onSubmit={submit}>
          <label>Email
            <input name="email" type="email" autoComplete="email" required value={form.email} onChange={update} />
          </label>
          {registering && <label>Username
            <input name="username" autoComplete="username" minLength={3} maxLength={50} required value={form.username} onChange={update} />
          </label>}
          <label>Password
            <input name="password" type="password" autoComplete={registering ? 'new-password' : 'current-password'} minLength={8} required value={form.password} onChange={update} />
          </label>
          {registering && <label>Confirm password
            <input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required value={form.confirmPassword} onChange={update} />
          </label>}
          <button className="primary-button" disabled={busy}>
            {busy ? 'Please wait…' : registering ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p className="switch-auth">
          {registering ? 'Already have an account? ' : 'New here? '}
          <Link to={registering ? '/login' : '/register'}>{registering ? 'Sign in' : 'Create an account'}</Link>
        </p>
      </div>
    </section>
  )
}
