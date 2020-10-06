import React, { useState } from 'react';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";

import MedRadarLogo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-2.png';



import './styles.css';


function SaibaMais() {

    const [centerMap, setCenterMap] = useState([-23.4444548, -50.5653303]);

    return (
        <main>
            <div className="back-button">
                <Link to="/main-initial">
                    <FiArrowLeft />
                </Link>
            </div>
            <img src={healthTeam} className="healthTeam" alt="Doctor Team" />
            <div className="container">
                <img src={MedRadarLogo} className="medradarlogo" alt="MedRadar Logo" />
                <div className="content">
                    <header>
                        <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
                        <div className="rating">
                            {/* https://material-ui.com/pt/components/rating/ */}
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="rating" defaultValue={2.5} precision={0.5} size="medium" />
                            </Box>
                        </div>
                    </header>
                    <main>
                        <section className="doctor-informations">
                            <span className="doctor-field">Nome:</span>
                            <span className="doctor-field">Idade:</span>
                            <span className="doctor-field">Especialidadde:</span>
                            <span className="doctor-field">NºRegistro:</span>
                            <span className="doctor-field">Convênios:</span>
                            <span className="doctor-field"> Endereço:</span>
                        </section>
                        <section className="doctor-location">
                            <Map zoom={15} center={centerMap}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </Map>
                        </section>
                        <footer className="doctor-contact">
                            <span className="phone">Telefone:</span>
                            <span className="e-mail">Email:</span>
                        </footer>
                    </main>
                </div>
            </div>
        </main >
    );
}

export default SaibaMais;