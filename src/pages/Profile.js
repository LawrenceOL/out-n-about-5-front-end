import { GetProfile, UpdateProfile } from '../services/UserServices'
import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { useParams } from 'react-router-dom'

const Profile = ({ user, profile, getProfile, setProfile }) => {
  const [formStatus, setFormStatus] = useState(true)
  const [updateBtn, setUpdateBtn] = useState('Enable Update')
  const [updateClass, setUpdateClass] = useState('profile-input')
  const [updateAddress, setUpdateAddress] = useState('profile-address')
  const { id } = useParams()
  const updateProfile = async (id, data) => {
    await UpdateProfile(id, data)
    getProfile(id)
  }
  console.log(user)
  useEffect(() => {
    getProfile(id)
  }, [])

  const enableUpdate = (e) => {
    e.preventDefault()

    if (updateBtn === 'Update') {
      updateProfile(id, profile)
      setUpdateClass('profile-input')
      setUpdateAddress('profile-address')
      setFormStatus(true)
      setUpdateBtn('Enable Update')
    }

    if (formStatus) {
      setFormStatus(false)
      setUpdateClass('profile-input-updating')
      setUpdateAddress('profile-address-updating')
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
      <div className='initial-box'>
        <p className='initials'>{profile.firstName[0]}{profile.lastName[0]}
        </p>
      </div>
      <h1>{profile.firstName} {profile.lastName}</h1>
      <form className='profile-form'>
        <label
        className='profile-item' 
        htmlFor="firstName">First Name
        <br/>
        <input
        className={updateClass}
          onChange={handleChange}
          id="firstName"
          type="text"
          name="firstName"
          value={profile.firstName}
          readOnly={formStatus}
          maxlength="35"
        />
        </label>
        <label 
        className='profile-item hiding'
        htmlFor="lastName">Last Name
        <br/>
        <input
        className={updateClass}
          onChange={handleChange}
          type="text"
          id="lastName"
          name="lastName"
          value={profile.lastName}
          readOnly={formStatus}
          maxlength="35"
        />
        </label>
        <label 
        className='profile-item'
        htmlFor="email">E-mail
        <br/>
        <input 
        className={updateClass}
          onChange={handleChange}
          type="text"
          id="email"
          name="email"
          value={profile.email}
          readOnly={formStatus}
        />
        </label>
        <label 
        className='profile-item'
        htmlFor="location">Address
        <br/>
        <textarea
        className={updateAddress}
          onChange={handleChange}
          id="location"
          name="location"
          value={profile.location}
          readOnly={formStatus}
        />
        </label>
       <label
        className='profile-item'
        htmlFor="score">Score
        <br/>
        <input
        className={updateClass}
          onChange={handleChange}
          type="text"
          id="score"
          name="score"
          value={profile.score}
          readOnly={formStatus}
        />
        </label>
        <button className='profile-button' onClick={enableUpdate}>{updateBtn}</button>
      </form>
    </div>
  )
}

export default Profile
