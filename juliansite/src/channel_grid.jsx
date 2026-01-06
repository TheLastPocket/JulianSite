import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"
import Arrow from './arrow.jsx'
import nextArrow from './assets/menu/NextArrow.png'
import prevArrow from './assets/menu/PrevArrow.png'
import nextSign from './assets/menu/NextSign.png'
import prevSign from './assets/menu/PrevSign.png'

const channelSizingLayout = {
    "620": {
        "numChannelsColumn": 4,
        "numChannelsGrid": 4, 
        "numGridColumns": 1,
    },
    "1440": {
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

const scroll_index = 1;

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

export default function ChannelGrid({ channelState, setChannelState, }) {
    const [width, height] = useWindowSize();
    const [next, setNext] = useState(false);
    const num_grid_channels = getGridSize(width);
    const num_column_channels = getColumnSize(width);
    const num_grid_columns = getGridColumnCount(width);

    const handleNext = () => {
        setNext(true);
        setTimeout(() => {
            setNext(false);   
        }, 400);
    }

    return (
        <div className="channels-container">
            {[...Array(channelMetadata.const.number_of_pages)].map((_, gridIndex) => (
                <div 
                    className = {`channel-grid-${gridIndex + 1}`}
                    key = {gridIndex} 
                    style={{
                        display: Math.abs(gridIndex - scroll_index) < 2 ? "visible" : "none",
                        gridTemplateColumns: `repeat(${num_grid_columns}, 1fr)`
                        }
                 }>
                        {[...Array(num_grid_channels)].map((_, channelIndex) => (
                            <Channel 
                                key = {channelKeyGridBegin + channelIndex + (num_grid_channels * gridIndex)} 
                                id={channelIndex + (num_grid_channels * gridIndex) < channelMetadata.channels.length ? 
                                        channelIndex + (num_grid_channels * gridIndex) :
                                          (channelMetadata.channels.length - 1)  
                                    } 
                                channelState={channelState} 
                                setChannelState={setChannelState} />
                        ))}
                </div>
            ))}
        </div >
    )
}

