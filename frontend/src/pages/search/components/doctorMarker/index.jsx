import React from 'react';

import './styles.css';

const DoctorMarker = ({ name, specialty, image }) => {
    return (
        <div id="doctor-marker-container">
            <img src={image} alt="Imagem do médico" />
            <section>
                <p>{name}</p>
                <p>{specialty}</p>
                <button>Saiba mais</button>
            </section>
        </div>
    )
}

export default DoctorMarker;