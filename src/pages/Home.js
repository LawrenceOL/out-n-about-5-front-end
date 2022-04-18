import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { letterSpacing } from '@mui/system'

const Home = () => {
  //Game start search
  let coordinates = []
  const [locations, setLocations] = useState([])
  const [locationsFound, setLocationsFound] = useState(false)

  const getLocations = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=`,
      `[out:json];node(around:8000.00,${coordinates[0]}, ${coordinates[1]})["amenity"="restaurant"];
        out body;
        `
    )
    console.log(response.data.elements)
    setLocations(response.data.elements)
    setLocationsFound(true)
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
    navigator.geolocation.getCurrentPosition(showPosition)
  }

  function showPosition(position) {
    coordinates = [position.coords.latitude, position.coords.longitude]
    console.log(coordinates)
    getLocations()
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
          <p>${locations}</p>
        </div>
      )}
    </div>
  )
}

export default Home
