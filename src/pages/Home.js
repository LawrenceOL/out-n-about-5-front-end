import {useNavigate} from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
    </div>
  )
}

export default Home