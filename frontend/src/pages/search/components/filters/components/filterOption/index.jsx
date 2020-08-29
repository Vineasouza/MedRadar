import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import './styles.css';

function FilterOption({ title }, props) {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div id="filter-option">
            <div className="option">
                <p>{title}</p> <button onClick={() => setIsSelected(!isSelected)}>{!isSelected ? <FaChevronDown /> : <FaChevronUp />}</button>
            </div>
        </div>
    );
}

export default FilterOption;