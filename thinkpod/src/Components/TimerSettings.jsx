import React, { useState, useEffect } from "react";

export function TimerSettings({ setTimerVisible, setTimerSeconds, setTimerOpacity, mode, setMode }) {
    const [studySeconds, setStudySeconds] = useState(1500); // 25 minutes
    const [breakSeconds, setBreakSeconds] = useState(300);  // 5 minutes
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        const total = mode === 'study' ? studySeconds : breakSeconds;
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;

        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }, [mode]);

    const applySettings = () => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (mode === 'study') {
            setStudySeconds(totalSeconds);
        } else {
            setBreakSeconds(totalSeconds);
        }
        setTimerSeconds(totalSeconds);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center space-y-4">
            {/* Mode toggle */}
            <div className="flex space-x-2">
                <button
                    onClick={() => setMode('study')}
                    className={`px-4 py-2 rounded font-bold ${mode === 'study' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    📚 Study Time
                </button>
                <button
                    onClick={() => setMode('break')}
                    className={`px-4 py-2 rounded font-bold ${mode === 'break' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    💤 Break Time
                </button>
            </div>

            {/* Time input */}
            <div className="space-x-2">
                <label className="block text-gray-700 mb-1">
                    Timer (hh:mm:ss) – {mode}:
                </label>
                <input
                    type="number"
                    min="0"
                    max="4"
                    value={hours.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setHours(Math.min(4, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="border rounded px-2 py-1 w-16 text-center"
                />
                :
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="border rounded px-2 py-1 w-16 text-center"
                />
                :
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="border rounded px-2 py-1 w-16 text-center"
                />
            </div>

            {/* Opacity input */}
            <div>
                <label className="block text-gray-700">Timer Opacity (0.1 - 1):</label>
                <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setOpacity(val);
                        setTimerOpacity(val);
                    }}
                    className="w-48"
                />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap space-x-2 justify-center">
                <button
                    onClick={applySettings}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Apply
                </button>
                <button
                    onClick={() => setTimerVisible(prev => !prev)}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    Toggle Visibility
                </button>
                {mode === 'study' && (
                    <button
                        onClick={() => {
                            setHours(0);
                            setMinutes(25);
                            setSeconds(0);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Reset to 25 Min
                    </button>
                )}
                {mode === 'break' && (
                    <button
                        onClick={() => {
                            setHours(0);
                            setMinutes(5);
                            setSeconds(0);
                        }}
                        className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Reset to 5 Min
                    </button>
                )}
            </div>
        </div>
    );
}
