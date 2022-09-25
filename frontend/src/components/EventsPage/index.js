import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkReadAllEvents } from "../../store/events";
import { useEffect, useState } from "react";
import {
	Route,
	Switch,
	// NavLink,
	Link
} from "react-router-dom";
import { SingleEvent } from "../SingleEvent";
import EventInput from "../EventInput";

const EventsPage = () => {
	const [showCreateEventForm, setShowCreateEventForm] =
		useState(false);

	let events;

	const dispatch = useDispatch();

	// forceUpdate();

	useEffect(() => {
		dispatch(thunkReadAllEvents());
		console.log("useeffect run");
	}, [dispatch]);

	const eventsList = useSelector((state) =>
		// console.log("state",state.events)
		Object.values(state.events)
	);

	console.log("el", eventsList);
	console.log(
		"state",
		useSelector((state) => Object.values(state.events))
	);

	if (!eventsList) {
		return null;
	}
	// console.log("this is eventsList", eventsList);

	let content = null;

	if (showCreateEventForm) {
		content = (
			<Route path='/events/'>
				<EventInput
					hideForm={() => setShowCreateEventForm(false)}
				/>
			</Route>
		);
	}

	return (
		<div className='events-page'>
			<h1>Events Page</h1>
			<ul className='events-list'>
				{eventsList.map(
					({
						id,
						name,
						city,
						state,
						numMembers,
						previewImage,
						about
					}) => (
						<li
							key={id}
							className='events-list-item'>
							<Link to={`/events/${id}`}>{`${name}`}</Link>
						</li>
					)
				)}

				{/* <li>
					<Link to={"/events"}>Create an Event</Link>
				</li> */}
			</ul>
			{/* <button onClick={() => setShowCreateEventForm(true)}>
				Create New Event
			</button> */}
			{/* <Route
				exact
				path='/events/:id'>
				<SingleEvent />
			</Route> */}
			<div>{content}</div>
		</div>
	);
};

export default EventsPage;
