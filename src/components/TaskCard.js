import { useEffect, useState } from 'react'
import { GetLocation } from '../services/UserServices'

const TaskCard = (props) => {
  const [checked, setChecked] = useState(false)
  const [location, setLocation] = useState({})

  const handleChange = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    getLocation(props.locationId)
  }, [])

  const getLocation = async (id) => {
    const location = await GetLocation(id)
    setLocation(location)
  }
  const getTask = () => {}
  const getUser = () => {}
  const getCompleted = () => {}
  // console.log(checked)

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
        <a className="map-link" href={`https://${location.url}`}>
          Link to Map
        </a>
      </div>
    </div>
  )
}

export default TaskCard
