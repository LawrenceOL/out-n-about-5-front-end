import {useNavigate} from 'react-router-dom'
import RegisterModal from '../components/RegisterModal'
import {useState} from 'react'

const Register = () => {
  let navigate = useNavigate()

  const [show, setShow] = useState(false)

  return (
    <div>
      <button className='open-modal' onClick={() => setShow(true)}>Register</button>
      <RegisterModal show={show} onClose={() => setShow(false)}/>
    </div>
  )
}

export default Register