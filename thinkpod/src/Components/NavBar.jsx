import React, { useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { MdImageSearch } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";

/**
 * Navigation component for the main bottom navigation bar.
 * 
 * This component renders a fixed navigation menu with buttons to toggle various features:
 * - Timer settings
 * - Background selector
 * - Spotify embed
 * - Account profile
 * - To-do list
 * - About Us modal
 * 
 * Each button calls its respective handler passed in as a prop when clicked.
 *
 * @param {Object} props
 * @param {Function} toggleBgSelector - Function to toggle the background selection menu.
 * @param {Function} toggleSpotify - Function to toggle the Spotify player.
 * @param {Function} toggleAccountProfile - Function to toggle the user account/profile view.
 * @param {Function} aboutUs - Function to open the About Us modal or section.
 * @param {Function} toggleTimerSettings - Function to open the timer settings.
 * @param {Function} toDoList - Function to toggle or display the to-do list.
 */

export function Navigation({ toggleBgSelector, toggleSpotify, toggleAccountProfile, aboutUs, toggleTimerSettings, toDoList }) {
    return (
        <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-3 flex space-x-8 items-center z-50 animate-fadeIn">

            {/* Timer Settings Button*/}
            <button onClick={toggleTimerSettings} className="text-gray-600 hover:text-blue-500">
                <IoIosTimer className="Toggle_Timer w-6 h-6" alt="Toggle Timer Settings" />
            </button>

            {/* Background Selector Button*/}
            <button onClick={toggleBgSelector} className="text-gray-600 hover:text-blue-500">
                <MdImageSearch className="Background_Selector w-6 h-6" />
            </button>

            {/* Spotify Embed Button*/}
            <button onClick={toggleSpotify} className="text-gray-600 hover:text-blue-500">
                <MdLibraryMusic className="Spotify_Embed w-6 h-6" />
            </button>

            {/* Account Profile Button*/}
            <button onClick={toggleAccountProfile} className="text-gray-600 hover:text-blue-500">
                <MdAccountCircle className="Account_Profile w-6 h-6" />
            </button>

            {/* To-Do List Button*/}
            <button onClick={toDoList} className="text-gray-600 hover:text-blue-500">
                <LuNotepadText className="Todo w-6 h-6" />
            </button>

            {/* About Us Button*/}
            <button onClick={aboutUs} className="text-gray-600 hover:text-blue-500">
                <FaRegQuestionCircle className="About_Us w-6 h-6" />
            </button>
        </nav>
    )
}
