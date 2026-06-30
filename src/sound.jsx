import React, { useEffect, useRef } from 'react';
import homeMenuMusic from './assets/sounds/menu_music.mp3';
import menuZoomInSound from './assets/sounds/menuZoomInSound.mp3'
import channelMetadata from "./channelMetadata.json"

const ZOOMIN_DELAY = 100;
const ZOOMIN_SOUND_DURATION = 522;
const CHANNEL_MUSIC_START_OFFSET = -40;

const menu_music = new Audio(homeMenuMusic)

export default function PlayMusic({ channelState }) {
    useEffect(() => {
        //If in menu play background music
        if (channelState.state === "menu") {
            playHomeMenuMusic(menu_music);
        }
        //If selected a channel play its music
        else {
            // playChannelMusic(channelMetadata["channels"][channelState.channel]["music"]);
        }

        return () => {
            menu_music.pause();
            menu_music.currentTime = 0;
        };
    }, [channelState]);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "m") {
                playHomeMenuMusic(menu_music);
            }
        }


        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


}

//Playing home menu music
function playHomeMenuMusic() {
    menu_music.play();
    loopControl(menu_music, channelMetadata["menu"]);
    return null;
}

// //Playing channel music
// function playChannelMusic(channel_music){
//     //If the menu music is playing, pause it
//     if(!menu_music.paused){
//         menu_music.pause();
//     }

//     //play zoom in sound after delay
//     const zoomInSound = new Audio(menuZoomInSound);
//     setTimeout(() => {
//         zoomInSound.play();
//     }, ZOOMIN_DELAY);

//     //Play channel music after zoomin sound finishes
//     const channelMusic = new Audio(channel_music);
//         setTimeout(() => {
//         channelMusic.play();
//         loopControl(channelMusic, channelMetadata["channels"][channelState.channel]);
//     }, ZOOMIN_DELAY + CHANNEL_MUSIC_START_OFFSET  + ZOOMIN_SOUND_DURATION);

// }

//Handles if music needs to loop
function loopControl(music, music_source) {
    //If audio needs to loop
    if (music_source["loop"]) {
        //If music reaches the end then go back to the start of loop
        music.ontimeupdate = () => {
            if (music.currentTime >= music_source["end_time"]) {
                music.currentTime = music_source["start_time"];
            }
        };
    }
};


