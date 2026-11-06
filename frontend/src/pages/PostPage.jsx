import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../api'
import { useAuth } from '../context/useAuth'

export default function PostPage() {
  const { postId } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest(`/posts/${postId}`)
      .then(setPost)
      .catch((requestError) => setError(requestError.message))
  }, [postId])

  async function removePost() {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    try {
      await apiRequest(`/posts/${postId}`, { method: 'DELETE', token })
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (error) return <p className="error-banner" role="alert">{error}</p>
  if (!post) return <p className="notice">Loading story…</p>

  const isAuthor = user?.id === post.author.id
  return (
    <article className="article">
      <Link className="back-link" to="/">← All stories</Link>
      <p className="post-meta">{post.author.username} <span>·</span> {new Date(post.created_at).toLocaleDateString()}</p>
      <h1>{post.title}</h1>
      <div className="article-content">{post.content}</div>
      {isAuthor && <div className="article-actions">
        <Link className="secondary-button" to={`/posts/${post.id}/edit`}>Edit story</Link>
        <button className="danger-button" onClick={removePost}>Delete story</button>
      </div>}
    </article>
  )
}
