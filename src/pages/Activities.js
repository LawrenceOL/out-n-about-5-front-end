import TaskCard from '../components/TaskCard'

const Activities = (props) => {

  return (
    <div className="activities-page">
      <h1>OUT AND ABOUT <span className='larger'>5</span></h1>
      <div className="card-pack">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      </div>
    </div>
  )
}

export default Activities
