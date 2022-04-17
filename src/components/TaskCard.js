const TaskCard = (props) => {

  if (!props.show) {
    return null
  }
return (
<div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Modal title</h4>
        </div>
        <div className='modal-body'>
          This is the modal content.
        </div>
        <div className='modal-footer'>
          <button className='button' onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
)
}

/* <div className="first hero">
  <img className="location-img" src="http://tile.loc.gov/image-services/iiif/service:pnp:highsm:38100:38110/full/pct:25/0/default.jpg" alt="location"/>
  <div className="location-description"></div>
  <div className="hero-logo">
    <img src='https://i.imgur.com/CoSoBtE.png' alt=""/>
  </div>
  <div className="location-title">
    <p>Description</p>
  </div>
  <div className="hero-description">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
  <div  className="task-date">
    <p>20.02.2019</p>
  </div>
  <div className="hero-btn">
   <Link to='/signin'></Link>
  </div>
</div> 
)
} */

export default TaskCard