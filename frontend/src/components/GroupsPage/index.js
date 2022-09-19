import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkListAllGroups } from "../../store/groups";
import { useEffect } from "react";
import {
	Route,
	Switch,
	NavLink,
	Link
} from "react-router-dom";
import { SingleGroup } from "../SingleGroup";
import GroupInput from "../GroupInput";

const GroupsPage = () => {
	const groupsList = useSelector(
		(state) =>
			// Object.values(state.groupState)
			state.groupSlice.allGroups
	);
	const dispatch = useDispatch();

	if (!groupsList) {
	}

	useEffect(() => {
		dispatch(thunkListAllGroups());
	}, [dispatch]);

	if (!groupsList) {
		return null;
	}

	//console.log(groupsList.map(group => ));

	console.log("this is groupsList", groupsList);

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
				<li>
					<Link to={"/groups"}>Create a Group</Link>
				</li>
			</ul>
			<Switch>
				<Route
					exact
					path='/groups/:id'>
					<SingleGroup groupsList={groupsList} />
				</Route>
				<Route
					exact
					path='/groups/'>
					<GroupInput />
				</Route>
			</Switch>
		</div>
	);
};

export default GroupsPage;
