import { useState, useEffect, useRef } from 'react'
import './time.css'

import timeAM from './assets/time/time_am.png'
import timePM from './assets/time/time_pm.png'
import timeColon from './assets/time/time_colon.png'
import time0 from './assets/time/time_0.png'
import time1 from './assets/time/time_1.png'
import time2 from './assets/time/time_2.png'
import time3 from './assets/time/time_3.png'
import time4 from './assets/time/time_4.png'
import time5 from './assets/time/time_5.png'
import time6 from './assets/time/time_6.png'
import time7 from './assets/time/time_7.png'
import time8 from './assets/time/time_8.png'
import time9 from './assets/time/time_9.png'

const timeDict = {
    "0": time0,
    "1": time1,
    "2": time2,
    "3": time3,
    "4": time4,
    "5": time5,
    "6": time6,
    "7": time7,
    "8": time8,
    "9": time9,
    "am": timeAM,
    "pm": timePM
}

export default function RenderTime({ show_colon }) {
    const hour = getHour();
    const minute = getMinute();
    const ampm = getAMPM();
    return (
        <div className="time">
            {hour[0] !== "0" &&
                <img src={timeDict[hour[0]]} className="hour-digit-0" />
            }

            <img src={timeDict[hour[1]]} className="hour-digit-1" />

            <img src={timeColon} className={`colon ${show_colon}`} />

            <img src={timeDict[minute[0]]} className="minute-digit-0" />

            <img src={timeDict[minute[1]]} className="minute-digit-1" />

            <img src={timeDict[ampm]} className="am-pm" />
        </div>
    )
}

export function RenderDate() {
    return (
        <div>
            <p className='date'> {getDate()} </p>
        </div>
    );
}

function getDate() {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return dayOfWeek[today.getDay()] + " " + (today.getMonth() + 1) + "/" + today.getDate();
}


function getHour() {
    const today = new Date();
    let hour = today.getHours() % 12;
    if (hour === 0) {
        hour = 12;
    }
    return hour.toString().padStart(2, '0');
}

function getMinute() {
    const today = new Date();
    let minute = today.getMinutes();
    return minute.toString().padStart(2, '0');
}

function getAMPM() {
    const today = new Date();
    const ampm = today.getHours() >= 12 ? "pm" : "am";
    return ampm;
}
