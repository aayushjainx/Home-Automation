import React, { useRef, useState } from 'react';
import { auth, provider } from '../utils/firebase';
import '../styles/SignUp.css';
import { Button } from '@material-ui/core';
import nodeAPI from '../utils/axios2';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import SignUp from './SignUp';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [signUpS, setSignUpS] = useState(false);

  const signUp = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  const signIn = (e) => {
    const signin = async () => {
      var data = {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      };
      console.log(data, 'aayush--dataa');
      try {
        const res = await nodeAPI.post('users/login', data);
        console.log(res.data.token, 'aayush--token');
        var token = res.data.token;
        localStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);
        localStorage.setItem('creds', decoded._id);

        console.log(decoded, 'aayush--decode');
        dispatch(
          login({
            token: token,
            uid: decoded._id,
            type: 'node',
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    signin();
  };

  return (
    <>
      {signUpS ? (
        <SignUp />
      ) : (
        <div className='signup'>
          <form>
            <h1>Sign In </h1>
            <input ref={emailRef} placeholder='Email / Username' type='email' />
            <input ref={passwordRef} placeholder='Password' type='password' />
            <div> </div>
            <Button onClick={signIn}>Sign In</Button>
            <h4>
              <span className='signup__user'>New User? </span>

              <span className='signup__link' onClick={() => setSignUpS(true)}>
                Sign Up now.
              </span>
            </h4>
            <Button onClick={signUp}>Sign In with Google</Button>
          </form>
        </div>
      )}
    </>
  );
}

export default SignIn;
