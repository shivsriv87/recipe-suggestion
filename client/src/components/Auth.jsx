// src/components/Auth.jsx
import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Auth() {
  const [isSignup, setIsSignup] = useState(true);

  const toggleAuthMode = () => {
    setIsSignup((prevState) => !prevState);
  };

  return (
    <div>
      <AuthForm isSignup={isSignup} toggleAuthMode={toggleAuthMode} />
    </div>
  );
}

export default Auth;
