import './style/App.css';

import { Route, Routes } from 'react-router'

import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Activities from './pages/Activities'

const App = () => {

  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activities" element={<Activities/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
