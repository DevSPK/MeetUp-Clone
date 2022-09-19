//todo: import needed modules

import { csrfFetch } from "./csrf";
import thunk from "redux-thunk";

// todo: create types

const CREATE_GROUP = "groups/CREATE_GROUP";
const READ_GROUP = "groups/READ_GROUP";
//const LIST_ALL_GROUPS = "type/LIST_ALL_GROUPS";
const UPDATE_GROUP = "groups/UPDATE_GROUP";
const DELETE_GROUP = "groups/DELETE_GROUP";

// todo: create action creators

export const actionCreateGroup = (group) => ({
	type: CREATE_GROUP,
	group
});

export const actionReadGroup = (list) => {
	return {
		type: READ_GROUP,
		list
	};
};

// export const actionListAllGroups = (list) => ({
// 	type: LIST_ALL_GROUPS,
// 	list
// });

export const actionUpdateGroup = (group) => ({
	type: UPDATE_GROUP,
	group
});

export const actionDeleteGroup = (groupId) => ({
	type: DELETE_GROUP,
	groupId
});

// todo: create thunks

export const thunkListAllGroups =
	() => async (dispatch) => {
		const response = await csrfFetch("api/groups");
		console.log(
			"This is response from thunkListAllGroups",
			response
		);
		if (response.ok) {
			const list = await response.json();

			console.log(
				"this is list from thunkListAllGroups",
				list
			);
			dispatch(actionReadGroup(list));
			return list;
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

const initialState = {
	Groups: []
};

export default function groupsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case READ_GROUP:
			console.log(
				"this is action.list.Groups",
				action.list.Groups
			);
			const newGroups = [...action.list.Groups];
			console.log("this is new Groups", newGroups);
			let allGroups = [];
			newGroups.forEach((group) => {
				allGroups[group.id] = group;
			});
			console.log(
				"this is all groups from groupsReducer",
				allGroups
			);
			return {
				...state.Groups,
				allGroups
			};
		// case CREATE_GROUP:
		// 	const newState = { ...state };
		// 	newState["Groups"] = [...state, action.group];
		// 	return newState;
		case DELETE_GROUP:
			let newState = { ...state };
			delete newState[action.groupId];
			return newState;
		default:
			return state;
	}
}

// todo: export
