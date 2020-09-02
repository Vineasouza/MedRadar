import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctors from '../../assets/images/Doctors-bro.png';
import './main.css';
import { Link } from 'react-router-dom';

function Main() {

    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/main-initial')
        }, 2000)
    }, [history]);

    return (
        <div className="main">
            <div className="left">
                <img src={logo} className="logo" alt="logo" />
                <Link to="/main-initial" className="main-h2">Conectando você à sua Saúde</Link>
            </div>
            <div className="right">
                <img src={mainDoctors} className="doctor" alt="doctors" />
            </div>
        </div>
    );
}

export default Main;