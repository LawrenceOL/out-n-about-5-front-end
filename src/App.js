import './style/App.css';

import { Route, Routes } from 'react-router'

import Nav from './components/Nav'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const App = () => {

  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
