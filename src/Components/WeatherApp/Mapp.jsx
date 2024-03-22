import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { center } from './Components/WeatherApp/WeatherApp.jsx'


const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};


function Mapp() {
  const [clickPosition, setClickPosition] = useState(null);
  const [cityName, setCityName] = useState('');


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickPosition({ lat, lng });

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`);
      const data = await response.json();
      if (data.results && data.results[0]) {
        const city = data.results[0].address_components.find(component =>
          component.types.includes('locality') || component.types.includes('administrative_area_level_1')
        );
        if (city) {
          setCityName(city.long_name);
          console.log("Vous avez cliqué sur:", city.long_name);
        }
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  return (
    <><div className="App">
    </div><div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          onClick={handleClick}
        >
          {clickPosition && (
          <Marker position={{ lat: clickPosition.lat, lng: clickPosition.lng }} />
          )}
          <Marker position={center} />
        </GoogleMap>
      </div></>
  );
}