import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import face from './Logo.png'

const Logo = () => {

    return (
        <Tilt tiltReverse={true} className="Tilt br2 ma4 mt0 "  >
            <img src={face} alt={"smart-face logo"}/>
        </Tilt>
    )
}

export default Logo;