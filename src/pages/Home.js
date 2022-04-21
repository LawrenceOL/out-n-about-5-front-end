import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  //Game start search

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
    if (user) {
      getUserTask(profile.id)
      getUserActivity(profile.id)
      getUserTaskActivity(profile.id)
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
    // console.log(res.userTask[0].taskPlace)
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

  console.log(completed)

  function showPosition(position) {
    coordinates = [position.coords.latitude, position.coords.longitude]
    getLocations()
  }

  // choose five or less if there are less than five results
  function chooseFive() {
    let locationsArray = [...locations]
    console.log(locations)
    // console.log(locationsArray);

    if (locationsArray.length === 0) {
      locations[0] = 'Sorry, no restaurants found in your area'
    }

    for (let i = 0; i < 5; i++) {
      if (locationsArray.length > 0) {
        {
          const randomIndex = Math.floor(Math.random() * locationsArray.length)
          // console.log("Random index is: ", randomIndex);
          // console.log("pushing: ", locationsArray[randomIndex]);
          selectedLocations.push(locationsArray[randomIndex])

          locationsArray.splice(randomIndex, 1)
        }
      }

      // console.log('selectedLocations after loop: ', selectedLocations)
    }
    if (selectedLocations.length > 1) {
      convertToBackend(selectedLocations)
      console.log(selectedLocations)
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
          taskId: 1
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
          taskId: data.userTask[0].id,
          userId: data.id,
          completed: false
        }
        // CreateActivity(temp)
      }
    }
  }

  const createTask = async () => {
    const res = await CreateTask()
  }
  console.log(taskLocation)
  console.log(activities)
  console.log(locations)
  let navigate = useNavigate()

  console.log(fiveLocations)
  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
      {!locationsFound && (
        <button onClick={(e) => getLocation()}>Start the Game!</button>
      )}
      {<button onClick={() => createTask()}>Create Task</button>}
      {locationsFound && (
        <div>
          <p>"We found activities: "</p>

          {fiveLocations.length > 1 &&
            fiveLocations.map((selectedLocations) => (
              <div>
                <p key={selectedLocations.id}>{selectedLocations.tags.name}</p>
                <TaskCard
                  {...selectedLocations}
                  categoryKey={categoryKey}
                  categoryValue={categoryValue}
                  profile={profile}
                  name={selectedLocations.tags.name}
                  category={selectedLocations.tags.leisure}
                />
              </div>
            ))}
        </div>
      )}
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
  )
}

export default Home
