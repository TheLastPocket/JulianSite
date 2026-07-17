import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import './arrow.css'                                  
import channelMetadata from "./channelMetadata.json"
import menuHoverSound from './assets/sounds/menuHover.mp3'
import arrowClickSound from './assets/sounds/arrowClick.mp3'


let currentX = 0;
export default function Arrow({ direction, arrowSrc, signSrc, scrollIndex, scrollState, setScrollState, channelState}) {

    const signEnterTime = useRef(null);
    const [arrowEntered, setArrowEntered] = useState(false);
    const [signEntered, setSignEntered] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(false);

    const [entered, setEntered] = useState(false)

    const container = document.querySelector('.channels-container');

    const containerRef = useRef(null);
    const [homePos, setHomePos] = useState({ x: 0, y: 0 });

    /* Measure the arrow's own resting screen position once on mount (before any
    zoom transform is applied), so channel-select-slide can compute the exact
    scale+translate that cancels .zoom-wrapper's transform and lands it back here. */
    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setHomePos({
            x: ((rect.left + rect.right) / 2 / window.innerWidth) * 100,
            y: ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100,
        });
    }, []);

    const collectiveStyle = {
        width: "29vh",
        height: "30%",
        '--arrow-home-x': `${homePos.x}vw`,
        '--arrow-home-y': `${homePos.y}vh`,
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

            const newPage = scrollState.page + (direction === "next" ? 1 : -1);
            const page = container.querySelector('.channel-grid-1');
            
            /* calculates scroll based on current channel grid size*/
            const pageWidthVw = page.getBoundingClientRect().width / window.innerWidth * 100;

            currentX = -newPage * pageWidthVw;
            container.style.transform = `translateX(${currentX}vw)`;

            setScrollState({
                page: newPage,
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
        <div ref={containerRef} className={`${direction}-container
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