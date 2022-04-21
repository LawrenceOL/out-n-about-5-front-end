import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, profile, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className="navBar">
        <Link className="nav-link" to={`/profile/${profile.id}`}>
          Profile
        </Link>
        <Link className="nav-link" to={`/activity/${profile.id}`}>
          Activities
        </Link>
        <Link className="signout nav-link" onClick={handleLogOut} to="/">
          Sign Out
        </Link>

      </nav>
    )
  }

  const publicOptions = (
    <nav className="navBar">
      <Link className="nav-link" to="/">
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
