import React, { useRef, useState } from 'react';
import { auth, provider } from '../utils/firebase';
import '../styles/SignUp.css';
import { Button } from '@material-ui/core';
import nodeAPI from '../utils/axios2';
import SignIn from './SignIn';

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const [signInS, setSignInS] = useState(false);

  const signUpG = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  const signUp = (e) => {
    const signin = async () => {
      var data = {
        firstname: firstRef.current.value,
        lastname: lastRef.current.value,
        username: emailRef.current.value,
        password: passwordRef.current.value,
      };
      console.log(data, 'aayush--dataa');
      try {
        const res = await nodeAPI.post('users/signup', data);
        console.log(res.data, 'signup');
        setSignInS(true);
      } catch (err) {
        console.log(err);
      }
    };
    signin();
  };

  return (
    <>
      {signInS ? (
        <SignIn />
      ) : (
        <div className='signup'>
          <form>
            <h1>Sign Up </h1>
            <input ref={firstRef} placeholder='First Name' type='text' />
            <input ref={lastRef} placeholder='Last Name' type='text' />
            <input ref={emailRef} placeholder='Email / Username' type='email' />
            <input ref={passwordRef} placeholder='Password' type='password' />
            <div> </div>
            <Button onClick={signUp}>Sign Up</Button>
            <h4>
              <span className='signup__user'>Have an Account? </span>

              <span className='signup__link' onClick={() => setSignInS(true)}>
                Sign In.
              </span>
            </h4>
            <Button onClick={signUpG}>Sign In with Google</Button>
          </form>
        </div>
      )}
    </>
  );
}

export default SignUp;
