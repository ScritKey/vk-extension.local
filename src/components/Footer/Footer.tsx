import React from 'react';
import './Footer.scss';
import { Accelerometer } from "./Accelerometer";
import { DeviceMotion } from "./DeviceMotion";
import { Gyroscope } from "./Gyroscope";
import { ScrollTop } from "./ScrollTop";

const Footer = () => {
    return (
        <div className="footer-root">
            <div className="footerBlock">
                <div className="sensorsWrap">
                    <Accelerometer/>
                    <DeviceMotion/>
                    <Gyroscope/>
                </div>
            </div>
            <div className="footerBlock">
                <div className="footerBlock">
                    <div className="sensorsWrap">
                        <ScrollTop/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;