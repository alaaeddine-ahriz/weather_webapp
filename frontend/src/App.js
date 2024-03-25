import './App.css';
import { WeatherApp } from './Components/WeatherApp/WeatherApp';
import Signup from './pages/Signup'
import Nopage from './pages/Nopage'
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
              <Route index element ={<WeatherApp/>}/>
              <Route path="/home"  element={<WeatherApp/>}/>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register"  element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="*"  element={<Nopage/>}/>
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;