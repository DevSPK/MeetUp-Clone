//todo: import needed modules

import { csrfFetch } from "./csrf";

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
			// 	groups
			// );
			dispatch(actionReadAllGroups(groups.Groups));
		} else {
			return response;
		}
	};

export const thunkGetOneGroup =
	(groupId) => async (dispatch) => {
		const response = await csrfFetch(
			`/api/groups/${groupId}`
		);

		if (response.ok) {
			const group = await response.json();
			dispatch(actionReadGroup(group));
		}
	};

export const thunkAddGroup =
	(group) => async (dispatch) => {
		const {
			name,
			about,
			type,
			privateVal,
			city,
			state,
			imageUrl
		} = group;
		const groupResponse = await csrfFetch("api/groups", {
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
		if (groupResponse.ok) {
			const data = await groupResponse.json();

			const { id } = data;

			console.log("this is data from groupResponse", data);
			console.log("this is id from groupresponse.body", id);

			const imageResponse = await csrfFetch(
				`api/groups/${id}/images`,
				{
					method: "POST",

					body: JSON.stringify({
						url: imageUrl,
						preview: true
					})
				}
			);
			if (imageResponse.ok) {
				// const imgageData = await imageResponse.json()
				dispatch(actionCreateGroup(data));
				return groupResponse;
			}
		}
	};

export const thunkUpdateGroup =
	(group) => async (dispatch) => {
		const { name, about, type, privateVal, city, state } =
			group;

		console.log(
			"this is group in thunk update group",
			group
		);
		const response = await csrfFetch(
			`/api/groups/${group.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name,
					about,
					type,
					private: privateVal,
					city,
					state
				})
			}
		);

		if (response.ok) {
			const data = await response.json();
			dispatch(actionUpdateGroup(data));
			return data;
		}
	};

export const thunkRemoveGroup =
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
		case READ_ALL_GROUPS: {
			const newState = { ...state };
			console.log(
				"this is action.groups in read all groups",
				action.groups
			);
			action.groups.forEach((group) => {
				newState[group.id] = group;
			});
			return newState;
		}
		case READ_GROUP: {
			let newState = { ...state };
			// console.log(
			// 	"this is action.group in read_group",
			// 	action.group
			// );
			newState[action.group.id] = action.group;
			return newState;
		}

		case CREATE_GROUP: {
			let newState = { ...state };
			// console.log("this is state in create_group", state);
			// console.log("this is action in create_group", action);
			// console.log(
			// 	"this is action.group in create_group",
			// 	action.group
			// );
			newState[action.group.id] = action.group;
			return newState;
		}

		case DELETE_GROUP: {
			let newState = { ...state };
			console.log("this is action in delete_group", action);
			console.log("this is state in delete_group", state);

			console.log(
				"this is action.groupId in delete_group",
				action.groupId
			);

			console.log(
				"this is newState in delete_group",
				newState
			);

			// ********** not an array so can't use filter
			// const result = newState.filter(
			// 	(group) => group !== action.groupId
			// );

			// console.log(result);

			// return result;

			// for (let group in newState) {
			// 	if (group.id === action.groupId) {
			// 		delete group.id;
			// 	}
			// }

			delete newState[action.groupId];
			return newState;
		}
		case UPDATE_GROUP: {
			let newState = { ...state };
			newState[action.group.id] = action.group;
			return newState;
		}
		default:
			return state;
	}
}

// todo: export
