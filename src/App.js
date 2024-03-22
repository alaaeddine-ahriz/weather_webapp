import './App.css';
import { WeatherApp } from './Components/WeatherApp/WeatherApp';


export default App;

function App() {
  return (
    <div className="App">
      {<WeatherApp />}
    </div>
  );
}