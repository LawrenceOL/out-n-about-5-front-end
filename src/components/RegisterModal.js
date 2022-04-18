import axios from 'axios'
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'

const RegisterModal = (props) => {
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    location: ''
  })

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await RegisterUser({
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
      location: formValues.location
    })
    setFormValues({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      location: ''
    })
    props.show = false
  }

  const getUserId = async (pk) => {
    const res = await axios.get(`http://localhost:3001/user/pk/${pk}`)
    console.log(res.data)
  }

  getUserId(1)

  if (!props.show) {
    return null
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-x" onClick={props.onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h1 className="modal-title">Register</h1>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="form-item">
              <input
                className="reg-box"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                value={formValues.firstname}
              />
            </div>
            {/* Last Name */}
            <div className="form-item">
              <input
                className="reg-box"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                value={formValues.lastname}
              />
            </div>
            {/* Email */}
            <div className="form-item">
              <input
                className="reg-box"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formValues.email}
              />
            </div>
            {/* Username */}
            <div className="form-item">
              <input
                className="reg-box"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formValues.username}
              />
            </div>
            {/* Password */}
            <div className="form-item">
              <input
                className="reg-box"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formValues.password}
              />
            </div>
            {/* Location */}
            <div className="form-item">
              <input
                className="reg-box"
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                value={formValues.location}
              />
            </div>
            {/* Submit Button */}
            <div className="modal-footer">
              <a className="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <input className="form-submit" type="submit" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
