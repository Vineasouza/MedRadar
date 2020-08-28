import Leaflet from 'leaflet';

const iconPerson = new Leaflet.Icon({
    iconUrl: require('../../../../assets/images/doctor.svg'),
    iconRetinaUrl: require('../../../../assets/images/doctor.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [60, -44],
    iconSize: [65, 65],
    className: 'leaflet-div-icon'
});

export default iconPerson;