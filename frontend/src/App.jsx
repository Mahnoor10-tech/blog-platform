import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PostPage from './pages/PostPage.jsx'
import WritePostPage from './pages/WritePostPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<AuthPage mode="register" />} />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="posts/:postId" element={<PostPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="write" element={<WritePostPage />} />
          <Route path="posts/:postId/edit" element={<WritePostPage />} />
        </Route>
        <Route path="*" element={<p className="notice">Page not found.</p>} />
      </Route>
    </Routes>
  )
}

export default App
