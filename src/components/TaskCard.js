const TaskCard = (props) => {
  return (
    <div className="card">
      <img
        className="card-image"
        src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__340.jpg"
        alt="location"
      />
      <div className="card-container">
        <h4 className="card-name">name</h4>
        <p className="card-des card-b">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </p>
        <form>
          <label htmlFor="checkin">Check In:</label>
          <input
            className="card-checkin card-b"
            type="checkbox"
            id="checkin"
            name="checkin"
            value="Checked In"
          />
        </form>
        <a className="map-link" href="htpps://google.com">
          Link to Map
        </a>
      </div>
    </div>
  )
}

export default TaskCard
