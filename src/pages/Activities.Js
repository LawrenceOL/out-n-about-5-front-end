import {useNavigate} from 'react-router-dom'
import TaskCard from '../components/TaskCard'

const Activities = () => {
  let navigate = useNavigate()

  return (
    <div className="activities-page">
      <h1>Out and About 5</h1>
      <TaskCard />
    </div>
  )
}

export default Activities