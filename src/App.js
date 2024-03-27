// All import statements should be at the top of the file
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherApp } from './Components/WeatherApp/WeatherApp';
import Login from './Components/Login/Login';
import './App.css';
import Signup from './Components/Signup/Signup';
import { CookiesProvider, useCookies } from 'react-cookie'
import Nopage from './Components/Nopage/Nopage';
import Dashboard from './Components/Dashboard/Dashboard';
// Export default can also be here or at the bottom of the file, both are fine.
export default App;

function App() {

  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin(user) {
    setCookie('user', user, { path: '/' })
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<WeatherApp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Nopage />} />
          
          {/* Uncomment the other routes and add their corresponding imports at the top after fixing the imports */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
