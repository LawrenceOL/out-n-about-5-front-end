import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { letterSpacing } from '@mui/system'

const Home = () => {
  //Game start search

  let coordinates = []
  let selectedLocations = []
  const [locations, setLocations] = useState([])
  const [fiveLocations, setFiveLocations] = useState([])
  const [locationsFound, setLocationsFound] = useState(false)

  const getLocations = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=`,
      `[out:json];node(around:8000.00,${coordinates[0]}, ${coordinates[1]})["amenity"="restaurant"];
        out body;
        `
    )

    setLocations(response.data.elements)
    console.log(locations)
    setLocationsFound(true)
  }

  useEffect(() => {
    setFiveLocations(chooseFive())
  }, [locations])

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
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
    return selectedLocations
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
    </div>
  )
}

export default Home
