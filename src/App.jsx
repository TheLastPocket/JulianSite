import { useState } from 'react'
import './App.css'
import Menu from './menu.jsx'
import PlayMusic from './sound.jsx'
import ChannelGrid from './channel_grid.jsx'

function App() {
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null,
    zoomOrigin: { x: 50, y: 50 }
  });

  const [scrollState, setScrollState] = useState({
    page: "0",
    prev_clicked: false,
    next_clicked: false
  })

  return (
    <div className='home-screen'>
      <div
        className={`zoom-wrapper ${channelState.state === "selected" ? "selected" : "menu"}`}
        style={{
          '--zoom-origin-x': `${channelState.zoomOrigin.x}vw`,
          '--zoom-origin-y': `${channelState.zoomOrigin.y}vh`
        }}>
        <Menu
          channelState={channelState}
          scrollState={scrollState}
          setScrollState={setScrollState} />

        <ChannelGrid
          channelState={channelState}
          setChannelState={setChannelState}
          scrollState={scrollState}
          setScrollState={setScrollState}/>
      </div>

      <PlayMusic channelState={channelState} />
    </div>
  );
}

export default App