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

export const thunkReadAllEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");
  // console.log(
  // 	"This is response from thunkReadAllEvents",
  // 	response
  // );
  if (response.ok) {
    const events = await response.json();

    // console.log("this is events.Events from thunkReadAllEvents", events.Events);
    // console.log()

    dispatch(actionReadAllEvents(events.Events));
  } else {
    return response;
  }
};

export const thunkGetOneEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);

  if (response.ok) {
    const event = await response.json();
    dispatch(actionReadEvent(event));
  }
};

export const thunkAddEvent = (event) => async (dispatch) => {
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
    endDate,
    imageUrl
  } = event;
  const eventResponse = await csrfFetch(`/api/groups/${groupId}/events`, {
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
  });
  if (eventResponse.ok) {
    const data = await eventResponse.json();

    const { id } = data;

    const imageResponse = await csrfFetch(`/api/events/${id}/images`, {
      method: "POST",

      body: JSON.stringify({
        url: imageUrl,
        preview: true
      })
    });
    if (imageResponse.ok) {
      // const data = await response.json();
      await dispatch(actionCreateEvent(data));
      await dispatch(thunkReadAllEvents());
      return eventResponse;
    }
  }
};

export const thunkRemoveEvent = (eventId, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE"
  });
  // console.log("this is response from remove event", response);

  if (response.ok) dispatch(actionDeleteEvent(eventId));
};

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case READ_ALL_EVENTS: {
      // need to start with an empty state in order to capture updates/deletes
      const newState = {};
      // console.log("this is action.events in read all events", action.events);
      action.events.forEach((event) => {
        newState[event.id] = event;
      });
      // console.log("this is newState in read_all_events", newState);
      return newState;
    }
    case READ_EVENT: {
      let newState = { ...state };
      newState[action.event.id] = action.event;
      // console.log("this is newState in read_event", newState);
      return newState;
    }
    case CREATE_EVENT: {
      let newState = { ...state };
      newState[action.event.id] = action.event;
      return newState;
    }
    case DELETE_EVENT: {
      // console.log(
      //   "this is action eventid in Delete event reducer",
      //   action.eventId
      // );

      let newState = { ...state };
      // console.log("this is newState in delete event reducer", newState);
      // console.log(
      //   " this is newState(action.eventId in delete event reducer",
      //   newState[action.eventId]
      // );
      delete newState[action.eventId];
      return newState;
    }
    default:
      return state;
  }
}
