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
                <label className="convenio">
                Convênio
                <input type="text" name="convenio" placeholder="sulAmerica"/>
                </label>
                <div>
                    <label className="uf">
                    UF
                    <input type="text" name="uf" placeholder="SP"/>
                    </label>
                    <label className="cidade">
                    Cidade
                    <input type="text" name="cidade"             placeholder="São José dos Campos"/>
                    </label>
                </div>
                <label className="endereco">
                Endereço
                <input type="text" name="cidade" placeholder="Avenida Cidade Jardim, 9999, Bosque dos Eucaliptos"/>
                </label>
                <label className="email">
                E-mail
                <input type="text" name="email" placeholder="email@email.com.br"/>
                </label>
            </form>
            <section className="add-actions">
                    <button>Cancelar</button>
                    <button>Cadastrar</button>
            </section>
        </main>
    );
}

export default AddDoctor;