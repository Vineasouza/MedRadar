import React from 'react';

import './styles.css';

import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';

function Search() {
    return (
        <div id="search-page">
            <header>
                <section className="search-intro">
                    <img src={logo}></img>
                    <img src={healthTeam}></img>
                </section>
                <section className="search-actions">
                    <button>Pesquisar</button>
                    <button>Filtrar</button>
                </section>
            </header>
        </div>
    )
}

export default Search;