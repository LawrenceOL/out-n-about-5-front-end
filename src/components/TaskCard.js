import { useEffect, useState } from "react";
import {
  GetLocation,
  GetOneActivity,
  UpdateActivity,
  CreateLocation,
  pushToActivity,
  DeleteLocation,
  UpdateProfile,
} from "../services/UserServices";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const TaskCard = (props) => {
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState("");
  const [activityData, setActivityData] = useState({
    locationId: "",
    userId: props.profile.id,
    taskId: props.profile.id,
    completed: checked,
  });

  const handleChange = (e) => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (activityData.locationId) {
      CreateActivity(activityData);
    }
    if (checked === true) {
      DeleteLocation(props.id);
      let temp = { ...props.profile };
      temp.score++;
      UpdateProfile(props.profile.id, temp);
    }
  }, [checked]);

  const updateProfile = async (id, data) => {
    await UpdateProfile(id, data);
  };

  const CreateALocation = async (data) => {
    const res = await CreateLocation(data);
    setLocation(res.data);
    let temp = { ...activityData };
    temp.locationId = res.data.id;
    temp.completed = true;
    setActivityData(temp);
  };

  const CreateActivity = async (data) => {
    const res = await pushToActivity(data);
  };

  return (
    <div className="card">
      <img
        className="card-image"
        src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"
        alt="location"
      />
      <div className="card-container">
        {props.name && <h4 className="card-name">{props.name}</h4>}

        {props.category && <p className="card-des card-b">{props.category}</p>}
        <form>
          <label htmlFor="checkin">Check In:</label>
          {!props.completed === true && (
            <input
              className="card-checkin card-b"
              type="checkbox"
              id="checkin"
              name="checkin"
              value=""
              checked={checked}
              onChange={handleChange}
            />
          )}
        </form>
      </div>

      <p>Lat: {props.lat}</p>
      <p>Lon: {props.lon}</p>
      <a className="map-link" href={props.url}>
        Link to Map
      </a>
      <MapContainer
        center={[51.5072, 0.1276]}
        zoom={10}
        id="map"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[`${props.lat}`, `${props.lon}`]}></Marker>
      </MapContainer>
    </div>
  );
};

export default TaskCard;
