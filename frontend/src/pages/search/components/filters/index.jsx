import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa'

import './styles.css';
import FilterOption from './components/filterOption';

function Filters(props) {

    const [radius, setRadius] = useState(10);


    function handleRadius(operation) {

        let newRadius;
        if (operation === "sum") {
            newRadius = radius + 1;
        } else {
            newRadius = radius - 1;
        }

        setRadius(newRadius);
    }

    return (
        <div id="filters-container">
            <FilterOption title="Raio">
                <div className="input-radius">
                    <button name="sum" onClick={() => { handleRadius('sub') }}><FaMinus /></button>
                    <p>{radius} Km</p>
                    <button name="sub" onClick={() => { handleRadius('sum') }}><FaPlus /></button>
                </div>
            </FilterOption>
            <FilterOption title="Especialidade" />
            <FilterOption title="Cidade" />
        </div>
    )
}

export default Filters