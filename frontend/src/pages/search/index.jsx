import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';
import Doctor from './components/doctor';
import DoctorMarker from './components/doctorMarker';
import doctorIcon from './components/iconDoctor/Icon';
import Filters from './components/filters';

function Search() {

    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, [])


    return (
        <div id="search-page">

            <header>
                <section className="search-intro">
                    <div>
                        <Link to="/main-initial">
                            <FiArrowLeft />
                        </Link>
                        <img src={logo} alt="logo MedRadar" />
                    </div>
                    <img src={healthTeam} alt="grupo de profissionais"></img>
                </section>
                <section className="search-actions">
                    <button>Pesquisar <FiSearch /></button>
                    <div className="search-filters">
                        <button onClick={() => { setIsFilter(!isFilter) }}>Filtrar busca<FaFilter /> </button>
                        {
                            isFilter &&
                            <Filters>
                                <h1>Hello</h1>
                            </Filters>
                        }
                    </div>
                </section>
            </header>

            <main id="search-main">
                <section className="search-result">

                    {/* Part of resutlts */}
                    <div>
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                    </div>
                </section>

                { /* Part of MAP*/}
                <section className="search-map">
                    <Map center={initialPosition} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.4444548, -50.5653303]} draggable={false} icon={doctorIcon}>
                            <Popup>
                                <DoctorMarker
                                    name="Dr. Joana"
                                    specialty="Cardiologista"
                                    image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                />
                            </Popup>
                        </Marker>
                    </Map>
                </section>

            </main>
        </div>
    )
}

export default Search;