import { csrfFetch } from "./csrf";

// create types

const CREATE_EVENT = "events/CREATE_EVENT";
const READ_EVENT = "events/READ_EVENT";
const READ_ALL_EVENTS = "events/READ_ALL_EVENTS";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";

// action creators

export const actionCreateEvent = (event) => ({
	type: CREATE_EVENT,
	event
});
export const actionReadEvent = (event) => ({
	type: READ_EVENT,
	event
});
export const actionReadAllEvents = (events) => ({
	type: READ_ALL_EVENTS,
	events
});
export const actionUpdateEvent = (event) => ({
	type: UPDATE_EVENT,
	event
});
export const actionDeleteEvent = (eventId) => ({
	type: DELETE_EVENT,
	eventId
});

// thunks

export const thunkReadAllEvents =
	() => async (dispatch) => {
		const response = await csrfFetch("api/events");
		console.log(
			"This is response from thunkReadAllEvents",
			response
		);
		if (response.ok) {
			const events = await response.json();

			console.log(
				"this is events from thunkReadAllEvents",
				events
			);
			dispatch(actionReadAllEvents(events.Events));
		} else {
			return response;
		}
	};

const initialState = {};

export default function eventsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case READ_ALL_EVENTS: {
			const newState = { ...state };
			console.log(
				"this is action.events in read all events",
				action.events
			);
			action.events.forEach((event) => {
				newState[event.id] = event;
			});
			return newState;
		}
		default:
			return state;
	}
}
