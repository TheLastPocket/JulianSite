import { useState, useEffect, useRef } from 'react'
import "./channel.css"
import channelMetadata from "./channelMetadata.json"

import channelBackground from './assets/channel/channelMaskIcon.png'
import menuChannelClick from './assets/sounds/channelClick.mp3'


import channelHoverBorder from './assets/channel/channelHoverBorder.png'
import menuHoverSound from './assets/sounds/menuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import channelMenu from './assets/channel/channelMenu.png'
import channelSelectBackground from './assets/channel/channelSelectBackground.png'

import channelStartButton from './assets/channel/channelStartButton.png'
import channelMenuButton from './assets/channel/channelMenuButton.png'



export default function Channel({ id, channelState, setChannelState }) {
    const channel = useRef(null);
    const bannerVideo = useRef(null);
    // const [tooltipVisible, setTooltipVisible] = useState(false);
    const [hoverVisible, setHoverVisible] = useState(false);
    // const [channelSelected, setChannelSelected] = useState(false);
    // const channelVideoRef = useRef(null);
    // const tooltipTime = useRef(null);
    // const tooltipShow = useRef(new Audio(tooltipSound));

    // const channelWidth = 320;
    // const channelHeight = 240;

    // useEffect(() => {
    //     if (channelVideoRef.current) {
    //         channelVideoRef.current.load();
    //     }
    // }, [channelState]);

    //Loop the banner video between banner_loop_start and banner_loop_end
    useEffect(() => {
        if (channelState.state !== "selected" || channelState.channel !== id || !bannerVideo.current) {
            return;
        }

        const { banner_loop_start, banner_loop_end } = channelMetadata.channels[id];
        const video = bannerVideo.current;

        if (banner_loop_start != null && banner_loop_end != null) {
            video.ontimeupdate = () => {
                if (video.currentTime >= banner_loop_end) {
                    video.currentTime = banner_loop_start;
                }
            };
        }
    }, [channelState.state, channelState.channel, id]);

    const handleChannelHover = () => {
        if (channelState.state === "menu" && channelMetadata.channels[id].name != null) {
            const hover_sound = new Audio(menuHoverSound);
            hover_sound.play();

            //Signal to show the blue border
            setHoverVisible(true);

            //Play extended hover sound if still on the channel after a bit
            // tooltipTime.current = setTimeout(() => {
            //     tooltipShow.current.play();
            //     setTooltipVisible(true);
            // }, 300);
        }
    };

    //Exiting the channel hitbox
    const handleChannelLeave = () => {
        //clear tooltip
        // clearTimeout(tooltipTime.current);
        // tooltipTime.current = null;
        // //clears tooltip and border smoothly
        // setTooltipVisible(false);

        //remove blue border
        if (channelMetadata.channels[id].name != null) {
            setHoverVisible(false);
        }
    }

    //Clicking on channel
    const handleChannelClick = () => {
        const rect = channel.current.getBoundingClientRect();

        /* zoom origin in vw and vh */
        const originX = ((rect.left + rect.right) / 2 / window.innerWidth) * 100;
        const originY = ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100;

        //play audio
        if (channelMetadata.channels[id].name != null) {
            const channel_click_sound = new Audio(menuChannelClick);
            channel_click_sound.play();

            //Set the state to the selected channel after a bit
            setTimeout(() => {
                // setChannelSelected(true);
                setChannelState({
                    state: "selected",
                    channel: id,
                    zoomOrigin: { x: originX, y: originY },
                });

            }, 200);
        }
    }


    return (
        <div ref={channel} className={`channel-container ${channelState.state == "menu" || channelState.channel !== id ? "menu" : "selected"}`}>
            {(channelState.state == "menu" || channelState.channel !== id) &&
                <div>
                    <img src={channelBackground} className="channel-background" />
                    
                    <video
                        className="icon-video"
                        muted={true}
                        autoPlay={true}
                        loop={true}
                        playsInline={true}>
                            <source src={channelMetadata["channels"][id]["icon"]} type="video/mp4" />
                            Outdated browser!
                    </video>
                    <img src={channelHoverBorder}
                        className={`hover-border ${hoverVisible ? "" : "fade-out"} ${channelState.state == "selected" ? "selected" : ""}`}
                        onMouseEnter={handleChannelHover}
                        onMouseLeave={handleChannelLeave}
                        onClick={handleChannelClick} />
                </div>
            }
            {channelState.state == "selected" && channelState.channel === id &&
                <div className="banner-container">
                    <video className="banner"
                        ref={bannerVideo}
                        muted={true}
                        autoPlay={true}
                        playsInline={true}
                        loop={channelMetadata["channels"][id]["does_banner_loop"]}
                        src={channelMetadata["channels"][id]["banner"]}>
                        "Outdated browser!"
                    </video>
                    <div className="banner-div">
                        <img src={channelMenu}
                            className="banner-menu-background" />
                        <img src={channelStartButton}
                            className="banner-menu-start" />
                        <img src={channelMenuButton}
                            className="banner-menu-menu" />
                    </div>
                </div>

            }
        </div>
    )
}

//Handles if music needs to loop
// function getChannelVideo(arg_channelState, channel) {
//     //console.log(arg_channelState)
//     return arg_channelState.state === "menu" ? channelMetadata["channels"][0]["icon"] : channelMetadata["channels"][channel]["banner"];
// }