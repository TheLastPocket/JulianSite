import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import './arrow.css'
import next from './assets/menu/Next.png'
import nextSign from './assets/menu/NextSign.png'
import channelMetadata from "./channelMetadata.json"
import menuHoverSound from './assets/sounds/MenuHover.mp3'

export default function NextArrow({ scroll_index }) {

    const signEnterTime = useRef(null);
    const [arrowEntered, setArrowEntered] = useState(false);
    const [signEntered, setSignEntered] = useState(false);

    const [entered, setEntered] = useState(false)

    const nextArrowEnter = () => {

        const music = new Audio(menuHoverSound);
        music.play();
        setArrowEntered(true);
        signEnterTime.current = setTimeout(() => {
            /* The sign bubble starts to grow when the arrow is at its smallest */
                setSignEntered(true);
        }, 50);
        setEntered(true);
    };

    const nextArrowLeave = () => {

        setArrowEntered(false);
    };

    const nextSignEnter = () => {
        if(entered){
            setSignEntered(true);
        }
    };

    const nextSignLeave = () => {
        setSignEntered(false);
        setEntered(false);
    };

    return (
        <div className="next-container">
            <div className="next-sign-hitbox"
                onMouseEnter={nextSignEnter}
                onMouseLeave={nextSignLeave}>
                <img src={nextSign} 
                    className={`next-sign ${signEntered ? "visible" : "hidden"}`}/>
            </div>
            <div className="next-arrow-hitbox"
                onMouseEnter={nextArrowEnter}
                onMouseLeave={nextArrowLeave}>
                    <img src={next} 
                    className={`next-arrow ${(arrowEntered) ? "enter" : ""} ${!signEntered ? "leave" : ""}`}/>
                    {/* className={`next-arrow ${(arrowEntered) ? "enter" : ""}`}/> */}

            </div>
            
        </div>
    )
}