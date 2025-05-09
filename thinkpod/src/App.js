import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Timer } from './Components/Timer.jsx';
import { Navigation } from './Components/NavBar.jsx';
import { ChangeBackground, BackgroundSelection, GetSavedBackground, SaveBackground } from './Components/BackgroundHandler.jsx';
import BackgroundHandler from './Components/BackgroundHandler.jsx';
import { FaLightbulb } from "react-icons/fa6";
import { Login } from './Components/Login.jsx';
import { AboutUs } from './Components/AboutUs.jsx';
import { TimerSettings } from './Components/TimerSettings';
import { ToDoList } from './Components/ToDoList.jsx';

/**
 * Main function that runs the whole web application.
 * It Handles state management of UI components and pop ups.
 * H
 * @returns {JSX.Element} - JSX structure of the web application.
 */
function App() {
   // Automatically remove the token when the page refreshes
   useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  // These are states that will be updated in the website.
  const [showBackgroundVideo, setBackgroundVideo] = useState(null);
  const [showBackgroundThemeOptions, setBackgroundThemeOptions] = useState("All");
  const [showTimer, setShowTimer] = useState(false);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [showSpotify, setSpotify] = useState(false);
  const [showAccountProfile, setAccountProfile] = useState(false);
  const [showAboutUs, setAboutUs] = useState(false);
  const [showToDoList, setTodoList] = useState(false);

  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [timerVisible, setTimerVisible] = useState(true);
  const [timerOpacity, setTimerOpacity] = useState(0.5);
  const [timerSeconds, setTimerSeconds] = useState(1500);

  const [mode, setMode] = useState('study');
  const token = localStorage.getItem("token");

  // Allows for the user to click anywhere outside the window to have the login pop up disappear
  const loginRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setAccountProfile(false);
      }
    }
    if (showAccountProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountProfile]);


  // Allows user to click outside of the background window to close the window
  const backgroundRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backgroundRef.current && !backgroundRef.current.contains(event.target)) {
        setShowBgSelector(false);
      }
    }
    if (showBgSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBgSelector]);

  // Loading the same default background unless the user logs in
  useEffect(() => {
    async function loadUserBackground() {
      const bgHandler = new BackgroundHandler();
      const [[defaultVideoUrl]] = await bgHandler.getDefaultBackground();
      setBackgroundVideo(defaultVideoUrl);

      if (token) {
        try {
          const savedVideo = await GetSavedBackground(token);
          if (savedVideo) {
            setBackgroundVideo(savedVideo);
          } 
        } catch (e) {
          console.error("Error fetching saved background, loading default instead.", e);
        }
      }
    }
    loadUserBackground();
  }, [token]);

  // Display timer settings
  const toggleTimerSettings = () => {
    setShowTimerSettings(prev => !prev);
  };


  // Allows user to close timer settings window when user clicks outside of the timer window.
  const timerRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timerRef.current && !timerRef.current.contains(event.target)) {
        setShowTimerSettings(false);
      }
    }
    if (showTimerSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTimerSettings]);

  // Todo List states
  const [showTasks, setTasks] = useState([]);
  const [showCheckMark, setCheckMark] = useState([]);

  return (
    <div className="App h-screen flex flex-col">

      {/*Header with styling*/}
      <header className="title h-[8%] flex justify-start text-4xl text-white p-2">
        <FaLightbulb className='text-yellow-400' /> ThinkPod
        <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
      </header>

      {/* Timer Popup */}
      <div
        className="md:fixed top-6 md:right-6 md:flex-none flex justify-center right-none z-50 transition-opacity duration-300"
        style={{
          opacity: timerVisible ? 1 : 0,
          pointerEvents: timerVisible ? 'auto' : 'none'
        }}
      >
        <Timer
          seconds={timerSeconds}
          opacity={timerOpacity}
          mode={mode}
        />
      </div>

      {/* Timer Settings */}
      {showTimerSettings && (

        <div ref={timerRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex justify-center items-center rounded-3xl shadow-xl animate-fadeIn">
          <TimerSettings
            setTimerVisible={setTimerVisible}
            setTimerOpacity={setTimerOpacity}
            setTimerSeconds={setTimerSeconds}
            mode={mode}
            setMode={setMode}
          />
        </div>
      )}

      {/* Background Selector */}
      {/* Always Display Background */}
      <ChangeBackground videoUrl={showBackgroundVideo} setVideoUrl={setBackgroundVideo} token={token} />
      <div
        className={`transition-opacity duration-300 ${showBgSelector ? 'animate-fadeIn' : ''}`}
        style={{
          opacity: showBgSelector ? 1 : 0,
          pointerEvents: showBgSelector ? 'auto' : 'none',
        }}>
        <div className="background_window flex items-center justify-center" ref={backgroundRef}>
          <div className="background_setting absolute bg-white font-bold overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] 
             rounded-xl p-5 sm:w-[45%] w-[90%] h-[53%] top-[255px]">
            <div className="ThemeSelector grid grid-flow-col gap-1 md:gap-4 grid-cols-[auto_auto_auto_auto_1fr] md:grid-cols-[auto_auto_auto_auto_1fr]">
              <div className="w-8 bg-soft-white rounded-md rounded p-1 shadow-lg shadow-cyan-500/50" onClick={() => { setBackgroundThemeOptions("All") }}>
                All
              </div>
              <div className="w-8 bg-soft-white rounded-md rounded p-1 shadow-lg shadow-cyan-500/50" onClick={() => { setBackgroundThemeOptions("Snow") }}>
                <i class="em em-snowman" aria-role="presentation" aria-label=""></i>
              </div>
              <div className="w-8 bg-soft-white rounded-md rounded p-1 shadow-lg shadow-cyan-500/50" onClick={() => { setBackgroundThemeOptions("Ocean") }}>
                <i class="em em-ocean" aria-role="presentation" aria-label="WATER WAVE"></i>
              </div>
              <div className="w-8 bg-soft-white rounded-md rounded p-1 shadow-lg shadow-cyan-500/50" onClick={() => { setBackgroundThemeOptions("Cozy") }}>
                <i class="em em-couch_and_lamp" aria-role="presentation" aria-label=""></i>
              </div>
              <div className="w-8 bg-soft-white rounded-md rounded p-1 shadow-lg shadow-cyan-500/50" onClick={() => { setBackgroundThemeOptions("Space") }}>
                <i class="em em-milky_way" aria-role="presentation" aria-label="MILKY WAY"></i>
              </div>
              <button className="saveButton text-xs " onClick={() => SaveBackground(showBackgroundVideo, token)}>
                Save
              </button>
            </div>
            <div>
              <span className="text-3xl flex justify-center m-4 font-gruppo">Background</span>
            </div>
            <BackgroundSelection setBackgroundVideo={setBackgroundVideo} vidOptions={showBackgroundThemeOptions} token={token} />
            <BackgroundSelection setBackgroundVideo={setBackgroundVideo} vidOptions={showBackgroundThemeOptions} token={token} />
          </div>
        </div>
      </div>

      {/* Spotify Embed */}
      <div
        className="fixed bottom-0 md:left-0 left-1/2 md:transform-none -translate-x-1/2 md:translate-x-0 animate-fadeIn"
        style={{
          display: showSpotify ? 'block' : 'none',
          pointerEvents: showSpotify ? 'auto' : 'none',
        }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ"
          className="sm:w-[500px] w-[350px] h-[100px] p-[10px] sm:mb-[55px] mb-[75px]"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Embed"
        ></iframe>
      </div>

      {/* Login Popup */}
      <div className=
        {`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm 
        ${showAccountProfile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-300`}>
        <div className="login_window" ref={loginRef}>
          <Login />
        </div>
      </div>

      {/* About Us Popup*/}
      <div className=
        {`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm
        ${showAboutUs ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-300`}>
        <AboutUs />
      </div>

      {/* Todo List Popup*/}
      {showToDoList && (
        <div className='fixed bottom-20 sm:left-[60%] left-[40%] z-49'>
          <ToDoList showTasks={showTasks} setTasks={setTasks} showCheckMark={showCheckMark} setCheckMark={setCheckMark} />
        </div>
      )}

      {/* Navigation Bar */}
      <Navigation toggleTimer={() => setShowTimer(prev => !prev)} toggleBgSelector={() => setShowBgSelector(prev => !prev)} toggleSpotify={() => setSpotify(prev => !prev)} toggleAccountProfile={() => setAccountProfile(prev => !prev)} aboutUs={() => setAboutUs(prev => !prev)} toggleTimerSettings={toggleTimerSettings} toDoList={() => setTodoList(prev => !prev)} />
    </div>
  );
}

export default App;
