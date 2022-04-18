import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { letterSpacing } from "@mui/system";

const Home = () => {
  //Game start search
  let coordinates = [];
  const [restaurants, setRestaurants] = useState({});

  const getLocalRestaurants = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=`, 
        `node(around:8000.00,${coordinates[0]}, ${coordinates[1]})["amenity"="restaurant"];
        out body;
        `    
    );
    console.log(response.data)
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    coordinates = [position.coords.latitude, position.coords.longitude];
    console.log(coordinates);
    getLocalRestaurants();
  }

  let navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
      <button onClick={(e) => getLocation()}>Get Coordinates</button>      
    </div>
  );
};

export default Home;
