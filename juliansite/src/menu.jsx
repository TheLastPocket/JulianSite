import { useState, useEffect, useRef } from 'react'

import RenderTime, { RenderDate } from './time.jsx'

import homeMenuBottomLeft from './assets/menu/homeMenuBottomLeft.png'
import homeMenuBottomMiddle from './assets/menu/homeMenuBottomMiddle.png'
import homeMenuBottomRight from './assets/menu/homeMenuBottomRight.png'

import homeMenuBackground from './assets/menu/HomeMenuBackground.jpg'
import MailButton from './assets/menu/MailButton.png'
import './menu.css'
import Arrow from './arrow.jsx'

import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'

import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'
import nextArrow from './assets/menu/NextArrow.png'
import prevArrow from './assets/menu/PrevArrow.png'
import nextSign from './assets/menu/NextSign.png'
import prevSign from './assets/menu/PrevSign.png'

export default function Menu({ channelState , scrollState, setScrollState}) {
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const [showColon, setShowColon] = useState(true);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const scroll_index = 1;

    // Colon flashing every second
    useEffect(() => {
        const colonInterval = setInterval(() => {
            setShowColon((prev) => !prev);
        }, 1000);

        return () => {
            clearInterval(colonInterval);
        };
    }, []);

    const handleNext = () => {
        setNext(true);
        
        setTimeout(() => {
            setNext(false);   
        }, 400);
    }

    const handlePrev = () => {
        setPrev(true);
        
        setTimeout(() => {
            setPrev(false);   
        }, 400);
    }

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

                <Arrow 
                    direction={"prev"}
                    arrowSrc={prevArrow}
                    signSrc={prevSign}
                    scroll_index={scroll_index}
                    scrollState={scrollState}
                    setScrollState={setScrollState}
                    onClick={() => {
                        handlePrev();
                    }}
                    style= {{
                        position: "absolute",
                        top: "24vh",
                        left: "0vw"
                    }}
                />

                <Arrow 
                    direction={"next"}
                    arrowSrc={nextArrow}
                    signSrc={nextSign}
                    scroll_index={scroll_index}
                    scrollState={scrollState}
                    setScrollState={setScrollState} 
                    onClick={() => {
                        handleNext();
                    }}
                    style={{
                        position: "absolute", 
                        right: "-1vw",
                        top: "24vh"
                    }}/>

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


