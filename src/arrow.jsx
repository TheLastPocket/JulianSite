import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import './arrow.css'                                  
import channelMetadata from "./channelMetadata.json"
import menuHoverSound from './assets/sounds/menuHover.mp3'
import arrowClickSound from './assets/sounds/arrowClick.mp3'


let currentX = 0;
export default function Arrow({ direction, arrowSrc, signSrc, scrollIndex, scrollState, setScrollState, channelState, style}) {

    const signEnterTime = useRef(null);
    const [arrowEntered, setArrowEntered] = useState(false);
    const [signEntered, setSignEntered] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(false);

    const [entered, setEntered] = useState(false)

    const container = document.querySelector('.channels-container');

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

    const handleScroll = (direction) => {
        if(!arrowClicked && entered){
            const arrow_click_sound = new Audio(arrowClickSound);
            arrow_click_sound.play();
            
            setArrowClicked(true);

            currentX += direction === "next" ? -85 : 85;
            container.style.transform = `translateX(${currentX}vw)`;
            
            setScrollState({
                page: scrollState.page + (direction === "next" ? 1 : -1),
                direction: direction
            })

            setTimeout(() => {
                setArrowClicked(false);
            }, 400);
        }
    };

    const handleContainerAnimationEnd = (e) => {
        // only triggers on animation end, fnishing edgeReturning process
        if (e.animationName === "edge-slide-thin-reverse") {
            setEdgeReturning(false);
        }
    };

    const atEdge = (direction === "prev" && scrollState.page == 0) ||
        (direction === "next" && scrollState.page == channelMetadata.const.number_of_pages - 1);

    const wasAtEdge = useRef(atEdge);
    const [edgeReturning, setEdgeReturning] = useState(false);

    useEffect(() => {
        //Only slide back in when we just left the edge (was hidden, now shown again)
        if (wasAtEdge.current && !atEdge) {
            //currently scrolling back
            setEdgeReturning(true);
        }
        wasAtEdge.current = atEdge;
    }, [atEdge]);

    

    return (
        <div className={`${direction}-container
                ${channelState.state === "selected" ? "channel-select" : ""}
                ${atEdge ? `${direction}-edge` : ""}
                ${edgeReturning ? `${direction}-edge-return` : ""}`}
            style={collectiveStyle}
            onAnimationEnd={handleContainerAnimationEnd}>
            <div className={`${direction}-sign-hitbox`}
                onMouseEnter={handleSignEnter}
                onMouseLeave={handleSignLeave}
                onClick={() => handleScroll(direction)}>
                <img src={signSrc}
                    className={`${direction}-sign ${signEntered ? "visible" : "hidden"}
                        ${arrowClicked ? "click" : ""}
                        ${atEdge ? "edge-shrink" : ""}`
                    }/>
            </div>
            <div className={`${direction}-arrow-hitbox`}
                onMouseEnter={handleArrowEnter}
                onMouseLeave={handleArrowLeave}
                onClick={() => handleScroll(direction)}>
                    <img src={arrowSrc}
                    className={`${direction}-arrow ${(arrowEntered) ? "enter" : ""}
                        ${!signEntered ? "leave" : ""}`}/>
            </div>
        </div>
    )
}