import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function SiteLayout() {
  const { user, isAuthenticated, logout, authError } = useAuth()

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">Blog Platform</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <span className="nav-user">{user.username}</span>
              <Link to="/write">Write a post</Link>
              <button className="link-button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="nav-register" to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="page-shell">
        <Outlet />
        {authError && <p className="error-banner" role="alert">Session check failed: {authError}</p>}
      </main>
      <footer className="site-footer">Made for stories worth sharing.</footer>
    </>
  )
}
