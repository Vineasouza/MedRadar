import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import api from '../../services/api';
import { getLatLong } from '../../services/geocode';
import arraySpecialties from '../search/utils/specialties';
import Dropzone from './components/Dropzone';
import arrayHealthPlans from '../search/utils/healthPlans';

import './styles.css';

function AddDoctor() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [registro, setRegistro] = useState('');
    const [convenio, setConvenio] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [genero, setGenero] = useState('');
    const [tipoEndereco, setTipoEndereco] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Datas from IBGE
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        ).then(
            (resp) => {
                setUfs([...resp.data]);
            }
        )
    }, []);

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(
            (resp) => {
                setCities([...resp.data]);
            }
        );
    }, [uf]);

    let history = useHistory();
    function handleClick() {
        history.push("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("idade", idade);
        formData.append("genero", genero);
        formData.append("especialidade", especialidade );
        formData.append("registro", registro)
        formData.append("convenio", convenio);
        formData.append("uf", uf);
        formData.append("cidade", cidade);
        formData.append("endereco", endereco);
        formData.append("tipoEndereco", tipoEndereco);
        formData.append("telefone", telefone);
        formData.append("email", email);
        formData.append("bio", bio);

        const adress = `${endereco}, ${cidade}, ${uf}`;
        const coordinates = await getLatLong(adress);
        formData.append("latitude", coordinates.latitude);
        formData.append("longitude", coordinates.longitude);
        formData.append("image", selectedFile);

        await api.post("/cadastro", formData).then(
            response => console.log(response.status)
        );
        history.push("/success");
    }
    
    var expanded = false;
    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

    function handleCheck(event) {
        if(!null) {
            if(event.target.checked) {
                if(!convenio.includes(event.target.value)){
                    let newChecked = event.target.value;
                    setConvenio(checked => [...checked, newChecked] )
                    console.log(convenio);
                }
            }else {
                if (convenio.indexOf(event.target.value) > -1) {
                    convenio.splice(convenio.indexOf(event.target.value), 1);
                    console.log(convenio);
                }
            }
        }
    }

    return (
        <main>
            <header className="main-header">
                <img src={logo} className="doctor-logo" alt="logo" />
                <img src={mainDoctor} className="main-doctor" alt="doctor" />
            </header>
            <form className="forms-block" onSubmit={handleSubmit}>
                <Dropzone onFileUploaded={setSelectedFile}/>
                <label className="nome">Nome*</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    maxLength={40}
                    required
                    placeholder="Nome completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <div className="gender-types">
                    <label className="idade">Idade*</label>
                    <input
                        type="number"
                        name="idade"
                        id="idade"
                        min="0"
                        max="100"
                        required
                        placeholder=" "
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                    /> 
                    <div className="gender-types-div">
                        <input
                            type="radio"
                            id="masculino"
                            name="genero"
                            value="masculino"
                            onChange={e => setGenero(e.target.value)}
                        />
                        <label className="masculino">Masculino</label>
                    </div>
                    <div className="gender-types-div">
                        <input
                            type="radio"
                            id="feminino"
                            name="genero"
                            value="feminino"
                            onChange={e => setGenero(e.target.value)}
                        />
                        <label className="feminino">Feminino</label>
                    </div>
                </div>

                <label className="especialidade">Especialidade*</label>
                <select
                    defaultValue=" "
                    name="especialidade"
                    id="especialidade"
                    required
                    value={especialidade}
                    onChange={e => setEspecialidade(e.target.value)}
                >
                    <option value=" " hidden > Selecione uma especialidade</option>
                    {
                        arraySpecialties.map((specialty) => {
                            return (
                                <option key={specialty} value={specialty}> {specialty}</option>
                            )
                        })
                    }
                </select>
                <label className="registro">Número de Registro*</label>
                <input
                    type="text"
                    name="registro"
                    id="registro"
                    maxLength={20}
                    required
                    placeholder="N°de Registro"
                    value={registro}
                    onChange={e => setRegistro(e.target.value)}
                />
                <label className="convenio">Convênio*</label>
                <div class="multiselect">
                    <div class="selectBox" onClick={showCheckboxes}>
                        <select>
                            <option>Selecione os convênios</option>
                        </select>
                        <div class="overSelect"></div>
                    </div>
                    <div id="checkboxes">
                        {
                            arrayHealthPlans.map((healthPlan) => {
                                return (
                                    <label><input type="checkbox" key={healthPlan} value={healthPlan} onChange={handleCheck}/>{healthPlan}</label>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forms-city">
                    <label className="uf">
                        UF*
                    <select
                            name="estados-brasil"
                            id="uf"
                            required
                            onChange={e => setUf(e.target.value)}
                            defaultValue=" "
                        >
                            <option value=" " disabled hidden >UF</option>
                            {
                                ufs.map(
                                    (uf) => {
                                        return (
                                            <option
                                                key={uf.id}
                                                value={uf.sigla}
                                            >
                                                {uf.sigla}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </label>
                    <label className="cidade">Cidade*
                    <select
                            id="city"
                            required
                            defaultValue=" "
                            onChange={(e) => { setCidade(e.target.value) }}
                        >
                            <option value=" " disabled hidden >Selecione uma cidade</option>
                            {
                                cities.map(
                                    (city) => {
                                        return (
                                            <option
                                                key={city.id}
                                                value={city.nome}
                                            >
                                                {city.nome}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </label>
                </div>
                <label className="endereco">Endereço*</label>
                <input
                    type="text"
                    name="endereco"
                    id="endereco"
                    maxLength={45}
                    required
                    placeholder="Rua/Av., N°, Comp, Bairro"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                />
                <div className="adress-types">
                    <div className="adress-types-div">
                        <input
                            type="radio"
                            id="consultorio"
                            name="adress-type"
                            value="consultorio"
                            onChange={e => setTipoEndereco(e.target.value)}
                        />
                        <label className="consultorio">Consultorio</label>
                    </div>
                    <div className="adress-types-div">
                        <input
                            type="radio"
                            id="clinica"
                            name="adress-type"
                            value="clinica"
                            onChange={e => setTipoEndereco(e.target.value)}
                        />
                        <label className="clinica">Clínica</label>
                    </div>
                    <div className="adress-types-div">
                        <input
                            type="radio"
                            id="hospital"
                            name="adress-type"
                            value="hospital"
                            onChange={e => setTipoEndereco(e.target.value)}
                        />
                        <label className="hospital">Hospital</label>
                    </div>
                    <div className="adress-types-div">
                        <input
                            type="radio"
                            id="laboratorio"
                            name="adress-type"
                            value="laboratorio"
                            onChange={e => setTipoEndereco(e.target.value)}
                        />
                        <label className="laboratorio">Laboratório</label>
                    </div>
                </div>
                <label className="telefone">Celular*</label>
                <NumberFormat
                    name="telefone"
                    id="telefone"
                    required
                    pattern="\(\d{2}\) [9]?\d{4}-\d{4}"
                    title="Preencha este campo." 
                    format="(##) #####-####" 
                    // allowEmptyFormatting 
                    mask="_"
                    placeholder="(##) #####-####"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                />      

                <label className="email">E-mail*</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Preencha este campo."
                    placeholder="email@email.com.br"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label className="bio">Informações adicionais</label>
                <textarea 
                    id="bio" 
                    name="bio" 
                    rows="3" 
                    
                    maxlength={25}
                    placeholder="Informações adicionais"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />
                <div className="field-info">
                    <p>Campos Requeridos*</p>
                </div>
                {
                    isLoading 
                    ?   <section className="add-actions">
                            <Box display="flex" alignSelf="center">
                                <CircularProgress/>
                            </Box>
                            <button onClick={handleClick}>Cancelar</button>
                        </section>  

                    :   <section className="add-actions">
                            <button onClick={handleClick}>Cancelar</button>
                            <button type="submit" >Cadastrar</button>
                        </section>
                }
            </form>
        </main>
    );
}

export default AddDoctor;

