import {useNavigate} from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  return (
    <form className= "register-form">
    <label className='register-label'>First name:</label>
    <input className="user-box" type="text" id="fname" name="fname" defaultValue="John"/>
    <label>Last name:</label>
    <input className="user-box"  type="text" id="lname" name="lname" defaultValue="Doe"/>
    <label>Location:</label>
    <input className="longer-form-field user-box" type="text" id="location" name="location" defaultValue="123 Main Street, Bacon, GA 12345"/>
    <label>Username</label>
    <input className="user-box"  type="text" id="username" name="username" defaultValue="jdog"/>
    <label>Password:</label>
    <input className="user-box"  type="password" id="password" name="password"/>
    <label>Email:</label>
    <input className="longer-form-field user-box" type="email" id="email" name="email" defaultValue="schmidt@johnjacobs.com"/>
    <a href="/">
      <span></span>
      <span></span>
      <span></span>
      <span></span>Submit
    </a>
  </form>
  )
}

export default Register