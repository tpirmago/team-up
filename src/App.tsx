import './App.css'
import Navbar from './components/Navbar'
import LoginView from './pages/LoginView'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <LoginView />
      </main>
      <footer className="footer">© 2024 TeamUp</footer>
    </div>
  )
}

export default App
