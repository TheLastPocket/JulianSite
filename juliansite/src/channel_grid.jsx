import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"

const numChannelsDesktop = 12;
const numChannelsMobile = 8;
const numColumnRowsDesktop = 3;
const numColumnRowsMobile = 4;
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

function getGridSize() {
    const [width, height] = useWindowSize();
    if (width < 750) {
        return numChannelsMobile;
    }
    return numChannelsDesktop;
}

function getColumnSize(){
    const [width, height] = useWindowSize();
    if (width < 750) {
        return numColumnRowsMobile;
    }
    return numColumnRowsDesktop;
}

export default function ChannelGrid({ channelState, setChannelState }) {

    return (
        <div className="channels-container">
            <div className="channel-column">
                {scroll_index != 0 &&
                    <div>
                        {[...Array(getColumnSize()).keys()].map(key => <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />)}
                    </div>
                }
            </div>
            <div className="channel-grid">
                {channelMetadata.channels.map((item, index) => (
                    index < getGridSize() && (
                        <Channel id={index} channelState={channelState} setChannelState={setChannelState} />
                    )
                ))}
                {[...Array(Math.max(0, getGridSize() - channelMetadata.channels.length)).keys()].map(key => <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />)}

            </div>
            <div className="channel-column">
                {scroll_index != (channelMetadata.const.number_of_pages - 1) &&
                    <div>
                        {[...Array(getColumnSize()).keys()].map(key => <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />)}
                    </div>
                }
            </div>
        </div >
    )
}

