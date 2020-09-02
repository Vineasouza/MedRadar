import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';

import './styles.css';
import logo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-bro.png';
import Doctor from './components/doctor';
import FilterOption from './components/filterOption'
import DoctorMarker from './components/doctorMarker';
import FilterResult from './components/filterResult';
import doctorIcon from './components/iconDoctor/Icon';

function Search() {

    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [isFilter, setIsFilter] = useState(false);
    const [isApplyFilter, setIsApplyFilter] = useState(false);
    const [radius, setRadius] = useState(10);
    const [specialty, setSpecialty] = useState("")
    const [city, setCity] = useState("");


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, [])


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
                        <button onClick={() => { setIsFilter(!isFilter) }}>Filtrar busca<FaFilter /> </button>
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
                                        <select id="city" onChange={(e) => { setCity(e.target.value) }} defaultValue="">
                                            <option value="" selected hidden >Cidade</option>
                                            <option value="Chicago"> Chicago</option>
                                            <option value="Boston"> Boston</option>
                                        </select>
                                        <select id="uf" defaultValue="">
                                            <option value="" selected hidden className="first-option" >UF</option>
                                            <option value="PR"> PR</option>
                                            <option value="SP"> SP</option>
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
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <Doctor
                            name="Dr. Roberta"
                            specialty="Dermatologista"
                            distance="5 Km"
                            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                    </div>
                </section>

                { /* Part of MAP*/}
                <section className="search-map">
                    <Map center={initialPosition} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.4444548, -50.5653303]} draggable={false} icon={doctorIcon}>
                            <Popup>
                                <DoctorMarker
                                    name="Dr. Joana"
                                    specialty="Cardiologista"
                                    image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                />
                            </Popup>
                        </Marker>
                    </Map>
                </section>

            </main>
        </div >
    )
}

export default Search;