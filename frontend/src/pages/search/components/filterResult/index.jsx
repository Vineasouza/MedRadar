import React from 'react';
import { FaTimes } from 'react-icons/fa'

import './styles.css';

const FilterResult = ({ data, handleClick }) => {

    return (
        <div id="filter-result-container">
            <button><FaTimes /></button>
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