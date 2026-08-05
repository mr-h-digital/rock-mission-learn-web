import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

// GitHub Pages serves 404 for deep links; 404.html redirects to /?redirect=...
// and we restore the original SPA path before React Router initializes.
const redirectParam = new URLSearchParams(window.location.search).get('redirect')
if (redirectParam && redirectParam.startsWith('/')) {
  window.history.replaceState(null, '', redirectParam)
}

const baseUrl = import.meta.env.BASE_URL
const basename = baseUrl === '/' ? undefined : baseUrl.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
