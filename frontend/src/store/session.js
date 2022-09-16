// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
	//console.log("this is user from SetUser", user);
	return {
		type: SET_USER,
		payload: user
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER
	};
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password
		})
	});
	if (response.ok) {
		const data = await response.json();
		//console.log("this is data.user from login", data.user);
		dispatch(setUser(data));
		return response;
	}
};

export const restoreUser = () => async (dispatch) => {
	// console.log("restore user running");
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setUser(data));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password, firstName, lastName } =
		user;
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			email,
			username,
			password,
			firstName,
			lastName
		})
	});
	const data = await response.json();
	dispatch(setUser(data));
	return response;
};

/*
signup console test
 window.store.dispatch(window.sessionActions.signup({
  username: 'NewUser',
  email: 'new@user.io',
  password: 'password',
	firstName: 'Saul',
	lastName: 'Goodman'
}));

 */

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE"
	});
	dispatch(removeUser());
	return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
