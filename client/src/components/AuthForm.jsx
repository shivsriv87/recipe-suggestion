// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { signup, signin } from '../utils/Api';
import { useNavigate } from 'react-router-dom';

function AuthForm({ isSignup, toggleAuthMode }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isSignup) {
        await signup(formData);
        setMessage('Signup successful! Please sign in.');
        toggleAuthMode();
      } else {
        const response = await signin({ email: formData.email, password: formData.password });
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
          navigate('/home');
        } else {
          setMessage('Signin failed. No token received');
        }
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className='w-full h-screen'
      style={{
        backgroundImage: "url('./images/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-semibold text-center">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-600 rounded">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          <button onClick={toggleAuthMode} className="mt-4 text-blue-600">
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
