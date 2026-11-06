import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../api'
import { useAuth } from '../context/useAuth'

export default function WritePostPage() {
  const { postId } = useParams()
  const editing = Boolean(postId)
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', published: false })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!editing) return
    apiRequest(`/posts/${postId}/edit`, { token })
      .then((post) => {
        if (post.author.id !== user.id) throw new Error('You can only edit your own posts.')
        setForm({ title: post.title, content: post.content, published: post.published })
      })
      .catch((requestError) => setError(requestError.message))
  }, [editing, postId, token, user.id])

  function update(event) {
    const { name, value, checked, type } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const post = await apiRequest(editing ? `/posts/${postId}` : '/posts', {
        method: editing ? 'PUT' : 'POST',
        token,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      navigate(post.published ? `/posts/${post.id}` : '/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="editor-wrap">
      <p className="eyebrow">{editing ? 'Make it even better' : 'Your voice matters'}</p>
      <h1>{editing ? 'Edit your story' : 'Write a story'}</h1>
      {error && <p className="error-banner" role="alert">{error}</p>}
      <form className="form-stack editor-form" onSubmit={submit}>
        <label>Title
          <input name="title" maxLength={200} required value={form.title} onChange={update} />
        </label>
        <label>Content
          <textarea name="content" rows={14} required value={form.content} onChange={update} />
        </label>
        <label className="checkbox-label">
          <input name="published" type="checkbox" checked={form.published} onChange={update} />
          Publish this story
        </label>
        <button className="primary-button" disabled={busy}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Save story'}</button>
      </form>
    </section>
  )
}
