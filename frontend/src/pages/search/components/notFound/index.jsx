import React from "react";
import { HiOutlineEmojiSad } from "react-icons/hi"

import "./styles.css";

function NotFound() {
    return (
        <div id="not-found-container">
            <h1>Desculpa, nenhum médico encontrado  <HiOutlineEmojiSad /></h1>
        </div>
    )
}

export default NotFound;