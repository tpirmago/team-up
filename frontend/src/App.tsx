import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'
import type { SidebarItem } from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from './pages/LoginView'
import SignUpView from './pages/SignUpView'
import DashboardView from './pages/DashboardView'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

type Page = 'login' | 'signup'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<Page>('login')
  const [activeNav, setActiveNav] = useState<SidebarItem>('dashboard')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      setUser(firebaseUser)
      setLoading(false)

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken()
          const res = await fetch(`${apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            const data = await res.json()
            setUsername(data.username)
          }
        } catch {
          /* ignore — fall back to default greeting */
        }
      } else {
        setUsername(null)
      }
    })
    return unsubscribe
  }, [])

  // DEV ONLY: bypass auth for UI testing
  const DEV_BYPASS_AUTH = false

  if (DEV_BYPASS_AUTH) {
    return (
      <div className="app">
        <Header btnLabel="Log out" onBtnClick={() => signOut(auth)} onLogoClick={() => setActiveNav('dashboard')} />
        {/* <NotificationsView /> */}
        <DashboardView activeNav={activeNav} onNavigate={setActiveNav} />
        <Footer />
      </div>
    )
  }

  if (loading) return null

  if (user) {
    return (
      <div className="app">
        <Header btnLabel="Log out" onBtnClick={() => signOut(auth)} onLogoClick={() => setActiveNav('dashboard')} />
        <DashboardView username={username ?? undefined} activeNav={activeNav} onNavigate={setActiveNav} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Header
        btnLabel={page === 'login' ? 'Sign up' : 'Log in'}
        onBtnClick={() => setPage(page === 'login' ? 'signup' : 'login')}
      />
      <main className="content">
        {page === 'login'
          ? <LoginView onSignUp={() => setPage('signup')} />
          : <SignUpView onLogIn={() => setPage('login')} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
