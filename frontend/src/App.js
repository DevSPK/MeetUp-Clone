// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import { SplashPage } from "./components/SplashPage";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() =>
			setIsLoaded(true)
		);
	}, [dispatch]);

	return (
		isLoaded && (
			<Switch>
				<Route path='/login'>
					<LoginFormPage />
				</Route>
				<Route
					exact
					path='/'>
					<SplashPage />
				</Route>
			</Switch>
		)
	);
}

export default App;
