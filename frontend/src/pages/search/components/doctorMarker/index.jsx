import React from 'react';
import { Link } from "react-router-dom"
import './styles.css';

const DoctorMarker = ({ id, name, specialty, image }) => {
    return (
        <div id="doctor-marker-container">
            <img src={image} alt="Imagem do médico" />
            <section>
                <p>{name}</p>
                <p>{specialty}</p>
                <button>

                    <Link to={`/saiba-mais/${id}`}>Saiba mais</Link>
                </button>
            </section>
        </div>
    )
}

export default DoctorMarker;