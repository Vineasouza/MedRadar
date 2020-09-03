import React, { useState } from 'react';
import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import { Link } from 'react-router-dom';
import './styles.css';
// import axios from 'axios';

function AddDoctor({ onSubmit }) {
    const [nome, setNome] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [convenio, setConvenio] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            nome,
            especialidade,
            convenio,
            uf,
            cidade,
            endereco,
            telefone,
            email,
        });

        // axios.post(`https://my-json-server.typicode.com/typicode/demo/posts`, {  })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // }, (error) => {
        //     console.log(error);
        // });
    }

    return (
        <main>
            <header className="main-header">
                <img src={logo} className="doctor-logo" alt="logo" />
                <img src={mainDoctor} className="main-doctor" alt="doctor" />
            </header>
            <form className="forms-block" onSubmit={handleSubmit}>
                <label className="nome">Nome</label>
                <input 
                    type="text" 
                    name="nome" 
                    id="nome"
                    required
                    placeholder="Nome completo"
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                />
                
                <label className="especialidade">Especialidade</label>
                <input 
                    type="text" 
                    name="especialidade" 
                    id="especialidade"
                    required 
                    placeholder="Especialidade"
                    value={especialidade} 
                    onChange={e => setEspecialidade(e.target.value)} 
                />

                <label className="convenio">Convênio</label>
                <input 
                    type="text" 
                    name="convenio" 
                    id="convenio"
                    required 
                    placeholder="sulAmerica, Unimed"
                    value={convenio} 
                    onChange={e => setConvenio(e.target.value)} 
                />

                <div className="forms-city">
                    <label className="uf">
                    UF
                    <select 
                        name="estados-brasil"
                        id="uf"
                        required
                        value={uf} 
                        onChange={e => setUf(e.target.value)} 
                    >
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
                        id="cidade"
                        required 
                        placeholder="Nome da Cidade"
                        value={cidade} 
                        onChange={e => setCidade(e.target.value)} 
                    />
                    </label>
                </div>
                <label className="endereco">Endereço</label>
                <input 
                    type="text" 
                    name="endereco" 
                    id="endereco" 
                    required
                    placeholder="Rua/Av., N°, Comp, Bairro"
                    value={endereco} 
                    onChange={e => setEndereco(e.target.value)} 
                />
                
                <label className="telefone">Telefone</label>
                <input 
                    type="number" 
                    name="telefone"
                    id="telefone"
                    required 
                    pattern="\(?[0]?\d{2}\)?[9]?\d{4}-?\d{4}"
                    title="Invalid input"
                    placeholder="(xxx)xxxxx-xxxx"
                    value={telefone} 
                    onChange={e => setTelefone(e.target.value)} 
                />
                
                <label className="email">E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Invalid input"
                    placeholder="email@email.com.br"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <section className="add-actions">
                    <Link to="/main-initial">
                        <button>Cancelar</button>
                    </Link>
                    {/* <Link to="/success"> */}
                        <button type="submit">Cadastrar</button>
                    {/* </Link> */}
                </section>
            </form>
        </main>
    );
}

export default AddDoctor;

