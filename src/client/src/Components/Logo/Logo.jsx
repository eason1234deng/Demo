import React from 'react';
import Tilt from 'react-parallax-tilt';
import constants from '../../constants/constants';
import './styles.scss';

const Logo = () => {
    return (
        <div className='ma4 wrapper'>
            <Tilt
                className="parallax-effect-img"
                tiltMaxAngleX={50}
                tiltMaxAngleY={50}
                perspective={500}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope
            >
                <img src={constants.LOGO} className="inner-element" alt="pic"/>
            </Tilt>
        </div>
    )
};

export default Logo; 