import React from 'react';
import { manDoctor, womanDoctor } from '../icons/doctor'

import './styles.css';

const Doctor = ({ name, specialty, distance, image, genderDefault }) => {


    return (
        <div id="doctor-container">
            <section className="doctor-image">
                <img src={image} alt="Image do doutor" />
            </section>
            <section className="doctor-info">
                <h1>{name}</h1>
                <p>{specialty}</p>
                <p>{distance} km</p>
            </section>
        </div>
    );
}

export default Doctor;