import React, { useEffect, useState } from 'react';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import api from "../../services/api";

import './styles.css';
import MedRadarLogo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-2.png';

function SaibaMais() {

    const { id } = useParams();
    const [centerMap, setCenterMap] = useState([0, 0]);
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
        api.get(`doutor/${id}`).then((response) => {
            setDoctor(response.data);
            const positionDoctor = response.data.location.coordinates;
            setCenterMap([positionDoctor[1], positionDoctor[0]]);
        });
    }, [id]);

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
                        {console.log(doctor)}
                        <img src={doctor.image} alt="Imagem Doutor(a)"/>
                        <div className="rating">
                            {/* https://material-ui.com/pt/components/rating/ */}
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="rating" defaultValue={2.5} precision={0.5} size="medium" />
                            </Box>
                        </div>
                    </header>
                    <main>
                        <section className="doctor-informations">
                            <span className="doctor-field">Nome: {`${doctor.nome}`}</span>
                            <span className="doctor-field">Idade: {`${doctor.idade}`}</span>
                            <span className="doctor-field">Especialidadde: {`${doctor.especialidade}`}</span>
                            <span className="doctor-field">NºRegistro: {`${doctor.registro}`}</span>
                            <span className="doctor-field">Convênios: {`${doctor.convenio}`}</span>
                            <span className="doctor-field"> Endereço: {
                                `${doctor.endereco}, ${doctor.cidade} - ${doctor.uf}`
                            }</span>
                            <span className="doctor-field">{`${doctor.bio}`}</span>
                        </section>
                        <section className="doctor-location">
                            <Map zoom={15} center={centerMap}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker
                                    position={centerMap}
                                />
                            </Map>

                        </section>
                        <footer className="doctor-contact">
                            <a
                                className="phone"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://wa.me/+55${doctor.telefone}`}
                            >
                                <FiPhoneCall /> {`${doctor.telefone}`}
                            </a>
                            <a
                                className="e-mail"
                                href={`mailto:${doctor.email}`}
                            >
                                <FiMail /> {`${doctor.email}`}
                            </a>
                        </footer>
                    </main>
                </div>
            </div>
        </main >
    );
}

export default SaibaMais;