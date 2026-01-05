import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import './arrow.css'                                  
import channelMetadata from "./channelMetadata.json"
import menuHoverSound from './assets/sounds/MenuHover.mp3'
import arrowClickSound from './assets/sounds/arrowClick.mp3'

export default function Arrow({ direction, arrowSrc, signSrc, scrollIndex, onScroll, style}) {

    const signEnterTime = useRef(null);
    const [arrowEntered, setArrowEntered] = useState(false);
    const [signEntered, setSignEntered] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(false);

    const [entered, setEntered] = useState(false)

    const collectiveStyle = {
        ...style,
        width: "29vh",
        height: "30%"
    };

    const handleArrowEnter = () => {

        const music = new Audio(menuHoverSound);
        music.play();
        setArrowEntered(true);
        setTimeout(() => {
            /* The sign bubble starts to grow when the arrow is at its smallest */
                setSignEntered(true);
        }, 50);
        setEntered(true);
    };

    const handleArrowLeave = () => {
        setArrowEntered(false);
    };

    const handleSignEnter = () => {
        if(entered){
            setSignEntered(true);
        }
    };

    const handleSignLeave = () => {
        setSignEntered(false);
        setEntered(false);
    };

    const handleSignClick = () => {
        if(!arrowClicked && entered){
            const arrow_click_sound = new Audio(arrowClickSound);
            arrow_click_sound.play();
            setArrowClicked(true);
            onScroll();
            setTimeout(() => {
                setArrowClicked(false);   
            }, 400);
        }
    };

    return (
        <div className={`${direction}-container`}
            style={collectiveStyle}>
            <div className={`${direction}-sign-hitbox`}
                onMouseEnter={handleSignEnter}
                onMouseLeave={handleSignLeave}
                onClick={handleSignClick}>
                <img src={signSrc} 
                    className={`${direction}-sign ${signEntered ? "visible" : "hidden"} 
                        ${arrowClicked ? "click" : ""}`}/>
            </div>
            <div className={`${direction}-arrow-hitbox`}
                onMouseEnter={handleArrowEnter}
                onMouseLeave={handleArrowLeave}
                onClick={handleSignClick}>
                    <img src={arrowSrc}
                    className={`${direction}-arrow ${(arrowEntered) ? "enter" : ""} 
                        ${!signEntered ? "leave" : ""}`}/>
            </div>
        </div>
    )
}