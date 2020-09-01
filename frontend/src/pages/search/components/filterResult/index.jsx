import React from 'react';
import { FaTimes } from 'react-icons/fa'

import './styles.css';

const FilterResult = ({ data, handleClick }) => {

    return (
        <div id="filter-result-container">
            <button onClick={() => { handleClick(data.type) }}><FaTimes /></button>
            <p>
                {
                    data.type === "radius"
                        ? `${data.value} km`
                        : data.value
                }
            </p>
        </div>
    )
}

export default FilterResult;