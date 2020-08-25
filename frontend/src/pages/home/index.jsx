import React from 'react';

import onlineDoctor from '../../assets/images/OnlineDoctor-pana.png';
import logo from '../../assets/images/simple-only-logo.png';
import './styles.css';
import { Link } from 'react-router-dom';

function Main() {


    return (
        <div id="main-initial">
            <header className="main-content">
                <img src={onlineDoctor} alt="online doctor" />
                <img src={logo} alt="" />
            </header>

            <main>
                <Link to="/search" className="link"> Procurar </Link>
                <Link to="/add" className="link">Cadastrar</Link>
            </main>
        </div>
    );
}

export default Main;