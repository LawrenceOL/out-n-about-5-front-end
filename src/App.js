import './style/App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/Auth'

import Nav from './components/Nav'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import { GetProfile } from './services/UserServices'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({})

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    console.log('check token is called')
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    console.log(user)
    setUser(user)
    getProfile(user.id)
    toggleAuthenticated(true)
    console.log(authenticated)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      console.log('token valided')
      checkToken()
    }
  }, [])

  const getProfile = async (id) => {
    const res = await GetProfile(id)
    setProfile(res)
  }

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route
            path="/signin"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />

          <Route
            path="/"
            element={<Home user={user} authenticated={authenticated} />}
          />
          {user && (
            <Route
              path="/profile"
              element={
                <Profile
                  user={user}
                  profile={profile}
                  authenticated={authenticated}
                />
              }
            />
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App
