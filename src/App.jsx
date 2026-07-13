import { useState, useEffect } from 'react'
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
    page: 0,
    prev_clicked: false,
    next_clicked: false
  })

  /* Dev helper: click anywhere to log its screen position in vw/vh, plus
  wherever the next-arrow currently sits, so the two can be compared. */
  useEffect(() => {
    const reportClickPosition = (e) => {
      const vw = (e.clientX / window.innerWidth) * 100;
      const vh = (e.clientY / window.innerHeight) * 100;
      console.log(`Click: ${vw.toFixed(2)}vw, ${vh.toFixed(2)}vh`);
      console.log(`Click: ${e.clientX}px, ${e.clientY}px`)

      const nextArrow = document.querySelector('.next-container');
      if (nextArrow) {
        const rect = nextArrow.getBoundingClientRect();
        const arrowVw = (rect.left / window.innerWidth) * 100;
        const arrowVh = (rect.top / window.innerHeight) * 100;
        console.log(`next-arrow: ${rect.left}px, ${rect.top}px`);
        console.log(`next-arrow: ${arrowVw.toFixed(2)}vw, ${arrowVh.toFixed(2)}vh`);
        console.log(`next-arrow size: ${rect.width}px x ${rect.height}px`);
        console.log(`next-arrow right/bottom edge: ${rect.right}px, ${rect.bottom}px (viewport: ${window.innerWidth}px x ${window.innerHeight}px)`);

        const computed = getComputedStyle(nextArrow);
        console.log(`--arrow-home-x: ${computed.getPropertyValue('--arrow-home-x')}, --arrow-home-y: ${computed.getPropertyValue('--arrow-home-y')}`);
        console.log(`--zoom-origin-x: ${computed.getPropertyValue('--zoom-origin-x')}, --zoom-origin-y: ${computed.getPropertyValue('--zoom-origin-y')}`);
        console.log(`--channel-zoom-scale: ${computed.getPropertyValue('--channel-zoom-scale')}`);
        console.log(`computed scale: ${computed.scale}, computed transform: ${computed.transform}`);
      }
    };
    window.addEventListener('click', reportClickPosition, true);
    return () => window.removeEventListener('click', reportClickPosition, true);
  }, []);

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