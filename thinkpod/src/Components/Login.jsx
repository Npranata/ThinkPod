import React, { useState } from 'react';
import axios from 'axios';

/* React component for user login and account creation */
export function Login() {

  //component state hooks 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  // handles user login 
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://thinkpod-dus5.onrender.com/login', 
        { username, password }, 
        { withCredentials: true });
      //Stores JWT token in localStorage
      localStorage.setItem('token', response.data.access_token);
      //update state to show user is logged in
      setLoggedIn(true);
    } 
    catch (error) {
      alert('Login failed!');
    }
  };

    // handles create account
  const createAccount = async () => {
    try {
      const response = await axios.post(
        'https://thinkpod-dus5.onrender.com/createAccount', 
        { username, password },
         { withCredentials: true });
      alert('Account created successfully!');
    } 
    catch (error) {
      alert('Account creation failed!');
    }
  };

  // Toggles between login and create account form
  const toggleCreateAccountForm = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  return (
    <div className="relative w-full max-w-xs">
      {!loggedIn ? (
        //If not logged in 
        !showCreateAccount ? (
          <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            {/* Username input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username 
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username"
              />
            </div>

            {/* Password input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> 
                Password 
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
              />
            </div>
          
          {/*Login Button */}
            <button type="button" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleLogin}>
              Login
            </button>
            <br />

          {/* Link to switch to create account */}
            <button type="button" 
            className="text-blue-500 underline mt-2" 
            onClick={toggleCreateAccountForm}> 
              Create Account 
            </button>
          </form>

        ) : (
          // Show account creation form
          <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            {/* Username input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newUsername">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username"
              />
            </div>

            {/* Password input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
              />
            </div>

           {/* Create account button */}
            <button type="button" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
            onClick={createAccount}> 
              Create Account
            </button>
            <br />

            {/* Back to login button */}
            <button type="button" 
            className="mt-2 text-sm text-blue-500 underline" 
            onClick={toggleCreateAccountForm}> 
              Back to Login 
            </button>
          </form>
        )
      ) : (
         // Displayed when logged in
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          You are logged in as {username}
        </div>
      )}
    </div>
  );
}