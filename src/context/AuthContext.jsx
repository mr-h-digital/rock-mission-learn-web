import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('rm_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  function persistUser(userInfo) {
    localStorage.setItem('rm_user', JSON.stringify(userInfo))
    setUser(userInfo)
  }

  function persist(authResponse) {
    localStorage.setItem('rm_token', authResponse.token)
    const userInfo = {
      id: authResponse.userId,
      email: authResponse.email,
      displayName: authResponse.displayName,
      role: authResponse.role,
    }
    persistUser(userInfo)
  }

  async function signup(email, password, displayName) {
    const res = await api.post('/api/auth/signup', { email, password, displayName }, { auth: false })
    persist(res)
  }

  async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password }, { auth: false })
    persist(res)
  }

  async function updateProfile(payload) {
    const res = await api.patch('/api/users/me', payload)
    const userInfo = {
      id: res.userId,
      email: res.email,
      displayName: res.displayName,
      role: res.role,
    }
    persistUser(userInfo)
    return res
  }

  function logout() {
    localStorage.removeItem('rm_token')
    localStorage.removeItem('rm_user')
    setUser(null)
  }

  const isAdmin = user?.role === 'ADMIN'
  const isEducator = user?.role === 'EDUCATOR' || user?.role === 'ADMIN'

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, updateProfile, logout, isAdmin, isEducator }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
