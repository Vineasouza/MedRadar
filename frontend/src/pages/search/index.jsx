import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';
import Doctor from './components/doctor';

function Search() {
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
                    <button>Filtrar busca<FaFilter /> </button>
                </section>
            </header>

            <main id="search-main">
                <section className="search-result">
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
                    </div>
                </section>
                <section className="search-map">
                    <Map center={[-23.4444548, -50.5653303]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </Map>
                </section>
            </main>
        </div>
    )
}

export default Search;