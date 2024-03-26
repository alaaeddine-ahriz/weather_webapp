// All import statements should be at the top of the file
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherApp } from './Components/WeatherApp/WeatherApp';
import Login from './Components/Login/Login';
import CreateUser from './Components/CreateUser/CreateUser';
import Button from './Components/Button/button';
import './App.css';

// Export default can also be here or at the bottom of the file, both are fine.
export default App;

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Button isLoggedIn={false} />
        <Routes>
          <Route index element={<WeatherApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />
          {/* Uncomment the other routes and add their corresponding imports at the top after fixing the imports */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
