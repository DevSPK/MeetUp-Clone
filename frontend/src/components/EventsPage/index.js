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

const EventsPage = () => {
	const [showCreateEventForm, setShowCreateEventForm] =
		useState(false);

	const eventsList = useSelector((state) =>
		Object.values(state.events)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadAllEvents());
	}, [dispatch]);

	if (!eventsList) {
		return null;
	}

	console.log("this is eventsList", eventsList);

	let content = null;

	// if (showCreateEventForm) {
	// 	content = (
	// 		<Route path='/events/'>
	// 			<EventInput
	// 				hideForm={() => setShowCreateEventForm(false)}
	// 			/>
	// 		</Route>
	// 	);
	// }

	return (
		<div className='events-page'>
			<h1>events Page</h1>
			<ul className='events-list-item'>
				<li>
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
							<Link
								key={id}
								to={`/events/${id}`}>
								{`${name}`}
							</Link>
						)
					)}
				</li>
				{/* <li>
					<Link to={"/events"}>Create a Group</Link>
				</li> */}
			</ul>
			{/* <button onClick={() => setShowCreateGroupForm(true)}>
				Create New Group
			</button>
			<Switch>
				<Route
					exact
					path='/groups/:id'>
					<SingleGroup />
				</Route>
			</Switch> */}
			<div>{content}</div>
		</div>
	);
};

export default EventsPage;
