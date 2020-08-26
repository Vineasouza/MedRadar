import React from 'react';
import { Map, TileLayer } from 'react-leaflet'

import './styles.css';
import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';

function Search() {
    return (
        <div id="search-page">
            <header>
                <section className="search-intro">
                    <img src={logo} alt="logo do MedRadar"></img>
                    <img src={healthTeam} alt="grupo de profissionais"></img>
                </section>
                <section className="search-actions">
                    <button>Pesquisar</button>
                    <button>Filtrar</button>
                </section>
            </header>

            <main id="search-main">
                <section className="search-result">
                    <div>

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