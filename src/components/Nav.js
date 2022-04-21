import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, profile, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className="navBar">
        <Link className="nav-link" to={`/profile/${profile.id}`}>
          Profile
        </Link>
        <Link className="nav-link" to="/">
          Activities
        </Link>
        <Link className="signout nav-link" onClick={handleLogOut} to="/">
          Sign Out
        </Link>

        {/* ADDED ITEM */}
        <Link className="nav-link" to="/activities">CardList</Link>
        {/* END OF ADDED ITEM */}

        
      </nav>
    )
  }

  const publicOptions = (
    <nav className="navBar">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/signin">
        Sign In
      </Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </Link>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
