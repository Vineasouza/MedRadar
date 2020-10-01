import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { uniqueId} from 'lodash';
import filesize from 'filesize';

import logo from '../../assets/images/simple-only-logo.png';
import mainDoctor from '../../assets/images/Online Doctor-bro.png';
import api from '../../services/api';
import { getLatLong } from '../../services/geocode';
import arraySpecialties from '../search/utils/specialties';
import Dropzone from './components/upload';
import FileList from './components/FileList';
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
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileInfo, setFileInfo] = useState([]);

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

        const adress = `${endereco}, ${cidade}, ${uf}`;
        const coordinates = await getLatLong(adress);

        await api.post("/cadastro", {
            nome,
            idade,
            genero,
            especialidade,
            registro,
            convenio,
            uf,
            cidade,
            endereco,
            tipoEndereco,
            telefone,
            email,
            bio,
            latitude: coordinates.latitude, // Latitude e Longitude is Default to Nova Fátima, but can change
            longitude: coordinates.longitude
        }).then(
            response => console.log(response.status)
        );
        history.push("/success");
    }

    const handleUpload = (files) => {

        const newUploadedFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }));
        
        setFileInfo(newUploadedFiles)
        setUploadedFiles(prevFiles => [...prevFiles, ...newUploadedFiles]);
          
    };
    
    useEffect(()=> {
        fileInfo[0]?.progress === 0 ?
        fileInfo.forEach(processUpload) :
        console.log(uploadedFiles)
        // eslint-disable-next-line
    },[uploadedFiles])
    
    const updateFile = (id, data) => {
        setUploadedFiles(uploadedFiles.map(uploadedFile => id === uploadedFile.id ? { ...uploadedFile, ...data }
            : uploadedFile ));    
    }

    const processUpload = (newUploadedFile) => {
        const data = new FormData();
        data.append('file', newUploadedFile.file, newUploadedFile.name);
        
        api.post('/file', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));
                               
                updateFile(newUploadedFile.id, {
                    progress,
                })
            }
        }).then(response => {
            console.log('resolveu')
            updateFile(newUploadedFile.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            });
        }).catch(erro => {
            console.log('erro',erro)
            updateFile(newUploadedFile.id, {
                error: true
            });
        });
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
                <div className="gender-types">
                    <label className="idade">Idade</label>
                    <input
                        type="number"
                        name="idade"
                        id="idade"
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

                <label className="especialidade">Especialidade</label>
                <select
                    defaultValue=" "
                    name="especialidade"
                    id="especialidade"
                    required
                    value={especialidade}
                    onChange={e => setEspecialidade(e.target.value)}
                >
                    <option value=" " disabled hidden > Selecione uma especialidade</option>
                    {
                        arraySpecialties.map((specialty) => {
                            return (
                                <option key={specialty} value={specialty}> {specialty}</option>
                            )
                        })
                    }
                </select>
                <label className="registro">Número de Registro</label>
                <input
                    type="number"
                    name="registro"
                    id="registro"
                    required
                    placeholder="N°de Registro"
                    value={registro}
                    onChange={e => setRegistro(e.target.value)}
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
                    <label className="cidade">Cidade
                    <select
                            id="city"
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
                <label className="telefone">Celular</label>
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

                <label className="email">E-mail</label>
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
                <input
                    type="text"
                    name="bio"
                    id="bio"
                    placeholder="Informações adicionais"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />

                <div className="dropzone">
                    <div className="dropzone-content">
                        <Dropzone onUpload={handleUpload} length={uploadedFiles.length}/>
                        { !!uploadedFiles.length && (
                            <FileList files={uploadedFiles}/>
                        ) }
                    </div>
                </div>

                <section className="add-actions">
                    <button onClick={handleClick}>Cancelar</button>
                    <button type="submit" >Cadastrar</button>
                </section>
            </form>
        </main>
    );
}

export default AddDoctor;

