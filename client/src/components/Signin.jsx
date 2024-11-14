// src/components/Signin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/auth/signin', credentials);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/home');
        fetchProfileData();  // Fetch profile data once logged in
      } else {
        setMessage('Login failed: No token received');
      }
    } catch (error) {
      setMessage('Error signing in: ' + (error.response?.data?.message || error.message));
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:3000/protected/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',  // Optional: if you're using cookies to store the token
      });

      const data = await response.json();
      if (response.ok) {
        setProfileData(data);
      } else {
        setMessage('Error fetching profile: ' + data.message);
      }
    } catch (error) {
      setMessage('Error fetching profile: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mt-4 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 mt-4 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-600 rounded">
            Sign In
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        {profileData && (
          <div className="mt-4">
            <h3>Profile Data:</h3>
            <pre>{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
