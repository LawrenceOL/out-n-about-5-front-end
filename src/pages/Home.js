import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { letterSpacing } from '@mui/system'
import {
  CreateLocation,
  sendDataToBackEnd,
  getUserTaskLocation
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
  const [activites, setActivities] = useState([])
  const [userLocation, setUserLocation] = useState([])

  const getLocations = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=`,
      `[out:json];node(around:8000.00,${coordinates[0]}, ${coordinates[1]})[${categoryKey}=${categoryValue}];
        out body;
        `
    )

    setLocations(response.data.elements)
    console.log(locations)
    setLocationsFound(true)
  }

  useEffect(() => {
    setFiveLocations(chooseFive())
    if (user && profile) {
      getUserTask(profile.id)
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
    console.log(res.user[0].taskPlace)
    setActivities(res.user[0].taskPlace)
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

      console.log('selectedLocations after loop: ', selectedLocations)
    }
    console.log(selectedLocations)
    if (selectedLocations.length > 1) {
      convertToBackend(selectedLocations)
    }
    return selectedLocations
  }

  const convertToBackend = (data) => {
    data.forEach((element) => {
      let temp = {
        name: element.tags.name,
        url: `https://www.openstreepmap.org/node/${element.id}`,
        category: categoryKey + ': ' + categoryValue,
        gps: { lat: element.lat, lon: element.lon },
        taskId: 1
      }

      CreateALocation(temp)
    })
    console.log(backendData)
  }

  const CreateALocation = async (data) => {
    const res = await CreateLocation(data)
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
        {activites.map((act, index) => (
          <div>
            {index < 5 && (
              <TaskCard name={act.name} category={act.category} url={act.url} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
