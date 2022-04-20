import { useState } from 'react'

const TaskCard = (props) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  console.log(checked)

  return (
    <div className="card">
      <img
        className="card-image"
        src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"
        alt="location"
      />
      <div className="card-container">
        <h4 className="card-name">{props.name}</h4>
        <p className="card-des card-b">{props.category}</p>
        <form>
          <label htmlFor="checkin">Check In:</label>
          <input
            className="card-checkin card-b"
            type="checkbox"
            id="checkin"
            name="checkin"
            checked={checked}
            onChange={handleChange}
          />
        </form>
        <a className="map-link" href={`https://${props.url}`}>
          Link to Map
        </a>
      </div>
    </div>
  )
}

export default TaskCard
