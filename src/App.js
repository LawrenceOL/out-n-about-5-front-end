import './style/App.css';
import {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/Auth'

import Nav from './components/Nav'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const App = () => {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route path="/signin" element={<SignIn setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route path="/" element={<Home user={user} authenticated={authenticated}/>} />
          <Route path="/profile/:id" element={<Profile user={user} authenticated={authenticated}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
