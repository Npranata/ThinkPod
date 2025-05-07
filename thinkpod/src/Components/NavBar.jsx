import React, { useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { MdImageSearch } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";

export function Navigation({ toggleBgSelector, toggleSpotify, toggleAccountProfile, aboutUs, toggleTimerSettings, toDoList }) {
    return (
        <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-3 flex space-x-8 items-center z-50 animate-fadeIn">
            <button onClick={toggleTimerSettings} className="text-gray-600 hover:text-blue-500">
                <IoIosTimer className="Toggle_Timer w-6 h-6" alt="Toggle Timer Settings" />
            </button>
            <button onClick={toggleBgSelector} className="text-gray-600 hover:text-blue-500">
                <MdImageSearch className="Background_Selector w-6 h-6" />
            </button>
            <button onClick={toggleSpotify} className="text-gray-600 hover:text-blue-500">
                <MdLibraryMusic className="Spotify_Embed w-6 h-6" />
            </button>
            <button onClick={toggleAccountProfile} className="text-gray-600 hover:text-blue-500">
                <MdAccountCircle className="Account_Profile w-6 h-6" />
            </button>
            <button onClick={toDoList} className="text-gray-600 hover:text-blue-500">
                <LuNotepadText className="Todo w-6 h-6" />
            </button>
            <button onClick={aboutUs} className="text-gray-600 hover:text-blue-500">
                <FaRegQuestionCircle className="About_Us w-6 h-6" />
            </button>
        </nav>
    )
}
