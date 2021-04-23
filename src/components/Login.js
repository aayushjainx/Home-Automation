import React from 'react';
import '../styles/Login.css';
import SignIn from './SignIn';

function Login() {
  return (
    <div className='login'>
      <div className='login__gradient' />
      <SignIn />
    </div>
  );
}

export default Login;
