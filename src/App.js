import './style/App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/Auth'

import Nav from './components/Nav'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import { GetProfile } from './services/UserServices'
import Activities from './pages/Activities'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    location: '',
    username: '',
    passwordDigest: '',
    email: '',
    activityList: null,
    score: '',
    createdAt: '',
    updatedAt: ''
  })

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
    getProfile(user.id)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
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
        profile={profile}
        // userid={id}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          {profile.id &&
          <Route
            path="/activity/:id"
            element={
              <Home
                user={user}
                profile={profile}
                authenticated={authenticated}
              />
            }
          />
          }
          <Route
            path="/profile/:id"
            element={
              <Profile
                user={user}
                profile={profile}
                getProfile={getProfile}
                setProfile={setProfile}
                authenticated={authenticated}
                handleLogOut={handleLogOut}
              />
            }
          />

        </Routes>
      </main>
    </div>
  )
}

export default App
