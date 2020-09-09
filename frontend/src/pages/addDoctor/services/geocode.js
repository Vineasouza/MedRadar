import Geocode from 'react-geocode';
require('dotenv').config();

// getting latitude and longitude with the Google API, using react-geocode
Geocode.setApiKey(process.env.REACT_APP_API);
Geocode.enableDebug();

export async function getLatLong(adress) {
    // Get latidude & longitude from address.
    var lat, lng;
    const fullAdress = `${adress.endereco}, ${adress.cidade}, ${adress.uf}`;

    await Geocode.fromAddress(fullAdress).then(
        response => {
            const result = response.results[0].geometry.location;
            lat = result.lat;
            lng = result.lng;
        },
        error => {
            console.error(error);
        }
    );

    return {
        latitude: lat,
        longitude: lng
    }
}