//todo: import needed modules

import { csrfFetch } from "./csrf";
import thunk from "redux-thunk";

// todo: create types

const CREATE_GROUP = "groups/CREATE_GROUP";
const READ_GROUP = "groups/READ_GROUP";
const READ_ALL_GROUPS = "type/READ_ALL_GROUPS";
const UPDATE_GROUP = "groups/UPDATE_GROUP";
const DELETE_GROUP = "groups/DELETE_GROUP";

// todo: create action creators

export const actionCreateGroup = (group) => ({
	type: CREATE_GROUP,
	group
});

export const actionReadGroup = (group) => {
	return {
		type: READ_GROUP,
		group
	};
};

export const actionReadAllGroups = (groups) => ({
	type: READ_ALL_GROUPS,
	groups
});

export const actionUpdateGroup = (group) => ({
	type: UPDATE_GROUP,
	group
});

export const actionDeleteGroup = (groupId) => ({
	type: DELETE_GROUP,
	groupId
});

// todo: create thunks

export const thunkReadAllGroups =
	() => async (dispatch) => {
		const response = await csrfFetch("api/groups");
		// console.log(
		// 	"This is response from thunkReadAllGroups",
		// 	response
		// );
		if (response.ok) {
			const groups = await response.json();

			// console.log(
			// 	"this is groups from thunkReadAllGroups",
			// 	Read
			// );
			dispatch(actionReadAllGroups(groups.Groups));
		} else {
			return response;
		}
	};

export const thunkGetOneGroup =
	(id) => async (dispatch) => {
		const response = await csrfFetch(`/api/groups/${id}`);

		if (response.ok) {
			const group = await response.json();
			dispatch(actionReadGroup(group));
		}
	};

export const addGroup = (group) => async (dispatch) => {
	const { name, about, type, privateVal, city, state } =
		group;
	const response = await csrfFetch("api/groups", {
		method: "POST",

		body: JSON.stringify({
			name,
			about,
			type,
			private: privateVal,
			city,
			state
		})
	});
	const data = await response.json();
	dispatch(actionCreateGroup(data));
	return response;
};

export const removeGroup =
	(groupId) => async (dispatch) => {
		const response = await csrfFetch(
			`/api/groups/${groupId}`,
			{
				method: "DELETE"
			}
		);
		console.log(
			"this is response from remove Group",
			response
		);

		if (response.ok) dispatch(actionDeleteGroup(groupId));
	};

// todo: create reducer

const initialState = {};

export default function groupsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case READ_ALL_GROUPS: // const newGroups = [...action.group]; // console.log("this is action.groups", action.groups);
		// console.log("this is new Groups", newGroups);
		// let allGroups = [];
		// newGroups.forEach((group) => {
		// 	allGroups[group.id] = group;
		// });
		// console.log(
		// 	"this is all groups from groupsReducer",
		// 	allGroups
		// );
		// return {
		// 	...state.Groups,
		// 	allGroups
		// };
		{
			const newState = { ...state };
			console.log("this is action.groups", action.groups);
			action.groups.forEach((group) => {
				newState[group.id] = group;
			});
			return newState;
		}
		case CREATE_GROUP: {
			const newState = { ...state };
			newState["Groups"] = [...state, action.group];
			return newState;
		}

		case DELETE_GROUP: {
			let newState = { ...state };
			delete newState[action.groupId];
			return newState;
		}
		default:
			return state;
	}
}

// todo: export
