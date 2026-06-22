import { useState } from 'react'
import './App.css'
import Menu from './menu.jsx'
import PlayMusic from './sound.jsx'
import ChannelGrid from './channel_grid.jsx'

function App() {
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null
  });

  const [scrollState, setScrollState] = useState({
    page: "0",
    prev_clicked: false,
    next_clicked: false
  })

  return (
    <div className='home-screen'>
      <Menu 
        channelState={channelState}
        scrollState={scrollState}
        setScrollState={setScrollState} />

      <PlayMusic channelState={channelState} />
      
      <ChannelGrid 
        channelState={channelState}
        setChannelState={setChannelState} 
        scrollState={scrollState}
        setScrollState={setScrollState} />
    </div>
  );
}

export default App