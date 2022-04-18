import { GetProfile, UpdateProfile } from '../services/UserServices'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  let { id } = useParams()
  const [profile, setProfile] = useState({})
  const [formStatus, setFormStatus] = useState(true)
  const [updateBtn, setUpdateBtn] = useState('Enable Update')

  useEffect(() => {
    getProfile(id)
  }, [])

  const getProfile = async (id) => {
    const res = await GetProfile(id)
    setProfile(res)
  }

  const updateProfile = async (id, data) => {
    const res = await UpdateProfile(id, data)
    getProfile(id)
  }

  const enableUpdate = (e) => {
    e.preventDefault()

    if (updateBtn === 'Update') {
      console.log(profile)
      updateProfile(id, profile)

      setFormStatus(true)
      setUpdateBtn('Enable Update')
    }

    if (formStatus) {
      setFormStatus(false)
      setUpdateBtn('Update')
    } else {
      setFormStatus(true)
    }
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form>
        <label htmlFor="userName">User Name:</label>
        <input
          onChange={handleChange}
          type="text"
          id="userName"
          name="username"
          value={profile.username}
          readOnly={formStatus}
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
          value={profile.password}
          readOnly={formStatus}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={handleChange}
          id="firstName"
          type="text"
          name="firstName"
          value={profile.firstName}
          readOnly={formStatus}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={handleChange}
          type="text"
          id="lastName"
          name="lastName"
          value={profile.lastName}
          readOnly={formStatus}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          onChange={handleChange}
          type="text"
          id="email"
          name="email"
          value={profile.email}
          readOnly={formStatus}
        />
        <label htmlFor="location">Address:</label>
        <input
          onChange={handleChange}
          type="text"
          id="location"
          name="location"
          value={profile.location}
          readOnly={formStatus}
        />
        <label htmlFor="score">Score:</label>
        <input
          onChange={handleChange}
          type="text"
          id="score"
          name="score"
          value={profile.score}
          readOnly={formStatus}
        />

        <button onClick={enableUpdate}>{updateBtn}</button>
      </form>
    </div>
  )
}

export default Profile
