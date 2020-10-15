import Leaflet from 'leaflet';

export const manDoctor = new Leaflet.Icon({
    iconUrl: require('../../../../assets/images/male-doctor.jpg'),
    iconRetinaUrl: require('../../../../assets/images/male-doctor.jpg'),
    iconAnchor: [5, 55],
    popupAnchor: [60, -44],
    iconSize: [50, 50],
    className: 'leaflet-div-icon'
});

export const womanDoctor = new Leaflet.Icon({
    iconUrl: require('../../../../assets/images/female-doctor.jpg'),
    iconRetinaUrl: require('../../../../assets/images/female-doctor.jpg'),
    iconAnchor: [5, 55],
    popupAnchor: [60, -44],
    iconSize: [50, 50],
    className: 'leaflet-div-icon'
});
