import { useParams, useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import {
	thunkGetOneEvent,
	thunkRemoveEvent
} from "../../store/events";

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import EventUpdate from "../EventUpdate";

export const SingleEvent = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	// const [showEditEventForm, setShowEditEventForm] =
	// 	useState(false);

	// console.log("this is id", id);

	// console.log("this is singleEvent EventsList", EventsList);

	let event = useSelector((state) => state.events[id]);

	console.log({ event });

	useEffect(() => {
		dispatch(thunkGetOneEvent(id));
	}, [dispatch, id]);

	//const EventChoice = EventList.find(({id}) => id === EventId)

	// console.log("this is Event from singleEvent", Event);

	async function handleDelete(eventId, groupId) {
		await dispatch(thunkRemoveEvent(eventId, groupId));
		history.push("/");
	}

	console.log("this is Event from singleEvent", event);

	let content = null;

	// if (showEditEventForm) {
	// 	content = (
	// 		<EventUpdate
	// 			event={event}
	// 			hideForm={() => setShowEditEventForm(false)}
	// 		/>
	// 	);
	// }

	if (!event) {
		return null;
	}
	return (
		<div>
			<h1>Event Name: {event.name}</h1>
			<h2>About this Event: {event.description}</h2>
			<h3>Type of Event: {event.type}</h3>
			<h3>Capacity: {event.capacity}</h3>
			<h3>Price: {`$${event.price}`}</h3>

			<h3>Start Date and Time: {event.startDate}</h3>
			<h3>End Date and Time: {event.endDate}</h3>
			<div className='buttons'>
				<button
					onClick={() =>
						handleDelete(event.id, event.groupId)
					}>
					Delete Event
				</button>
				{/* <button onClick={() => setShowEditEventForm(true)}>
					Edit Event
				</button> */}
			</div>
			{content}
		</div>
	);
};
