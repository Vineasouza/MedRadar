import React from 'react';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import MedRadarLogo from '../../assets/images/simple-only-logo.png';
import healthTeam from '../../assets/images/health-team-2.png';



import './styles.css';


function SaibaMais() {
    return (
        <main>
            <div className="back-button">
                <Link to="/main-initial">
                    <FiArrowLeft />
                </Link>
            </div>
            <img src={healthTeam} className="healthTeam" alt="Doctor Team" />
            <div className="container">   
                <img src={MedRadarLogo} className="medradarlogo" alt="MedRadar Logo" />
                <div className="content">
                    <div className="rating">
                        {/* https://material-ui.com/pt/components/rating/ */}
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="rating" defaultValue={2.5} precision={0.5} size="medium"/>
                        </Box>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SaibaMais;