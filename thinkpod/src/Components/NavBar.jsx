import React from 'react';
import { IoIosTimer } from "react-icons/io";
import { MdImageSearch } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";


export function Navigation({ toggleTimer, toggleBgSelector, toggleSpotify, toggleAccountProfile, aboutUs }) {
    return (
        <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-3 flex space-x-8 items-center z-50">
            <button onClick={toggleTimer} className="text-gray-600 hover:text-blue-500">
                <IoIosTimer className="Toggle_Timer w-6 h-6" alt="Toggle Timer" />
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
            <button onClick={aboutUs} className="text-gray-600 hover:text-blue-500">
                <FaRegQuestionCircle className="About_Us w-6 h-6"/>
            </button>
        </nav>
    )
}