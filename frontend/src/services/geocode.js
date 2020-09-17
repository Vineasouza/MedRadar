import Geocode from 'react-geocode';
require('dotenv').config();

// getting latitude and longitude with the Google API, using react-geocode
Geocode.setApiKey(process.env.REACT_APP_API);
Geocode.enableDebug();

export async function getLatLong(adress) {

    // Get latidude & longitude from address.
    const response = await Geocode.fromAddress(adress);
    const { lat, lng } = response.results[0].geometry.location;

    return {
        latitude: lat,
        longitude: lng
    }
}