import {useNavigate} from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  return (
    <form className= "register-form">
    <label className='register-label'>First name:</label>
    <input type="text" id="fname" name="fname" defaultValue="John"/>
    <label>Last name:</label>
    <input type="text" id="lname" name="lname" defaultValue="Doe"/>
    <label>Location:</label>
    <input className="longer-form-field" type="text" id="location" name="location" defaultValue="123 Main Street, Bacon, GA 12345"/>
    <label>Username</label>
    <input type="text" id="username" name="username" defaultValue="jdog"/>
    <label>Password:</label>
    <input type="password" id="password" name="password"/>
    <label>Email:</label>
    <input className="longer-form-field" type="email" id="email" name="email" defaultValue="schmidt@johnjacobs.com"/>
    <br/>
    <input className="submit-registration" type="submit" value="Submit"/>
  </form>
  )
}

export default Register