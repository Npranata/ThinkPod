import React, { useState, useEffect, useRef } from 'react';
import alarm from './chiptune-alarm-clock.mp3';

export function Timer({ seconds, opacity = 0.5, hidden = false, mode = 'study' }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        setCountdown(seconds);
    }, [seconds]);

    useEffect(() => {
        if (countdown === 0) {
            setIsActive(false);
            setHasFinished(true);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
    }, [countdown]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setCountdown((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return minutes + ":" + seconds;
    }

    function handleStart() {
        setIsActive(true);
        setHasFinished(false);
    }

    function handleStop() {
        setIsActive(false);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    function handleReset() {
        setIsActive(false);
        setCountdown(seconds);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    const emoji = mode === 'study' ? '📚' : '💤';

    return (
        <div className="p-1 flex justify-end font-gruppo">
            <div
                className="rounded-3xl drop-shadow shadow-md p-6 md:w-72 flex flex-col items-center text-2xl md:bot-none "
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                }}
            >
                {/* Emoji mode changes */}
                <div className="text-5xl mb-2">{emoji}</div>

                {/* Timer */}
                <div className="text-5xl font-bold text-center text-gray-800 mb-4 opacity-90">
                    {formatTime(countdown)}
                </div>

                {/* Controls */}
                <div className="flex flex-row gap-4 w-full justify-center">
                    {!isActive && !hasFinished && (
                        <button
                            onClick={handleStart}
                            role='button'
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-3xl drop-shadow transition-all duration-200"
                        >
                            Start
                        </button>
                    )}
                    {isActive && (
                        <button
                            onClick={handleStop}
                            role='button'
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-3xl drop-shadow transition-all duration-200"
                        >
                            Stop
                        </button>
                    )}
                    <button
                        onClick={handleReset}
                        role='button'
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-8 rounded-3xl drop-shadow transition-all duration-200"
                    >
                        Reset
                    </button>
                </div>

                <audio ref={audioRef} src={alarm} preload="auto" />
            </div>
        </div>
    )
}
