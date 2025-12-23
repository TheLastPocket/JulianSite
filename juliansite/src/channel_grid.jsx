import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"

const channelSizingLayout = {
    "550": {
        "numChannelsColumn": 4,
        "numChannelsGrid": 4, 
        "numGridColumns": 1,
    },
    "1200": {
        "numChannelsColumn": 4,
        "numChannelsGrid": 8, 
        "numGridColumns": 2,
    },
    "1850": {
        "numChannelsColumn": 3,
        "numChannelsGrid": 9, 
        "numGridColumns": 3,
    },
     "7000": {
        "numChannelsColumn": 3,
        "numChannelsGrid": 12, 
        "numGridColumns": 4,
    },

}
// arbitrary beginning values for channel map function
const channelKeyLeftColumnBegin = 0;
const channelKeyGridBegin = 20;
const channelKeyRightColumnBegin = 70;

const scroll_index = 0;

// actively track window resizing
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

// returns number of channels in grid based on window width
function getGridSize(window_width) {
    for (const [key,value] of Object.entries(channelSizingLayout)) {
        if (window_width <= key ) {
            return value["numChannelsGrid"];
        }
    }

    const keys = Object.keys(channelSizingLayout);
    return keys[keys.length - 1]["numChannelsGrid"];
}

// returns number of channels in each column based on window width
function getColumnSize(window_width){
    for (const [key,value] of Object.entries(channelSizingLayout)) {
        if (window_width <= key ) {
            return value["numChannelsColumn"];
        }
    }

    const keys = Object.keys(channelSizingLayout);
    return keys[keys.length - 1]["numChannelsColumn"];
}

// returns number of columns based on window width
function getGridColumnCount(window_width) {
    for (const [key,value] of Object.entries(channelSizingLayout)) {
        if (window_width <= key ) {
            return value["numGridColumns"];
        }
    }

    const keys = Object.keys(channelSizingLayout);
    return keys[keys.length - 1]["numGridColumns"];
}

export default function ChannelGrid({ channelState, setChannelState }) {
    const [width, height] = useWindowSize();
    const num_grid_channels = getGridSize(width);
    const num_column_channels = getColumnSize(width);
    const num_grid_columns = getGridColumnCount(width);

    return (
        <div className="channels-container">

            {/* Left channel column, not rendered if on first page */}
            <div className="channel-column"
                style={{visibility: scroll_index === 0 ? "hidden": "visible",
                        alignItems: "flex-end"
                       }
                }>
                <div>
                    {[...Array(num_column_channels).keys()].map(
                        (item, index) => <Channel key={channelKeyLeftColumnBegin + index}
                                        id={channelMetadata.channels.length - 1} 
                                        channelState={channelState} 
                                        setChannelState={setChannelState} />
                    )}
                </div>
            </div>

            {/* central channel column */}
            <div className="channel-grid"
                 style={{
                         gridTemplateColumns: `repeat(${num_grid_columns}, 1fr)`
                        }
                 }>
              
                {/* Channels listed in json*/}
                {channelMetadata.channels.map(
                    (item, index) => (
                    index < num_grid_channels && (
                        <Channel key = {channelKeyGridBegin + index} 
                                 id={index} 
                                 channelState={channelState} 
                                 setChannelState={setChannelState} />
                    )
                ))}

                {/* Empty channels after to fill up space */}
                {[...Array(Math.max(0, num_grid_channels - channelMetadata.channels.length)).keys()].map(
                    (item, index) => <Channel key = {channelKeyGridBegin + channelMetadata.channels.length + index}
                                    id={channelMetadata.channels.length - 1} 
                                    channelState={channelState} 
                                    setChannelState={setChannelState} />
                )}

            </div>

            {/* Right channel column, not rendered if on last page */}
            <div className="channel-column"
                 style={{visibility: scroll_index === channelMetadata.const.number_of_pages - 1 ? "hidden": "visible"
                }}>
                <div>
                    {[...Array(num_column_channels).keys()].map(
                        (item, index) => <Channel key={channelKeyRightColumnBegin + index}
                                        id={channelMetadata.channels.length - 1} 
                                        channelState={channelState} 
                                        setChannelState={setChannelState} />
                    )}
                </div>
            </div>
        </div >
    )
}

