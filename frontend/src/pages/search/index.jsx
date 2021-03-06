import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FiArrowLeft } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";

import "./styles.css";
import api from "../../services/api";
import logo from "../../assets/images/simple-only-logo.png";
import healthTeam from "../../assets/images/health-team-bro.png";
import Doctor from "./components/doctor";
import FilterOption from "./components/filterOption";
import DoctorMarker from "./components/doctorMarker";
import FilterResult from "./components/filterResult";
import NotFound from "./components/notFound";
import { manDoctor, womanDoctor } from "./components/icons/doctor";
import { getLatLong } from "../../services/geocode";
import arraySpecialties from "./utils/specialties";
import arrayHealthPlans from "./utils/healthPlans";

function Search() {

    const [isNotFound, setIsNotFound] = useState(false);
    const [initialPosition, setInitialPosition] = useState([0, 0]);

    const [centerMap, setCenterMap] = useState([0, 0]); // Center position of Map
    const [isFilter, setIsFilter] = useState(false);
    const [isApllyFilter, setIsApplyFilter] = useState(false);

    const [radius, setRadius] = useState(10);
    const [isUseRadius, setIsUseRadius] = useState(false);

    const [specialty, setSpecialty] = useState("");
    const [isUseSpecialty, setIsUseSpecialty] = useState(false);

    const [city, setCity] = useState("");
    const [isUseCity, setIsUseCity] = useState(false);

    const [age, setAge] = useState(25);
    const [isUseAge, setIsUseAge] = useState(false);

    const [healthPlan, setHealthPlan] = useState("");
    const [isUseHealthPlan, setIsUseHealthPlan] = useState(false);

    const [uf, setUf] = useState("");

    //Datas about doctors
    const [doctors, setDoctors] = useState([]);
    //Doctor in the view
    const [doctorsInView, setDoctorsInView] = useState([]);

    // Datas from IBGE
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
            setCenterMap([latitude, longitude]);
        });

        axios
            .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((resp) => {
                setUfs([...resp.data]);
            });
    }, []);

    /* 
        Call the API when get the 
        current position of User
    */
    useEffect(() => {
        api.get("/procurar", {
            params: {
                latitude: initialPosition[0],
                longitude: initialPosition[1],
            },
        }).then((resp) => {
            setDoctors(resp.data);
        });
    }, [initialPosition]);

    useEffect(() => {
        setDoctorsInView(doctors);
    }, [doctors]);

    useEffect(() => {
        axios
            .get(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
            )
            .then((resp) => {
                setCities([...resp.data]);
            });
    }, [uf]);

    useEffect(() => {
        async function updateFilter() {
            await callAPI();
        }
        if (isApllyFilter) {
            updateFilter();
        }
        // eslint-disable-next-line
    }, [isUseCity, isUseSpecialty, isUseRadius, isApllyFilter, isUseAge, isUseHealthPlan]);

    function handleRange(operation) {
        const operations = {
            sum: function (value) {
                return value + 1;
            },
            sub: function (value) {
                return value - 1;
            },
        };

        return operations[operation];
    }

    function handleSpecialty(event) {
        setSpecialty(event.target.value);
        setIsUseSpecialty(true);
    }

    function handleCity(event) {
        setCity(event.target.value);
        setIsUseCity(true);
    }

    function handleHealthPlan(event) {
        setHealthPlan(event.target.value);
        setIsUseHealthPlan(true);
    }

    function handleNameDoctor(event) {
        console.log(event.target.value);
        const regex = new RegExp(`(Dr(a)?(.)?)?${event.target.value}`, "i");
        // eslint-disable-next-line
        const doctorsNew = doctors.filter((doctor) => {
            if (regex.test(doctor.nome)) {
                return doctor;
            }
        });

        setDoctorsInView(doctorsNew);
    }

    function handleClickToDoFilter() {
        setIsFilter(!isFilter);
        setUf("");
    }

    async function handleDoingFilter() {
        setIsFilter(false);

        if (radius !== 10) {
            setIsUseRadius(true);
        }
        if (age !== 25) {
            setIsUseAge(true);
        }
        setIsApplyFilter(true);
    }

    async function callAPI() {
        var query = await buildQuery();

        try {
            const doctorsResult = await api.get("/procurar", {
                params: query,
            });
            if (isNotFound) {
                setIsNotFound(false);
            }
            setDoctors(doctorsResult.data);
        } catch (error) {
            setIsNotFound(true);
        }
    }

    async function buildQuery() {
        var newQuery = {};
        if (!isUseCity && !isUseRadius && !isUseSpecialty && !isUseAge && !isUseHealthPlan) {
            newQuery.latitude = initialPosition[0];
            newQuery.longitude = initialPosition[1];
            setCenterMap([initialPosition[0], initialPosition[1]]);
        } else {

            if (isUseCity) {
                newQuery.city = city;
                const adress = `${city}, ${uf}`;
                const coordinates = await getLatLong(adress);
                newQuery.latitude = coordinates.latitude;
                newQuery.longitude = coordinates.longitude;
                setCenterMap([coordinates.latitude, coordinates.longitude]);
            } else {
                newQuery.latitude = initialPosition[0];
                newQuery.longitude = initialPosition[1];
            }

            if (isUseSpecialty) {
                newQuery.specialty = specialty;
            }

            if (isUseRadius) {
                newQuery.radius = radius;
            }

            if (isUseAge) {
                newQuery.age = age;
            }

            if (isUseHealthPlan) {
                newQuery.healthPlan = healthPlan;
            }
        }

        return newQuery;
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
                    <div className="search-box">
                        <input type="text" onChange={handleNameDoctor} />
                        <FaSearch />
                    </div>

                    <div className="search-filters-results">
                        {isUseRadius && (
                            <FilterResult
                                data={{
                                    type: "radius",
                                    value: radius,
                                }}
                                onSetUse={setIsUseRadius}
                                onSetValue={setRadius}
                            />
                        )}
                        {isUseSpecialty && (
                            <FilterResult
                                data={{
                                    type: "specialty",
                                    value: specialty,
                                }}
                                onSetUse={setIsUseSpecialty}
                                onSetValue={setSpecialty}
                            />
                        )}
                        {isUseCity && (
                            <FilterResult
                                data={{
                                    type: "city",
                                    value: city,
                                }}
                                onSetUse={setIsUseCity}
                                onSetValue={setCity}
                            />
                        )}
                        {isUseAge && (
                            <FilterResult
                                data={{
                                    type: "age",
                                    value: age
                                }}
                                onSetUse={setIsUseAge}
                                onSetValue={setAge}
                            />
                        )}
                        {isUseHealthPlan && (
                            <FilterResult
                                data={{
                                    type: "healthPlan",
                                    value: healthPlan
                                }}
                                onSetUse={setIsUseHealthPlan}
                                onSetValue={setHealthPlan}
                            />
                        )}
                    </div>

                    <div className="search-filters">
                        <button onClick={handleClickToDoFilter}>
                            Filtrar busca
                            <FaFilter />{" "}
                        </button>
                        {
                            // Starting the filter
                            isFilter && (
                                <div id="filters-container">
                                    <FilterOption title="Raio">
                                        <div className="input-range">
                                            <button
                                                name="sub"
                                                onClick={() => {
                                                    const doOperation = handleRange("sub");

                                                    const newRadius = doOperation(radius);
                                                    setRadius(newRadius);
                                                }}
                                            >
                                                <FaMinus />
                                            </button>
                                            <p>{radius} Km</p>
                                            <button
                                                name="sum"
                                                onClick={() => {
                                                    const doOperation = handleRange("sum");

                                                    const newRadius = doOperation(radius);
                                                    setRadius(newRadius);
                                                }}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </FilterOption>
                                    <FilterOption title="Especialidade">
                                        <div className="input-select">
                                            <select
                                                id="specialty"
                                                defaultValue=" "
                                                onChange={handleSpecialty}
                                            >
                                                <option
                                                    value=" "
                                                    disabled
                                                    hidden
                                                >
                                                    {" "}
                                                    Selecione uma especialidade
                                                </option>
                                                {/* <option value="Dermatologista"> Dermatologista</option> */}
                                                {arraySpecialties.map(
                                                    (specialty) => {
                                                        return (
                                                            <option
                                                                key={specialty}
                                                                value={
                                                                    specialty
                                                                }
                                                            >
                                                                {" "}
                                                                {specialty}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </FilterOption>
                                    <FilterOption title="Cidade">
                                        <div id="input-city">
                                            <select
                                                id="uf"
                                                defaultValue=" "
                                                onChange={(e) => {
                                                    setUf(e.target.value);
                                                }}
                                            >
                                                <option
                                                    value=" "
                                                    disabled
                                                    hidden
                                                >
                                                    UF
                                                </option>
                                                {ufs.map((uf) => {
                                                    return (
                                                        <option
                                                            key={uf.id}
                                                            value={uf.sigla}
                                                        >
                                                            {uf.sigla}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <select
                                                id="city"
                                                defaultValue=" "
                                                onChange={handleCity}
                                            >
                                                <option
                                                    value=" "
                                                    disabled
                                                    hidden
                                                >
                                                    Cidade
                                                </option>
                                                {cities.map((city) => {
                                                    return (
                                                        <option
                                                            key={city.id}
                                                            value={city.nome}
                                                        >
                                                            {city.nome}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </FilterOption>
                                    <FilterOption title="Idade">
                                        <div className="input-range">
                                            <button
                                                name="sub"
                                                onClick={() => {
                                                    const doOperation = handleRange("sub");

                                                    const newAge = doOperation(age);
                                                    setAge(newAge);
                                                }}
                                            >
                                                <FaMinus />
                                            </button>
                                            <p>{age}</p>
                                            <button
                                                name="sum"
                                                onClick={() => {
                                                    const doOperation = handleRange("sum");

                                                    const newAge = doOperation(age);
                                                    setAge(newAge);
                                                }}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </FilterOption>
                                    <FilterOption title="Plano de saúde">
                                        <div className="input-select">
                                            <select
                                                id="healthPlans"
                                                defaultValue=" "
                                                onChange={handleHealthPlan}
                                            >
                                                <option
                                                    value=" "
                                                    disabled
                                                    hidden
                                                >
                                                    {" "}
                                                    Selecione um plano de saúde
                                                </option>
                                                {
                                                    arrayHealthPlans.map(
                                                        (healthPlan) => {
                                                            return (
                                                                <option
                                                                    key={healthPlan}
                                                                    value={healthPlan}
                                                                >
                                                                    {healthPlan}
                                                                </option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </FilterOption>
                                    <button onClick={handleDoingFilter}>
                                        Aplicar filtro
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </section>
            </header>


            {
                isNotFound ?
                    <NotFound />
                    : <main id="search-main">
                        <section className="search-result">
                            {/* Part of resutlts */}
                            <div>
                                {
                                    doctorsInView.map((doctor, index) => {
                                        return (
                                            <Doctor
                                                id={doctor._id}
                                                key={index}
                                                name={doctor.nome}
                                                specialty={doctor.especialidade}
                                                distance={radius}
                                                image={doctor.image}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </section>

                        {/* Part of MAP*/}
                        <section className="search-map">
                            <Map center={centerMap} zoom={15}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    doctorsInView.map((doctor, index) => {

                                        const positionDoctorInMap = doctor.location.coordinates;

                                        return (
                                            <Marker
                                                key={index}
                                                position={[positionDoctorInMap[1], positionDoctorInMap[0]]}
                                                draggable={false}
                                                icon={doctor.genero === "masculino" ? manDoctor : womanDoctor}>
                                                <Popup>
                                                    <DoctorMarker
                                                        id={doctor._id}
                                                        name={doctor.nome}
                                                        specialty={doctor.especialidade}
                                                        image={doctor.image}
                                                    />
                                                </Popup>
                                            </Marker>
                                        );
                                    })
                                }
                            </Map>
                        </section>
                    </main>
            }
        </div>
    );
}

export default Search;
