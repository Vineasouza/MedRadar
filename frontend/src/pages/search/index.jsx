import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';
import Doctor from './components/doctor';
import FilterOption from './components/filterOption'
import DoctorMarker from './components/doctorMarker';
import FilterResult from './components/filterResult';
import doctorIcon from './components/iconDoctor/Icon';

function Search() {

    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [centerMap, setCenterMap] = useState([0, 0]); // Center position of Map
    const [isFilter, setIsFilter] = useState(false);
    const [isApplyFilter, setIsApplyFilter] = useState(false);
    const [radius, setRadius] = useState(10);
    const [specialty, setSpecialty] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [doctors, setDoctors] = useState([]);

    // Datas from IBGE
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
            setCenterMap([latitude, longitude]);
        });

        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(
            (resp) => {
                setUfs([...resp.data]);
            }
        );

    }, []);

    /* 
        Call the API when get the 
        current position of User
    */
    useEffect(() => {
        api.get("/procurar", {
            params: {
                latitude: initialPosition[0],
                longitude: initialPosition[1]
            }
        }
        ).then(resp => {
            setDoctors(resp.data);
        });
    }, [initialPosition])

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(
            (resp) => {
                setCities([...resp.data]);
            }
        );
    }, [uf])

    useEffect(() => {

        var query = {};

        if (city === "" && specialty === "") {
            setIsApplyFilter(false);
            query.latitude = initialPosition[0];
            query.longitude = initialPosition[1];
        }

        if (isApplyFilter) {

            if (specialty !== "") {
                query.specialty = specialty;
            }

            if (city !== "") {
                query.city = city;
            }

        }

        // Calling API to get datas with FILTER
        api.get("/procurar", {
            params: query
        }).then((response) => {
            setDoctors(response.data);
        })

    }, [isApplyFilter, city, specialty]);

    function handleRadius(operation) {

        let newRadius;
        if (operation === "sum") {
            newRadius = radius + 1;
        } else {
            newRadius = radius - 1;
        }

        setRadius(newRadius);
    }

    function hanleApplyFilter() {

        setIsFilter(false);
        if (radius === 10 && specialty === "" && city === "") {
            return;
        }

        setIsApplyFilter(true);
    }

    function handleDeleleFilterOption(type) {
        switch (type) {
            case "radius":
                setRadius(10);
                break;
            case "specialty":
                setSpecialty("");
                break;
            case "city":
                setCity("");
                break;
            default:
                return;
        }
    }

    function handleClickToDoFilter() {
        setIsFilter(!isFilter);
        setUf("");
    }
    return (
        <div id="search-page">

            <header>
                <section className="search-intro">
                    <div>
                        <Link to="/main-initial">
                            <FiArrowLeft />
                        </Link>
                        <img src={logo} alt="logo MedRadar" />
                    </div>
                    <img src={healthTeam} alt="grupo de profissionais"></img>
                </section>

                <section className="search-actions">
                    <button>Pesquisar <FiSearch /></button>

                    <div className="search-filters-results">
                        {
                            isApplyFilter && radius !== 10 && <FilterResult
                                data={
                                    {
                                        type: "radius",
                                        value: radius
                                    }
                                }
                                handleClick={handleDeleleFilterOption}
                            />
                        }
                        {
                            isApplyFilter && specialty !== "" && < FilterResult
                                data={
                                    {
                                        type: "specialty",
                                        value: specialty
                                    }
                                }
                                handleClick={handleDeleleFilterOption}
                            />
                        }
                        {
                            isApplyFilter && city !== "" && < FilterResult
                                data={
                                    {
                                        type: "city",
                                        value: city
                                    }
                                }
                                handleClick={handleDeleleFilterOption}
                            />
                        }
                    </div>

                    <div className="search-filters">
                        <button onClick={handleClickToDoFilter}>Filtrar busca<FaFilter /> </button>
                        {
                            // Starting the filter
                            isFilter &&
                            <div id="filters-container">
                                <FilterOption title="Raio">
                                    <div className="input-radius">
                                        <button name="sum" onClick={() => { handleRadius('sub') }}><FaMinus /></button>
                                        <p>{radius} Km</p>
                                        <button name="sub" onClick={() => { handleRadius('sum') }}><FaPlus /></button>
                                    </div>
                                </FilterOption>
                                <FilterOption title="Especialidade">
                                    <div id="input-specialty">
                                        <select id="specialty" onChange={(e) => { setSpecialty(e.target.value) }}>
                                            <option value="Dermatologista"> Dermatologista</option>
                                            <option value="Cardiologista"> Cardiologista</option>
                                        </select>
                                    </div>
                                </FilterOption>
                                <FilterOption title="Cidade" >
                                    <div id="input-city">
                                        <select
                                            id="city"
                                            defaultValue=" "
                                            onChange={(e) => { setCity(e.target.value) }}
                                        >
                                            <option value=" " disabled hidden >Cidade</option>
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
                                        <select
                                            id="uf"
                                            defaultValue=" "
                                            onChange={(e) => { setUf(e.target.value) }}
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
                                    </div>
                                </FilterOption>
                                <button onClick={hanleApplyFilter}>Aplicar filtro</button>
                            </div>
                        }
                    </div>

                </section>
            </header>

            <main id="search-main">
                <section className="search-result">

                    {/* Part of resutlts */}
                    <div>
                        {
                            doctors.map((doctor, index) => {
                                return (
                                    <Doctor
                                        key={index}
                                        name={doctor.nome}
                                        specialty={doctor.especialidade}
                                        distance={radius}
                                        image="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                    />
                                )
                            })
                        }
                    </div>
                </section>

                { /* Part of MAP*/}
                <section className="search-map">
                    <Map center={centerMap} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            doctors.map((doctor, index) => {

                                const positionDoctorInMap = doctor.location.coordinates;

                                return (
                                    <Marker
                                        key={index}
                                        position={[positionDoctorInMap[1], positionDoctorInMap[0]]}
                                        draggable={false}
                                        icon={doctorIcon}>
                                        <Popup>
                                            <DoctorMarker
                                                name={doctor.nome}
                                                specialty={doctor.especialidade}
                                                image="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                            />
                                        </Popup>
                                    </Marker>
                                );
                            })
                        }
                    </Map>
                </section>

            </main>
        </div >
    )
}

export default Search;