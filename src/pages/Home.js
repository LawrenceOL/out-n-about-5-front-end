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
  GetUserTaskActivity
} from '../services/UserServices'
import TaskCard from '../components/TaskCard'

const Home = ({ user, profile }) => {
  //Game start search

  let coordinates = []
  let selectedLocations = []
  let categoryKey = 'leisure'
  let categoryValue = 'park'
  const [locations, setLocations] = useState([])
  const [fiveLocations, setFiveLocations] = useState([])
  const [locationsFound, setLocationsFound] = useState(false)
  const [backendData, setBackendData] = useState({})
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
    if (user && profile) {
      getUserTask(profile.id)
      getUserActivity(profile.id)
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
    // console.log(res)
    setActivities(res)
  }

  const getUserActivity = async (id) => {
    const res = await GetUserTaskActivity(id)
    setTaskLocation(res)
  }

  function showPosition(position) {
    coordinates = [position.coords.latitude, position.coords.longitude]
    getLocations()
  }

  // choose five or less if there are less than five results
  function chooseFive() {
    let locationsArray = [...locations]
    // console.log(locations);
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
    }
    return selectedLocations
  }

  const convertToBackend = (data) => {
    data.forEach((element) => {
      let temp = {
        name: element.tags.name,
        url: `https://www.openstreetmap.org/node/${element.id}`,
        category: categoryKey + ': ' + categoryValue,
        gps: { lat: element.lat, lon: element.lon },
        taskId: 1
      }

      CreateALocation(temp)
    })
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

  let navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
      {!locationsFound && (
        <button onClick={(e) => getLocation()}>Start the Game!</button>
      )}

      {locationsFound && (
        <div>
          <p>"We found activities: "</p>

          {fiveLocations.length > 1 &&
            fiveLocations.map((selectedLocations) => (
              <p key={selectedLocations.id}>{selectedLocations.tags.name}</p>
            ))}
        </div>
      )}
      <div>
        {taskLocation.length > 5 &&
          taskLocation.map((act, index) => (
            <div>
              {index < 5 && (
                <TaskCard
                  id={act.id}
                  locationId={act.locationId}
                  userId={act.userId}
                  taskId={act.taskId}
                  completed={act.completed}
                  // name={act.name}
                  // category={act.category}
                  // url={act.url}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Home
