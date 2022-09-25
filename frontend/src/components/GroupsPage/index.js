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

	// console.log("this is groupsList", groupsList);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadAllGroups());
	}, [dispatch]);

	if (!groupsList) {
		return null;
	}

	//// console.log(groupsList.map(group => ));

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
		<div className='groups-page'>
			<h1>Groups Page</h1>
			<ul className='groups-list-item'>
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
						<li>
							<Link
								key={id}
								to={`/groups/${id}`}>
								<h1>{name}</h1>
								<img
									src={previewImage}
									alt='a depiction of this group'
								/>
							</Link>
						</li>
					)
				)}
				{/* <li>
					<Link to={"/groups"}>Create a Group</Link>
				</li> */}
			</ul>
			<button onClick={() => setShowCreateGroupForm(true)}>
				Create New Group
			</button>

			<Switch></Switch>
			<div>{content}</div>
		</div>
	);
};

export default GroupsPage;
