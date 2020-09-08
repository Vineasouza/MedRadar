import Geocode from "react-geocode";
import React from  'react';
require('dotenv').config()

Geocode.setApiKey(process.env.REACT_APP_API);
Geocode.enableDebug();

// Get latidude & longitude from address.
Geocode.fromAddress("Avenida cidade jardim, 2760").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);

// https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lhg}&key={api_key}

function Geolocator() {
  return (
    <div className="App">
      <h1>Geolocator Test</h1>
      <p>Olhar CONSOLE</p>
    </div>
  );
}

export default Geolocator;