import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%', // Fill the width of the parent container
  height: '100%', // Fill the height of the parent container
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "off" } // Hides all labels
    ]
  },
  {
    featureType: "locality", // Specifically targeting localities, which includes cities
    elementType: "labels",
    stylers: [
      { visibility: "on" } // Makes sure the names of the cities are visible
    ]
  },
  {
    featureType: "poi", // Points of interest
    elementType: "labels", // Targeting labels
    stylers: [
      { visibility: "off" } // Hide labels for all points of interest
    ]
  },
  // Add more specific styles as needed
];

export default MapComponent ;

function MapComponent({ center }) {
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
    <div className="mapContainer">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={handleClick}
        mapTypeId="terrain"
        options={{
          styles: mapStyles, // Apply the custom map styles
          streetViewControl: true, // Optional: disables the default map UI components if desired
          // Any other map options you want to include
        }}
      >
        {clickPosition && (
          <Marker position={{ lat: clickPosition.lat, lng: clickPosition.lng }} />
        )}
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}