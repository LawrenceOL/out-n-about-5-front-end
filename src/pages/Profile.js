import { GetProfile, UpdateProfile, DeleteUser } from '../services/UserServices'
import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { useNavigate, useParams } from 'react-router-dom'


const Profile = ({ user, profile, getProfile, setProfile, handleLogOut}) => {
  const [formStatus, setFormStatus] = useState(true)
  const [updateBtn, setUpdateBtn] = useState('Enable Update')
  const [updateClass, setUpdateClass] = useState('profile-input')
  const [updateAddress, setUpdateAddress] = useState('profile-address')
  const [deleteBtn, setDeleteBtn] = useState('delete-hiding')
  const { id } = useParams()
  const navigate = useNavigate()
  

  const updateProfile = async (id, data) => {
    await UpdateProfile(id, data)
    getProfile(id)
  }

  useEffect(() => {
    getProfile(id)
  }, [])

  const enableUpdate = (e) => {
    e.preventDefault()

    if (updateBtn === 'Update') {
      updateProfile(id, profile)
      setUpdateClass('profile-input')
      setUpdateAddress('profile-address')
      setDeleteBtn('delete-hiding')
      setFormStatus(true)
      setUpdateBtn('Enable Update')
    }

    if (formStatus) {
      setFormStatus(false)
      setUpdateClass('profile-input-updating')
      setUpdateAddress('profile-address-updating')
      setDeleteBtn('delete-showing')
      setUpdateBtn('Update')
    } else {
      setFormStatus(true)
    }
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleDelete = (e) => {
    DeleteUser(profile.id)
    handleLogOut()
    navigate('/')
    }
    
  return (
    <div className='delete-wrapper'>
    <div className="profile-page">
      <div className="initial-box">
        <p className="initials">
          {profile.firstName[0]}
          {profile.lastName[0]}
        </p>
      </div>
      <h1>
        {profile.firstName} {profile.lastName}
      </h1>
      <form className="profile-form">
        <label className="profile-item" htmlFor="firstName">
          First Name
          <br />
          <input
            className={updateClass}
            onChange={handleChange}
            id="firstName"
            type="text"
            name="firstName"
            value={profile.firstName}
            readOnly={formStatus}
            maxLength="35"
          />
        </label>
        <label className="profile-item hiding" htmlFor="lastName">
          Last Name
          <br />
          <input
            className={updateClass}
            onChange={handleChange}
            type="text"
            id="lastName"
            name="lastName"
            value={profile.lastName}
            readOnly={formStatus}
            maxLength="35"
          />
        </label>
        <label className="profile-item" htmlFor="email">
          E-mail
          <br />
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
        <label className="profile-item" htmlFor="location">
          Address
          <br />
          <textarea
            className={updateAddress}
            onChange={handleChange}
            id="location"
            name="location"
            value={profile.location}
            readOnly={formStatus}
          />
        </label>
        <label className="profile-item" htmlFor="score">
          Score
          <br />
          <input
            className={updateClass}
            onChange={handleChange}
            type="text"
            id="score"
            name="score"
            value={profile.score}
            readOnly
          />
        </label>
        <button className="profile-button" onClick={enableUpdate}>
          {updateBtn}
        </button>
      </form>
      <div>
      </div>
      </div>
      <button className={deleteBtn} id='delete' name='delete' onClick={handleDelete}>Delete User</button>
    </div>
  )
}

export default Profile
