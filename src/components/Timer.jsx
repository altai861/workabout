import React, { useState, useEffect } from 'react'
import radar from "../assets/radar.mp3"
import { useRef } from 'react';

const Timer = () => {
    
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [radarInAction, setRadarInAction] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((seconds) => seconds - 1)
                } else if (minutes > 0) {
                    setMinutes((minutes) => minutes - 1)
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours((hours) => hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                }
            }, 1000)
        }

        if (hours === 0 && minutes === 0 && seconds === 0) {
            
            if (isRunning) {
                audioRef.current.play();
                setRadarInAction(true);
            }
            
            resetTimer();
        } return () => clearInterval(interval);
    }, [seconds, minutes, hours, isRunning])

    function handleRadar() {
        audioRef.current.pause();
        setRadarInAction(false);
    }

    function startTimer() {
        if (hours !== 0 || minutes !== 0 || seconds !== 0) {
            setIsRunning(true);
        } else {
            window.alert("Add Time.");
        }
    }

    function pauseTimer() {
        setIsRunning(false);
    }

    function resetTimer() {
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    }

    const changeHours = (e) => {
        setHours(e.target.value);
    }

    const changeMinutes = (e) => {
        setMinutes(e.target.value);
    }
    
    const changeSeconds = (e) => {
        setSeconds(e.target.value);
    }

  return (
    <div className='timer'>
        <div className='timer-showcase'>

            <label>Hour</label>
            <input value={hours} onChange={changeHours} />

            <label>Minute</label>
            <input value={minutes} onChange={changeMinutes} />

            <label>Seconds</label>
            <input value={seconds} onChange={changeSeconds} />
            
        </div>
            
        
        <div className='buttons'> 
            {!isRunning && (
                <button onClick={startTimer}>Start</button>
            )}
            {isRunning && (
                <button onClick={pauseTimer}>Pause</button>
            )}
            <button onClick={resetTimer}>Reset</button>
        </div>
        <div className='radar'>
            <audio ref={audioRef} className='radar-audio' loop>
                <source src={radar} type="audio/mpeg"></source>
            </audio>
            { radarInAction && (
                <button onClick={handleRadar}>Stop the ringtone</button>
            ) }
            
        </div>
        
    </div>
  )
}

export default Timer