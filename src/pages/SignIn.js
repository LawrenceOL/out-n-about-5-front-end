import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterModal from '../components/RegisterModal'
import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const [formValuer, setFormValuer] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValuer({ ...formValuer, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValuer)
    setFormValuer({ username: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate(`/profile/${payload.user.id}`)
  }

  return (
    <div className="signin-page">
      <div className="signin-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="signin-title">Sign In</h1>
          {/* Username */}
          <div className="form-item">
            <input
              className="reg-box"
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              value={formValuer.username}
              placeholder="Username"
              required
            />
          </div>
          {/* Password */}
          <div className="form-item">
            <input
              className="reg-box"
              onChange={handleChange}
              type="password"
              id="passswordd"
              name="password"
              value={formValuer.password}
              placeholder="Password"
              required
            />
          </div>
          {/* Sign In Button */}
          <div>
            <button className='signin-button' disabled={!formValuer.username || !formValuer.password}>
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="register-button-wrapper">
        {/* REGISTER BUTTON */}
        <div className='register-intro'>
        <h1 className='register-title'>Welcome Traveler</h1>
        <p>Enter your info and join us for an adventure!</p>
        </div>
        <button className="open-modal" onClick={() => setShow(true)}>
          Register
        </button>
        <RegisterModal
          setShow={setShow}
          show={show}
          onClose={() => setShow(false)}
        />
      </div>
    </div>
  )
}

export default SignIn
