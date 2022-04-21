import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { letterSpacing } from '@mui/system'
import {
  CreateLocation,
  sendDataToBackEnd,
  getUserTaskLocation,
  pushToActivity,
  GetProfile,
  CreateTask,
  GetUserTaskActivity,
  UpdateLocation
} from '../services/UserServices'
import TaskCard from '../components/TaskCard'

const Home = ({ user, profile }) => {

  let active = 'active'
  let coordinates = []
  let selectedLocations = []
  let categoryKey = 'leisure'
  let categoryValue = 'park'
  const [locations, setLocations] = useState([])
  const [fiveLocations, setFiveLocations] = useState([])
  const [locationsFound, setLocationsFound] = useState(false)
  const [completed, setCompleted] = useState({})
  const [activities, setActivities] = useState([])
  const [taskLocation, setTaskLocation] = useState([])
  const { id } = useParams()

  const getLocations = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=`,
      `[out:json];node(around:8000.00,${coordinates[0]}, ${coordinates[1]})[${categoryKey}=${categoryValue}];
        out body;
        `
    )
    setLocations(response.data.elements)
    setLocationsFound(true)
  }

  useEffect(() => {
    setFiveLocations(chooseFive())
    if (profile) {
      getUserTask(id)
      getUserActivity(id)
      getUserTaskActivity(id)
    }
  }, [locations])

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const getUserTask = async (id) => {
    const res = await getUserTaskLocation(id)
    setActivities(res.userTask[0].taskPlace)
  }

  const getUserActivity = async (id) => {
    const res = await GetUserTaskActivity(id)
    setTaskLocation(res)
  }

  const getUserTaskActivity = async (id) => {
    const res = await GetUserTaskActivity(id)

    setCompleted(res)
  }

  function showPosition(position) {
    coordinates = [position.coords.latitude, position.coords.longitude]
    getLocations()
  }

  // choose five or less if there are less than five results
  function chooseFive() {
    let locationsArray = [...locations]

    for (let i = 0; i < 5; i++) {
      if (locationsArray.length > 0) {
        {
          const randomIndex = Math.floor(Math.random() * locationsArray.length)
          selectedLocations.push(locationsArray[randomIndex])
          locationsArray.splice(randomIndex, 1)
        }
      }
    }
    if (selectedLocations.length > 0) {
      convertToBackend(selectedLocations)
    }
    return selectedLocations
  }

  const convertToBackend = (data) => {
    data.forEach((element, index) => {
      if (index < 5) {
        let temp = {
          name: element.tags.name,
          url: `https://www.openstreetmap.org/node/${element.id}`,
          category: categoryKey + ': ' + categoryValue,
          gps: { lat: element.lat, lon: element.lon },
          taskId: profile.id

        }

        CreateALocation(temp)
      }
    })
  }
  const updateLocation = async (id, data) => {
    const res = await UpdateLocation(id, data)
  }

  const CreateALocation = async (data) => {
    const res = await CreateLocation(data)
  }
  const CreateActivity = async (data) => {
    const res = await pushToActivity(data)
  }

  const GetUserActivity = (data) => {
    if (data.id) {
      for (let i = 0; i < 5; i++) {
        let temp = {
          locationId:
            data.userTask[0].taskPlace[
              Math.floor(Math.random() * data.userTask[0].taskPlace.length)
            ].id,
          taskId: data.id,
          userId: data.id,
          completed: false
        }
      }
    }
  }

  const createTask = async (id) => {
    const res = await CreateTask(id)
  }
  let navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>OUT AND ABOUT <span className='larger'>5</span></h1>
      {!locationsFound && profile.id && !activities.length>0 && (
          <button className='profile-button' onClick={(e) => getLocation()}>Start the Game!</button>
      )}
      {locationsFound && (
        <div>
          <div className='card-pack'>
            </div>
        </div>
      )}
      <div className='card-pack'>
      {activities &&
        activities.map((act, index) => (
          <div>
            {index < 5 && (
              <TaskCard
                profile={profile}
                name={act.name}
                lat={act.gps.lat}
                lon={act.gps.lon}
                {...act}
                leisure={act.category}
                completed={false}
                active={active}
              />
            )}
          </div>
        ))}
        </div>
    </div>
  )
}

export default Home
