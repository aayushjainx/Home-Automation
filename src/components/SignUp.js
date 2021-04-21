import React, { useRef } from 'react';
import { auth, provider } from '../utils/firebase';
import '../styles/SignUp.css';
import { Button } from '@material-ui/core';
import nodeAPI from '../utils/axios2';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const signUp = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
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
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    signin();
  };

  return (
    <div className='signup'>
      <form>
        <h1>Sign In </h1>
        <input ref={emailRef} placeholder='Email' type='email' />
        <input ref={passwordRef} placeholder='Password' type='password' />
        <div> </div>
        <Button onClick={signIn}>Sign In</Button>
        <h4>
          <span className='signup__user'>New User? </span>

          <span className='signup__link' onClick={register}>
            Sign Up now.
          </span>
        </h4>
        <Button variant='contained' color='secondary' onClick={signUp}>
          Sign In with Google
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
