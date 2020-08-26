import React from 'react';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import { Link } from 'react-router-dom';
import './styles.css';


function AddDoctor() {
    return (
        <main>
            <header className="main-header">
                <img src={logo} className="doctor-logo-2" alt="logo" />
                <img src={mainDoctor} className="main-doctor" alt="doctor" />
            </header>
            <section className="back-section">
                <p>Cadastro Efetuado!</p>
                <Link to="/main-initial" className="link"> Voltar </Link>
            </section>
        </main>
    );
}

export default AddDoctor;