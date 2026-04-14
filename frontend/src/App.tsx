import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from './pages/LoginView'
import SignUpView from './pages/SignUpView'
import Navbar from './components/Navbar'
import ProfileView from './pages/ProfileView'

type Page = 'login' | 'signup'

function App() {
  const [user, setUser] = useState<any>({ displayName: 'Username', email: 'testi@koulu.fi' })
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<Page>('login')

  if (loading) return null

  if (user) {
    return (
      <div className="app-container">
        <Header btnLabel="Log out" onBtnClick={() => setUser(null)} />
        
        <div className="main-layout">
          <Navbar /> 
          <main className="content-area">
             <div className="dashboard-header">
                <h1>Welcome back, {user.displayName || 'User'}!</h1>
                <button className="btn-primary">Find New Project</button>
             </div>
             
             <div className="dashboard-grid">
                <ProfileView />
             </div>
          </main>
        </div>
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