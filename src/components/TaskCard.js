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
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
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

      DeleteLocation(props.id)
      let temp = {...props.profile}
      temp.score++
      props.setProfile(temp)
      UpdateProfile(props.profile.id,temp)
      props.setRefresh(!props.refresh)
    }
    return function cleanup() {
      setChecked(false)

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
      <MapContainer
        center={[props.lat, props.lon]}
        zoom={15}
        id="map"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[`${props.lat}`, `${props.lon}`]}></Marker>
      </MapContainer>
      <div className="card-container">
        {props.name && <h4 className="card-name">{props.name}</h4>}

        {props.category && <p className="card-des card-b make-title">{props.category.replaceAll('_',' ')}</p>}
        <form>
          <label htmlFor="checkin">Check In: </label>
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

      <p className='latlon'>Lat: {props.lat}</p>
      <p className='latlon'>Lon: {props.lon}</p>
      <a className="map-link" href={props.url}>
        Link to Map
      </a>
    </div>
  );
};

export default TaskCard;
