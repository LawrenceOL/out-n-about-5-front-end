import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <h3>Welcome LOGGED IN USER!</h3>
        <Link to="/activities">Activities</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <header className = "navBar">
    <nav>
      <Link className='nav-link' to="/profile">Profile</Link>
      <Link className='nav-link' to="/">Home</Link>
      <Link className='nav-link' to="/signin">Sign In</Link>
    </nav>
    </header>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
         {/* CHANGE TO OUR SITE STUFF*/}
          {/* <img
            className="logo"
            src="https://avatars.dicebear.com/api/gridy/app.svg"
            alt="welcome banner"
          /> */}
        </div>
      </Link>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
