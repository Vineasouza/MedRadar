import React from "react";
import { HiOutlineEmojiSad } from "react-icons/hi"
import Error from '../../../../assets/images/404error.png'

import "./styles.css";

function NotFound() {
    return (
        <div id="container">
            <img src={Error} alt="logo" />
            <div id="not-found-container">
                <h1>Desculpa, nenhum médico encontrado  <HiOutlineEmojiSad /></h1>
            </div>
        </div>
    )
}

export default NotFound;