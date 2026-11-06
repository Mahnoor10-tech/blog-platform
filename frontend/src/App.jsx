import './App.css'

function App() {
  return (
    <main className="app">
      <header className="site-header">
        <a className="brand" href="/">
          Blog Platform
        </a>
        <nav aria-label="Main navigation">
          <span>Home</span>
          <span>Login</span>
          <span>Register</span>
        </nav>
      </header>

      <section className="welcome">
        <p className="eyebrow">A place for your ideas</p>
        <h1>Stories worth sharing.</h1>
        <p>
          The blog is getting ready. Next, we will connect registration and
          login to the API.
        </p>
      </section>
    </main>
  )
}

export default App
