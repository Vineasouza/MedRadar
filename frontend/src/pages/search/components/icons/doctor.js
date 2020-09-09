import Leaflet from 'leaflet';

export const manDoctor = new Leaflet.Icon({
    iconUrl: require('../../../../assets/images/doctor.svg'),
    iconRetinaUrl: require('../../../../assets/images/doctor.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [60, -44],
    iconSize: [40, 40],
    className: 'leaflet-div-icon'
});

export const womanDoctor = new Leaflet.Icon({
    iconUrl: require('../../../../assets/images/doctor_woman.svg'),
    iconRetinaUrl: require('../../../../assets/images/doctor_woman.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [60, -44],
    iconSize: [40, 40],
    className: 'leaflet-div-icon'
});
