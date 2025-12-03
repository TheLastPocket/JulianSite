import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"

const numChannelsDesktop = 12;
const numChannelsMobile = 5;
const numColumnRowsDesktop = 3;
const numColumnRowsMobile = 5;
const scroll_index = 0;

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function getGridSize(window_width) {
    if (window_width < 750) {
        return numChannelsMobile;
    }
    return numChannelsDesktop;
}

function getColumnSize(window_width){
    if (window_width < 750) {
        return numColumnRowsMobile;
    }
    return numColumnRowsDesktop;
}

export default function ChannelGrid({ channelState, setChannelState }) {
    const [width, height] = useWindowSize();
    const num_grid_channels = getGridSize(width);
    const num_column_channels = getColumnSize(width);

    return (
        <div className="channels-container">

            {/* Left channel column, not rendered if on first page */}
            <div className="channel-column"
                style={{display: scroll_index === 0 ? "none": "flex"}}>
                <div>
                    {[...Array(num_column_channels).keys()].map(
                        (item, index) => <Channel key={index}
                                        id={channelMetadata.channels.length - 1} 
                                        channelState={channelState} 
                                        setChannelState={setChannelState} />
                    )}
                </div>
            </div>

            {/* central channel column */}
            <div className="channel-grid"
                 style={{justifyContent: scroll_index === 0 
                            ? "flex-end" 
                            : scroll_index === channelMetadata.const.number_of_pages - 1 
                            ? "flex-start" 
                            : "center"
                 }}>
              
                {/* Channels listed in json*/}
                {channelMetadata.channels.map(
                    (item, index) => (
                    index < num_grid_channels && (
                        <Channel key = {num_column_channels + index} 
                                 id={index} 
                                 channelState={channelState} 
                                 setChannelState={setChannelState} />
                    )
                ))}

                {/* Empty channels after to fill up space */}
                {[...Array(Math.max(0, num_grid_channels - channelMetadata.channels.length)).keys()].map(
                    (item, index) => <Channel key = {num_column_channels + channelMetadata.channels.length + index}
                                    id={channelMetadata.channels.length - 1} 
                                    channelState={channelState} 
                                    setChannelState={setChannelState} />
                )}

            </div>

            {/* Right channel column, not rendered if on last page */}
            <div className="channel-column"
                 style={{display: scroll_index === (channelMetadata.const.number_of_pages - 1) ? "none": "flex"}}>
                <div>
                    {[...Array(num_column_channels).keys()].map(
                        (item, index) => <Channel key={index}
                                        id={channelMetadata.channels.length - 1} 
                                        channelState={channelState} 
                                        setChannelState={setChannelState} />
                    )}
                </div>
            </div>
        </div >
    )
}

