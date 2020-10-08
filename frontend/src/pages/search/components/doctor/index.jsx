import React from 'react';
import { Link } from "react-router-dom"

import './styles.css';

const Doctor = ({ id, name, specialty, distance, image }) => {

    return (
        <div id="doctor-container">
            <section className="doctor-image">
                <img src={image} alt="doutor" />
            </section>
            <section className="doctor-info">
                <h1>{name}</h1>
                <p>{specialty}</p>
                <p>{distance} km</p>
                <button>
                    <Link to={`/saiba-mais/${id}`}>
                        Saiba mais
                    </Link>
                </button>
            </section>
        </div>
    );
}

export default Doctor;