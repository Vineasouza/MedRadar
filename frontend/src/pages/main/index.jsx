import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctors from '../../assets/images/Doctors-bro.png';
import './styles.css';
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
            <header className="main-header">
                <img src={logo} className="main-logo" alt="logo" />
                <img src={mainDoctors} className="main-doctors" alt="doctors" />
                <Link to="/main-initial" className="main-h2">Conectando você à sua Saúde</Link>
            </header>
        </div>
    );
}

export default Main;