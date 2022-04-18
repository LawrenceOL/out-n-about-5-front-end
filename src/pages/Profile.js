import { GetProfile } from '../services/UserServices'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  let { id } = useParams()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    getProfile(id)
  }, [])

  const getProfile = async (id) => {
    const res = await GetProfile(id)
    setProfile(res)
  }
  console.log(profile)

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form>
        <label htmlFor="userName">User Name:</label>
        <input type="text" id="userName" value={profile.username} />
        <label htmlFor="password"></label>
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" type="text" value={profile.firstName} readOnly />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={profile.lastName} readOnly />
        <label htmlFor="email">E-mail:</label>
        <input type="text" id="email" value={profile.email} readOnly />
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={profile.location} readOnly />
      </form>
    </div>
  )
}

export default Profile
