
import React, {useState } from 'react';
import axios from 'axios';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://thinkpod-dus5.onrender.com/login', { username, password },{withCredentials: true} );
      localStorage.setItem('token', response.data.access_token);
      setLoggedIn(true);
    } catch (error) {
      alert('Login failed!');
    }
  };

  const createAccount = async () => {
    try {
      const response = await axios.post('https://thinkpod-dus5.onrender.com/createAccount', { username, password},{withCredentials: true});
      alert('Account created successfully!');
    } catch (error) {
      alert('Account creation failed!');
    }
  };

  const toggleCreateAccountForm = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  return (
    <div className="relative w-full max-w-xs">
      {!loggedIn ? (   
        !showCreateAccount ? (
          <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"> Username </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
              />
            </div> 
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Password </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              />
            </div>
                
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
            <br />
            <button type="button" className="text-blue-500 underline mt-2" onClick={toggleCreateAccountForm}> Create Account </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newUsername">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              />
            </div>

            <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={createAccount}> Create Account</button>
            <br/>
            <button type="button" className="mt-2 text-sm text-blue-500 underline" onClick={toggleCreateAccountForm}> Back to Login </button>
          </form>
        )
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          You are logged in as {username}
        </div>
      )}
    </div>
  );
}