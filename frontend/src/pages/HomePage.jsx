import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api'

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value))
}

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest('/posts')
      .then(setPosts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <div className="hero-panel">
        <p className="eyebrow">The Blog Platform</p>
        <h1>Stories worth sharing.</h1>
        <p>Fresh ideas, thoughtful writing, and voices from our community.</p>
      </div>
      <div className="section-heading">
        <div><p className="eyebrow">From the community</p><h2>Latest stories</h2></div>
        <span>{posts.length} {posts.length === 1 ? 'story' : 'stories'}</span>
      </div>
      {loading && <p className="notice">Loading stories…</p>}
      {error && <p className="error-banner" role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="empty-state">No published stories yet. Be the first to write one.</p>
      )}
      <div className="post-grid">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <p className="post-meta">{post.author.username} <span>·</span> {formatDate(post.created_at)}</p>
            <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
            <p>{post.content.length > 150 ? `${post.content.slice(0, 150)}…` : post.content}</p>
            <Link className="read-more" to={`/posts/${post.id}`}>Read story <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  )
}
