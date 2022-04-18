import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { letterSpacing } from "@mui/system";

const Home = () => {

  //Game start search
const [coordinates, setCoordinates] = useState([]);
const [searchResults, setSearchResults] = useState([]);
const [searched, setSearched] = useState(false);
const [searchQuery, setSearchQuery] = useState("");



const getSearchResults = async (e) => {
  e.preventDefault();
  const response = await axios.post(
    `https://overpass-api.de/api/interpreter?data=${searchQuery}`, 
      `node(around:8000.00,41.7898313, -69.9897397)["amenity"="restaurant"];
      out body;
      `    
  );
  setSearchResults(response.data);  
  setSearched(true);
};

const handleChange = (e) => {
  setSearchQuery(e.target.value);
};



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.")
  }
  navigator.geolocation.getCurrentPosition(showPosition);
  
}
    
function showPosition(position) {
    setCoordinates([position.coords.latitude, position.coords.longitude ])
    let defaultQuery = `node(around:${coordinates[0]}, ${coordinates[1]})["amenity"="restaurant"]; out body;`    
    return
}


let defaultQuery = `node(around:${coordinates[0]}, ${coordinates[1]})["amenity"="restaurant"]; out body;`

  let navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
      <button onClick={(e) => getLocation()}>Get Coordinates</button>
      <form onSubmit={(e) => getSearchResults(e)}>
      <h2> Start the game by entering your address below</h2>
      <input
        type="text"
        name="search"
        // value={searchQuery}
        //hardcoded temporary search query
        value={defaultQuery}
        placeholder="Open Street Maps Query Here"
        onChange={(e) => handleChange(e, "searchQuery")}  
        readOnly      
      ></input>
      <p>{searchResults}</p>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Home