import { useState } from 'react'
import RegisterModal from '../components/RegisterModal'

const SignIn = () => {

  const [show, setShow] = useState(false)

  return (
    <div className="signin-page">
      <h1>Sign In</h1>
      {/* <div className='login-wrapper'>
        <form className='login-form'> */}
{/* Username */}
          {/* <div className='form-item'>
            <label><b>Username: </b><input className='reg-box' type='text' id='user_name' name='user_name'></input>
            </label>
            </div> */}
{/* Password */}
            {/* <div className='form-item'>
            <label><b>Password: </b></label><input className='reg-box' type='password' id='pswd' name='pswd'></input>
            </div>
        </form>
      </div> */}
{/* REGISTER BUTTON */}
      <button className='open-modal' onClick={() => setShow(true)}>Register</button>
      <RegisterModal setShow={setShow} show={show} onClose={() => setShow(false)}/>
    </div>
  )
}

export default SignIn