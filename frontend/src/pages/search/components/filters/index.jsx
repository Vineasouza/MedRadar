import React from 'react';

import './styles.css';

function Filters(props) {

    return (
        <div id="filters-container">
            {props.children}
        </div>
    )
}

export default Filters