import React from 'react';
import './styles.css';
import { FaTimes } from "react-icons/fa";

const FilterResult = ({ data, onSetUse, onSetValue }) => {

    return (
        <div id="filter-result-container">
            <p>
                {
                    data.type === "radius"
                        ? `${data.value} km`
                        : data.type === "age"
                            ? `${data.value} anos`
                            : data.value
                }
            </p>
            <button onClick={() => {
                onSetUse(false)
                if (isNaN(data.value)) {
                    onSetValue("");
                } else {
                    if (data.type === "radius") {
                        onSetValue(10);
                    } else {
                        // Default to field AGE
                        onSetValue(25)
                    }
                }
            }}>
                <FaTimes />
            </button>
        </div >
    )
}

export default FilterResult;