import { useState, useEffect, useRef } from 'react'
import "./channel.css"
import channelMetadata from "./channelMetadata.json"

import channelBackground from './assets/channel/ChannelMaskIcon.png'
import menuChannelClick from './assets/sounds/ChannelClick.mp3'


import channelHoverBorder from './assets/channel/ChannelHoverBorder.png'
import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import channelMenu from './assets/channel/channelMenu.png'
import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'

import channelStartButton from './assets/channel/channelStartButton.png'
import channelMenuButton from './assets/channel/channelMenuButton.png'



export default function Channel({ id, channelState, setChannelState }) {
    const channel = useRef(null);
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
        console.log("location:", (rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);

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

                });

            }, 200);
        }
    }


    return (
        <div ref={channel} className={`channel-container ${channelState.state == "menu" ? "menu" : "selected"}`}>

            {channelState.state == "menu" &&
                <div>
                    <img src={channelBackground} className="channel-background" />
                    
                    {/* <video
                        className="icon-video"
                        muted={true}
                        autoPlay={true}
                        loop={true}> */}
                        {/* <source src={channelMetadata["channels"][id]["icon"]} type="video/mp4" />
                        Outdated browser! */}
                    {/* </video> */}
                    <img src={channelHoverBorder}
                        className={`hover-border ${hoverVisible ? "" : "fade-out"} ${channelState.state == "selected" ? "selected" : ""}`}
                        onMouseEnter={handleChannelHover}
                        onMouseLeave={handleChannelLeave}
                        onClick={handleChannelClick} />
                </div>
            }
            {channelState.state == "selected" &&
                <div className="banner-container">
                    <video className="banner"
                        autoPlay={true}
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
                    {/* <div className="banner-menu">
                    </div> */}

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