import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import './styles.css';

function FilterOption({ title, children }) {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div id="filter-option">
            <div className="option">
                <p>{title}</p>
                <button onClick={() => setIsSelected(!isSelected)}>{!isSelected ? <FaChevronDown /> : <FaChevronUp />}</button>
            </div>
            {isSelected && children}
        </div>
    );
}

export default FilterOption;