import React from 'react';

import './styles.css';
import FilterOption from './components/filterOption';

function Filters(props) {

    return (
        <div id="filters-container">
            <FilterOption title="Raio" />
            <FilterOption title="Especialidade" />
            <FilterOption title="Cidade" />
        </div>
    )
}

export default Filters