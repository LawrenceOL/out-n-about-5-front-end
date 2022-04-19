import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { letterSpacing } from '@mui/system'
import {
  CreateLocation,
  sendDataToBackEnd,
  GetAllActivities
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
    getAllActivities()
  }, [locations])

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  console.log(activites)

  const getAllActivities = async () => {
    const res = await GetAllActivities()
    setActivities(res)
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
      } else {
        break
      }

      console.log('selectedLocations after loop: ', selectedLocations)
    }
    if (selectedLocations.length > 1) {
      convertToBackend(selectedLocations)
    }
    return selectedLocations
  }

  const sendTobackEnd = async (data) => {
    const res = await CreateLocation(data)
  }

  let arrData = []
  const convertToBackend = (apiData) => {
    let data = {}
    arrData = apiData.map((location) => {
      data = {
        location: {
          name: location.tags.name,
          url: `www.openstreetmap.org/node/${location.id}`,
          gps: { lat: location.lat, lon: location.lon },
          category: categoryKey
        },
        userId: user.id
      }
      sendTobackEnd(data)
      arrData.push(data)
    })
  }
  console.log(arrData)
  let navigate = useNavigate()

  console.log(profile)

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
      {/* <div>
        {activites.map((act) => (
          <div>{act.userId === user.id && <TaskCard />}</div>
        ))}
      </div> */}
    </div>
  )
}

export default Home
