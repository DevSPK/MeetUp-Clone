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
		const response = await csrfFetch("/api/events");
		// console.log(
		// 	"This is response from thunkReadAllEvents",
		// 	response
		// );
		if (response.ok) {
			const events = await response.json();

			// // console.log(
			// 	"this is events from thunkReadAllEvents",
			// 	events
			// );
			dispatch(actionReadAllEvents(events.Events));
		} else {
			return response;
		}
	};

export const thunkGetOneEvent =
	(eventId) => async (dispatch) => {
		const response = await csrfFetch(
			`/api/events/${eventId}`
		);

		if (response.ok) {
			const event = await response.json();
			dispatch(actionReadEvent(event));
		}
	};

export const thunkAddEvent =
	(event) => async (dispatch) => {
		// console.log("this is event from thunkAddEvent", event);
		const {
			venueId,
			groupId,
			name,
			capacity,
			type,
			price,
			description,
			startDate,
			endDate
		} = event;
		const response = await csrfFetch(
			`/api/groups/${groupId}/events`,
			{
				method: "POST",

				body: JSON.stringify({
					venueId,
					name,
					capacity,
					type,
					price,
					description,
					startDate,
					endDate
				})
			}
		);
		const data = await response.json();
		dispatch(actionCreateEvent(data));
		return response;
	};

export const thunkRemoveEvent =
	(eventId, groupId) => async (dispatch) => {
		const response = await csrfFetch(
			`/api/events/${eventId}`,
			{
				method: "DELETE"
			}
		);
		// console.log(
		// 	"this is response from remove event",
		// 	response
		// );

		if (response.ok) dispatch(actionDeleteEvent(eventId));
	};

const initialState = {};

export default function eventsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case READ_ALL_EVENTS: {
			const newState = { ...state };
			// console.log(
			// 	"this is action.events in read all events",
			// 	action.events
			// );
			action.events.forEach((event) => {
				newState[event.id] = event;
			});
			return newState;
		}
		case READ_EVENT: {
			const newState = { ...state };
			newState[action.event.id] = action.event;
			return newState;
		}
		case CREATE_EVENT: {
			const newState = { ...state };
			newState[action.event.id] = action.event;
			return newState;
		}
		case DELETE_EVENT: {
			const newState = { ...state };
			delete newState[action.eventId];
			return newState;
		}
		default:
			return state;
	}
}
