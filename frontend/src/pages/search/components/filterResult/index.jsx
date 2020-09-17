import React from 'react';
import './styles.css';

const FilterResult = ({ data, children }) => {

    return (
        <div id="filter-result-container">
            {children}
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