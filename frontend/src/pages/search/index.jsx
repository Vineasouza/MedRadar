import React from 'react';

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

                </section>
            </main>
        </div>
    )
}

export default Search;