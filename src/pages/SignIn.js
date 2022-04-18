import { useState } from 'react'
import RegisterModal from '../components/RegisterModal'

const SignIn = () => {

  const [show, setShow] = useState(false)

  return (
    <div className="signin-page">
      <div className='signin-wrapper'>
        <form className='login-form'>
        <h1 className='signin-title'>Sign In</h1>
{/* Username */}
          <div className='form-item'>
            <input 
            className='reg-box' type='text'
            id='user_name' name='user_name'
            placeholder='Username'/>
            </div>
{/* Password */}
            <div className='form-item'>
            <input 
            className='reg-box' type='password' 
            id='pswd'
            name='pswd' placeholder='Password'/>
            </div>
{/* Sign In Button */}
            <div className='signin-button-border'>
            <input className='signin-button' type="submit" value="Sign In"/>
            </div>
        </form> 
        </div>
      <div className='register-button-wrapper'>
{/* REGISTER BUTTON */}
      <button className='open-modal' onClick={() => setShow(true)}>Register</button>
      <RegisterModal setShow={setShow} show={show} onClose={() => setShow(false)}/>
    </div>
  </div>
  )
}

export default SignIn