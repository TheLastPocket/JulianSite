import { useState, useEffect, useRef } from 'react'

import RenderTime, { RenderDate } from './time.jsx'

import homeMenuBottomLeft from './assets/menu/homeMenuBottomLeft.png'
import homeMenuBottomMiddle from './assets/menu/homeMenuBottomMiddle.png'
import homeMenuBottomRight from './assets/menu/homeMenuBottomRight.png'

import homeMenuBackground from './assets/menu/HomeMenuBackground.jpg'
import MailButton from './assets/menu/MailButton.png'
import './menu.css'


import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'

import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'

export default function Menu({ channelState }) {
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const [showColon, setShowColon] = useState(true);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // Colon flashing every second
    useEffect(() => {
        const colonInterval = setInterval(() => {
            setShowColon((prev) => !prev);
        }, 1000);

        return () => {
            clearInterval(colonInterval);
        };
    }, []);

    //Hovering over button on bottom bar
    const handleMenuHover = () => {
        //Play sound for entering button hitbox
        const music = new Audio(menuHoverSound);
        music.play();

        tooltipTime.current = setTimeout(() => {
            //Play sound for staying in the toolbox for a certain time
            tooltipShow.current.play();
            //Show tooltip 
            setTooltipVisible(true);
        }, 300);
    };

    //Leaving hitbox of button
    const handleMenuLeave = () => {
        //Clear tooltip
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        setTooltipVisible(false);
    }


    return (
        <div>
            {/* Black background when you select a channel */}
            {/* <img src={channelSelectBackground} className={`channel-select-background ${channelState.state === "selected" ? "selected" : "unselected"}`} /> */}

            <div className={`combined-home-screen ${channelState.state}`}>
                <img src={homeMenuBackground} alt="Background" className="background" />

                <div className="bottom">
                    <div className="bottom-bar">
                        <img src={homeMenuBottomLeft} 
                            alt="Bottom-Left-Bar" 
                            className="bottom-bar-left" />
                        <div className="bottom-bar-middle-div">
                            <img src={homeMenuBottomMiddle} 
                                alt="Bottom-Middle-Bar" 
                                className="bottom-bar-middle" />
                            <RenderTime show_colon={showColon} />
                            <RenderDate />
                        </div>
                        <div className="bottom-bar-right-div">
                            <img src={homeMenuBottomRight} 
                                alt="Bottom-Right-Bar" 
                                className="bottom-bar-right" />
                            <img src={MailButton} 
                                alt="MailButton" 
                                className="mail-button" 
                                onMouseEnter={handleMenuHover} 
                                onMouseLeave={handleMenuLeave} />
                        </div>
                        {/* <div className={`mail-tooltip ${tooltipVisible ? 'visible' : 'hidden'}`}>
                            <img className={`mail-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'}`}
                                src={tooltipBackground} />
                            <p className={`mail-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Message Board</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


