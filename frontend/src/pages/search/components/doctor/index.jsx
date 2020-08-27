import React from 'react';

import './styles.css';

const Doctor = ({ name, specialty, distance, image }) => {


    return (
        <div id="doctor-container">
            <section className="doctor-image">
                <img src={image} alt="" />
            </section>
            <section className="doctor-info">
                <h1>{name}</h1>
                <p>{specialty}</p>
                <p>{distance}</p>
            </section>
        </div>
    );
}

export default Doctor;