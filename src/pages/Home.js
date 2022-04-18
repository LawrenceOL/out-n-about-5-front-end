import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { letterSpacing } from "@mui/system";

const Home = () => {
  //Game start search
  const [coordinates, setCoordinates] = useState([]);
  const [restaurants, setRestaurants] = useState({});

  const getLocalRestaurants = async (e) => {
    const response = await axios.post(
      `https://overpass-api.de/api/interpreter?data=node(around:${coordinates[0]}, ${coordinates[1]} )["amenity"="restaurant"];
    out body`
    );
    setRestaurants(response.data);
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
    setCoordinates([position.coords.latitude, position.coords.longitude]);
    while (coordinates === []) {
      if (coordinates !== []) {
        getLocalRestaurants();
      }
    }
  }

  let navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Out and About 5</h1>
      <button onClick={(e) => getLocation()}>Get Coordinates</button>
      {/* <p>{restaurants}</p> */}
    </div>
  );
};

export default Home;
