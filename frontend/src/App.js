// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsPage from "./components/GroupsPage";
import EventsPage from "./components/EventsPage";
import SplashPage from "./components/SplashPage";
import { SingleGroup } from "./components/SingleGroup";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() =>
			setIsLoaded(true)
		);
	}, [dispatch]);

	return (
		<div className='App'>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route
						exact
						path='/groups/:id'>
						<SingleGroup />
					</Route>
					<Route path='/login'>
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignupFormPage />
					</Route>
					<Route path='/groups'>
						<GroupsPage />
					</Route>
					<Route path='/events'>
						<EventsPage />
					</Route>

					<Route
						exact
						path='/'>
						<SplashPage />
					</Route>
				</Switch>
			)}
		</div>
	);
}

export default App;
