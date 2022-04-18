import { GetProfile } from "../services/UserServices"
import {useState, useEffect, useParams} from 'react'

const Profile = () => {
  let { id } = useParams()
  const [profile, setProfile] = useState({})
  
  useEffect(() => {
    getProfile(id)
  },[])

  const getProfile = async (id) => {
    const res = await GetProfile(id)
    setProfile(res)
  }
  console.log(profile)

  return (
    <div className='profile-page'>
      <h1>Profile Page</h1>
      <form>
      </form>
    </div>
  )
}
      
export default Profile