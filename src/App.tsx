import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from './pages/LoginView'
import SignUpView from './pages/SignUpView'
import ProfileView from './pages/ProfileView'

type Page = 'login' | 'signup' | 'profile'

function App() {

  const loggedIn = true
  const [page, setPage] = useState<Page>('login')

  return (
    <div className="app">
      <Header
        btnLabel={page === 'login' ? 'Sign up' : 'Log in'}
        onBtnClick={() => setPage(page === 'login' ? 'signup' : 'login')}
      />
      <MainView loggedIn={loggedIn} page={page} setPage={setPage}/>
      <Footer />
    </div>
  )
}

function MainView({page, setPage, loggedIn}) {
  if (!loggedIn) {
    return (<main className="content">
      {page === 'login'
        ? <LoginView onSignUp={() => setPage('signup')} />
        : <SignUpView onLogIn={() => setPage('login')} />}
    </main>
    )
  }
  return <ProfileView />
}

export default App
