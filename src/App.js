import './style/App.css';

import { Route, Routes } from 'react-router'

import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import Home from './pages/Home'

const App = () => {

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={''} />
          <Route path="/signin" element={''} />
          <Route path="/register" element={''} />
          <Route path="/activities" element={''} />
          <Route path="/home" element={''} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
