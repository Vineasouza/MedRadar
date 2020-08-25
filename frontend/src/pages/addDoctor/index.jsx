import React from 'react';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import './styles.css';


function AddDoctor() {
    return (
        <main>
            <header className="main-header">
                <img src={logo} className="doctor-logo" alt="logo" />
                <img src={mainDoctor} className="main-doctor" alt="doctor" />
            </header>
            <form className="forms-block">
                <label className="nome">
                Nome
                <input type="text" name="nome" placeholder="Vinicius Souza"/>
                </label>
                <label className="especialidade">
                Especialidade
                <input type="text" name="especialidade" placeholder="Neurologista"/>
                </label>
            </form>
        </main>
    );
}

export default AddDoctor;