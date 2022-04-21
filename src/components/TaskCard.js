import { useEffect, useState } from 'react'
import {
  GetLocation,
  GetOneActivity,
  UpdateActivity,
  CreateLocation,
  pushToActivity,
  DeleteLocation
} from '../services/UserServices'

const TaskCard = (props) => {
  const [checked, setChecked] = useState(false)
  const [location, setLocation] = useState('')
  const [activityData, setActivityData] = useState({
    locationId: '',
    userId: props.profile.id,
    taskId: props.profile.id,
    completed: checked
  })
  // const [location, setLocation] = useState({
  //   name: '',
  //   url: '',
  //   gps: {},
  //   category: '',
  //   taskId: ''
  // })
  // const [complete, setComplete] = useState(false)

  const handleChange = (e) => {
    setChecked(!checked)
  }
  
  // useEffect(() => {
  //   getLocation(props.locationId)
  // }, [])
  useEffect(() => {
    // if (checked === true && !activityData.locationId) {
    //   convertToBackend()
    // }
    if (activityData.locationId) {
      CreateActivity(activityData)
    }
    if (checked === true) {
      DeleteLocation(props.id)
    }
  }, [checked])

  const CreateALocation = async (data) => {
    const res = await CreateLocation(data)
    console.log(res)
    setLocation(res.data)
    let temp = { ...activityData }
    temp.locationId = res.data.id
    temp.completed = true
    setActivityData(temp)
  }

  // const convertToBackend = () => {
  //   let temp = {
  //     name: props.name,
  //     url: props.url,
  //     category: props.category,
  //     gps: { lat: props.lat, lon: props.lon },
  //     taskId: 1
  //   }

  //   // CreateALocation(temp)
  //   DeleteLocation(props.id)
  // }

  const CreateActivity = async (data) => {
    const res = await pushToActivity(data)
  }
  // const getLocation = async (id) => {
  //   const location = await GetLocation(id)
  //   setLocation(location)
  // }

  // const updateActivity = async (id, data) => {
  //   const res = await UpdateActivity(id, data)
  //   console.log(res)
  // }
  // const getTask = () => {}
  // const getUser = () => {}
  // const getCompleted = async (id) => {
  //   const activity = await GetOneActivity(id)
  //   console.log(activity)
  //   setComplete(activity)
  // }
  // console.log(checked)
  // console.log(location.gps.lat)

  return (
    <div className="card">
      <img
        className="card-image"
        src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"
        alt="location"
      />
      <div className="card-container">
        {props.name && <h4 className="card-name">{props.name}</h4>}

        {props.category && <p className="card-des card-b">{props.category}</p>}
        <form>
          <label htmlFor="checkin">Check In:</label>
          {!props.completed === true && (
            <input
              className="card-checkin card-b"
              type="checkbox"
              id="checkin"
              name="checkin"
              value=""
              checked={checked}
              onChange={handleChange}
            />
          )}
        </form>
      </div>

      <p>Lat: {props.lat}</p>
      <p>Lat: {props.lon}</p>

      {/* <p>locationId:{location.id}</p>
      <p>activityId:{props.activityId}</p> */}
      <a
        className="map-link"
        href={`https://www.openstreetmap.org/node/${props.id}`}
      >
        Link to Map
      </a>
    </div>
  )
}

export default TaskCard
