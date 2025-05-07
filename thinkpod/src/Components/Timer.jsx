import React, { useState, useEffect, useRef } from 'react';
import alarm from './chiptune-alarm-clock.mp3';

/**
 * Timer component for study or break sessions.
 *
 * This component displays a countdown timer with Start, Stop, and Reset controls.
 * It optionally plays an alarm sound when the timer reaches 0.
 *
 * @param {Object} props - Props object
 * @param {number} props.seconds - The number of seconds to count down from.
 * @param {number} [props.opacity=0.5] - The opacity of the timer background (between 0 and 1).
 * @param {boolean} [props.hidden=false] - Whether the timer should be hidden (currently unused).
 * @param {string} [props.mode='study'] - The mode of the timer, affects the emoji shown ('study' or 'break').
 * @returns {JSX.Element} The countdown timer component.
 */
export function Timer({ seconds, opacity = 0.5, hidden = false, mode = 'study' }) {
    const [countdown, setCountdown] = useState(seconds); // Remaining time in seconds
    const [isActive, setIsActive] = useState(false);     // Is the timer running
    const [hasFinished, setHasFinished] = useState(false); // Has the timer reached 0
    const intervalRef = useRef(null); // Reference to the setInterval
    const audioRef = useRef(null);    // Reference to the audio element

    // Reset timer when `seconds` prop changes
    useEffect(() => {
        setCountdown(seconds);
    }, [seconds]);

    // Play alarm and stop timer when countdown hits zero
    useEffect(() => {
        if (countdown === 0) {
            setIsActive(false);
            setHasFinished(true);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
    }, [countdown]);

    // Start or stop the interval based on `isActive` state
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

    /**
     * Formats seconds into MM:SS
     * @param {number} time - Time in seconds
     * @returns {string} Time formatted as 'MM:SS'
     */
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return minutes + ":" + seconds;
    };

    /** Starts the timer and resets the finished state */
    function handleStart() {
        setIsActive(true);
        setHasFinished(false);
    }

    /** Stops the timer and resets the audio */
    function handleStop() {
        setIsActive(false);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    /** Resets the timer, finished state, and audio */
    function handleReset() {
        setIsActive(false);
        setCountdown(seconds);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    // Display emoji based on mode
    const emoji = mode === 'study' ? '📚' : '💤';

    return (
        <div className="p-1 flex justify-end font-gruppo">
            <div
                className="rounded-3xl drop-shadow shadow-md p-6 md:w-72 flex flex-col items-center text-2xl md:bot-none"
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                }}
            >
                {/* Mode Emoji */}
                <div className="text-5xl mb-2">{emoji}</div>

                {/* Countdown Timer */}
                <div className="text-5xl font-bold text-center text-gray-800 mb-4 opacity-90">
                    {formatTime(countdown)}
                </div>

                {/* Timer Controls */}
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

                {/* Alarm Audio */}
                <audio ref={audioRef} src={alarm} preload="auto" />
            </div>
        </div>
    );
}
