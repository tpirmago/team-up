import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from './pages/LoginView'
import SignUpView from './pages/SignUpView'
import CommunityView from './pages/community/CommunityView'

// DEV ONLY: bypass auth for UI testing
const DEV_BYPASS_AUTH = true


type Page = 'login' | 'signup'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<Page>('login')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  //if (loading) return null
  if (loading && !DEV_BYPASS_AUTH) return null

  //if (user) {
  if (user || DEV_BYPASS_AUTH) {
    return (
      <div className="app">
        <Header btnLabel="Log out" onBtnClick={() => signOut(auth)} />
        {/*<ProfileView />*/}
        
        <main className="content">
          <CommunityView />
        </main>

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
