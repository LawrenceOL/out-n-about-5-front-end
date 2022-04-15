import { Link } from 'react-router-dom'

const TaskCard = () => {

return (
<div className="first hero">
  <img className="location-img" src="http://tile.loc.gov/image-services/iiif/service:pnp:highsm:38100:38110/full/pct:25/0/default.jpg" alt="location"/>
  <div className="hero-description-bk"></div>
  <div className="hero-logo">
    <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291375.3948_Dy2yZu_n.jpg" alt=""/>
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
}

export default TaskCard