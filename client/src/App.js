import React, { useEffect } from 'react';
import './App.css';

import Login from './components/Login';
import ThemeProvider from './styles/ThemeProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './utils/PrivateRoute';

function App() {
	const [userG] = useAuthState(auth);
	const dispatch = useDispatch();
	var user = useSelector(selectUser);

	useEffect(() => {
		if (userG) {
			dispatch(
				login({
					token: userG.uid,
					uid: userG.displayName,
					type: 'firebase',
				})
			);
		}
	}, [dispatch, userG]);

	useEffect(() => {
		if (localStorage.getItem('jwtToken')) {
			console.log(localStorage.jwtToken, 'aayush-jwt');
			const token = localStorage.jwtToken;
			const decoded = jwt_decode(token);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				dispatch(logout());
			} else {
				dispatch(
					login({
						token: token,
						uid: decoded._id,
						type: 'node',
					})
				);
			}
		}
	}, [dispatch]);

	return (
		<ThemeProvider>
			<div className='app'>
				<Router>
					{!user ? (
						<Switch>
							<Route path='/login' component={Login} />
							<Redirect to='/login' />
						</Switch>
					) : (
						<Switch>
							<PrivateRoute path='/home' user={user} component={Home} />
							<Redirect to='/home' />
						</Switch>
					)}
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
