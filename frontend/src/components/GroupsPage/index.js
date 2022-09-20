import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkReadAllGroups } from "../../store/groups";
import { useEffect, useState } from "react";
import {
	Route,
	Switch,
	// NavLink,
	Link
} from "react-router-dom";
import { SingleGroup } from "../SingleGroup";
import GroupInput from "../GroupInput";

const GroupsPage = () => {
	const [showCreateGroupForm, setShowCreateGroupForm] =
		useState(false);

	const groupsList = useSelector((state) =>
		Object.values(state.groups)
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadAllGroups());
	}, [dispatch]);

	if (!groupsList) {
		return null;
	}

	//console.log(groupsList.map(group => ));

	console.log("this is groupsList", groupsList);
	let content = null;

	if (showCreateGroupForm) {
		content = (
			<Route path='/groups/'>
				<GroupInput
					hideForm={() => setShowCreateGroupForm(false)}
				/>
			</Route>
		);
	}
	return (
		<div>
			<h1 className='groups-page'>Groups Page</h1>
			<ul className='groups-list-item'>
				<li>
					{groupsList.map(
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
								to={`/groups/${id}`}>
								{`${name}`}
							</Link>
						)
					)}
				</li>
				{/* <li>
					<Link to={"/groups"}>Create a Group</Link>
				</li> */}
			</ul>
			<button onClick={() => setShowCreateGroupForm(true)}>
				Create New Group
			</button>
			<Switch>
				<Route
					exact
					path='/groups/:id'>
					<SingleGroup />
				</Route>
			</Switch>
			<div>{content}</div>
		</div>
	);
};

export default GroupsPage;
