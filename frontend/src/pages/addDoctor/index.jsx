import React from 'react';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import { Link } from 'react-router-dom';
import './styles.css';


function AddDoctor() {
    return (
        <main>
            <header className="main-header">
                <img src={logo} className="doctor-logo" alt="logo" />
                <img src={mainDoctor} className="main-doctor" alt="doctor" />
            </header>
            <form className="forms-block">
                <label className="nome">Nome</label>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Nome completo"
                />
                
                <label className="especialidade">Especialidade</label>
                <input 
                    type="text" 
                    name="especialidade" 
                    placeholder="Especialidade"
                />

                <label className="convenio">Convênio</label>
                <input type="text" name="convenio" placeholder="sulAmerica, Unimed"/>
                <div className="forms-city">
                    <label className="uf">
                    UF
                    <select name="estados-brasil">
                        <option value="blank">  </option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RSl</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                    </select>
                    </label>
                    <label className="cidade">Cidade
                    <input 
                        type="text" 
                        name="cidade" 
                        placeholder="Nome da Cidade"
                    />
                    </label>
                </div>
                <label className="endereco">Endereço</label>
                <input 
                    type="text" 
                    name="endereco" 
                    placeholder="Rua/Av., N°, Comp, Bairro"
                />
                
                <label className="telefone">Telefone</label>
                <input 
                    type="number" 
                    name="telefone" 
                    placeholder="(xxx)xxxxx-xxxx"
                />
                
                <label className="email">E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email@email.com.br"
                />
                
            </form>
            <section className="add-actions">
                    <Link to="/main-initial">
                        <button>Cancelar</button>
                    </Link>
                    <Link to="/success">
                        <button type="submit">Cadastrar</button>
                    </Link>
            </section>
        </main>
    );
}

export default AddDoctor;

