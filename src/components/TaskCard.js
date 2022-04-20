import { useEffect, useState } from 'react'
import {
  GetLocation,
  GetOneActivity,
  UpdateActivity
} from '../services/UserServices'

const TaskCard = (props) => {
  const [checked, setChecked] = useState(false)
  const [location, setLocation] = useState({
    name: '',
    url: '',
    gps: {},
    category: '',
    taskId: ''
  })
  const [complete, setComplete] = useState(false)

  const handleChange = (e) => {
    setChecked(!checked)
  }

  useEffect(() => {
    getLocation(props.locationId)
    getCompleted(props.activityId)
    updateActivity(props.activityId, { completed: checked })
  }, [checked])

  const getLocation = async (id) => {
    const location = await GetLocation(id)
    setLocation(location)
  }

  const updateActivity = async (id, data) => {
    const res = await UpdateActivity(id, data)
    console.log(res)
  }
  const getTask = () => {}
  const getUser = () => {}
  const getCompleted = async (id) => {
    const activity = await GetOneActivity(id)
    console.log(activity)
    setComplete(activity)
  }
  // console.log(checked)
  console.log(location.gps.lat)

  return (
    <div className="card">
      <img
        className="card-image"
        src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"
        alt="location"
      />
      <div className="card-container">
        <h4 className="card-name">{location.name}</h4>
        <p className="card-des card-b">{location.category}</p>
        <form>
          <label htmlFor="checkin">Check In:</label>
          <input
            className="card-checkin card-b"
            type="checkbox"
            id="checkin"
            name="checkin"
            checked={checked}
            onChange={handleChange}
          />
        </form>
        <div></div>

        <p>Lat: {location.gps.lat}</p>
        <p>Lon: {location.gps.lon}</p>

        <p>locationId:{location.id}</p>
        <p>activityId:{props.activityId}</p>
        <a className="map-link" href={`https://${location.url}`}>
          Link to Map
        </a>
      </div>
    </div>
  )
}

export default TaskCard
